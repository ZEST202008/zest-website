/**
 * 営業メールの配信停止
 *
 * 【なぜ署名付きトークンなのか】
 * 送信時にサーバー側へ何も登録せず、URLだけで「どの会社の停止依頼か」を
 * 確かめられるようにするため。営業メールは手で送るので、送信のたびに
 * APIを叩いてトークンを発行する運用にすると、叩き忘れた分のリンクが
 * 無効になり、配信停止したい相手が停止できなくなる。
 *
 * ドメインを秘密鍵でHMAC署名してURLに埋めておけば、受け取った側が
 * クリックした時点で初めてサーバーが関与すればよい。
 * 署名があるので、他社のドメインを書き換えて勝手に停止させることもできない。
 *
 * 【なぜドメイン単位なのか】
 * RUNBOOK の抑止リストがドメイン単位だから。info@ で停止を受けたあとに
 * 代表個人宛へ送る、という事故を防ぐ。
 */

import { createHmac, timingSafeEqual } from 'node:crypto';

const SECRET = process.env.UNSUBSCRIBE_SECRET ?? '';

function b64url(buf: Buffer): string {
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromB64url(s: string): Buffer {
  return Buffer.from(s.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
}

function sign(payload: string): string {
  return b64url(createHmac('sha256', SECRET).update(payload).digest()).slice(0, 16);
}

export interface UnsubscribeTarget {
  domain: string;
  campaign: string;
}

/** 配信停止トークンを作る。URLに載せるのはこの文字列だけ */
export function createToken({ domain, campaign }: UnsubscribeTarget): string {
  const payload = `${domain}|${campaign}`;
  return `${b64url(Buffer.from(payload, 'utf8'))}.${sign(payload)}`;
}

/**
 * トークンを検証して中身を返す。壊れていたり署名が合わなければ null。
 * 鍵が未設定の環境では常に null を返す（誤って全員を停止扱いにしないため）。
 */
export function verifyToken(token: string): UnsubscribeTarget | null {
  if (!SECRET) return null;
  const dot = token.lastIndexOf('.');
  if (dot <= 0) return null;

  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);

  let payload: string;
  try {
    payload = fromB64url(body).toString('utf8');
  } catch {
    return null;
  }

  const expected = sign(payload);
  // 長さが違うと timingSafeEqual が例外を投げるため先に弾く
  if (sig.length !== expected.length) return null;
  if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;

  const sep = payload.indexOf('|');
  if (sep < 0) return null;

  const domain = payload.slice(0, sep);
  const campaign = payload.slice(sep + 1);
  if (!domain) return null;

  return { domain, campaign };
}

// ── KV への記録 ──────────────────────────────────────

const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;

function headers() {
  return {
    Authorization: `Bearer ${KV_TOKEN}`,
    'Content-Type': 'application/json',
  };
}

export interface OptOutRecord {
  domain: string;
  campaign: string;
  optedOutAt: string;
}

/**
 * 配信停止を記録する。
 *
 * TTLは付けない。抑止は永久であり、消えると送ってはいけない相手に送ってしまう。
 * 手元の suppression.json に取り込んだあとも消さないのは、履歴ファイルを
 * 作り直したときに復元できるようにするため。
 */
export async function recordOptOut(target: UnsubscribeTarget): Promise<boolean> {
  if (!KV_URL || !KV_TOKEN) return false;

  const record: OptOutRecord = {
    domain: target.domain,
    campaign: target.campaign,
    optedOutAt: new Date().toISOString(),
  };

  try {
    const res = await fetch(`${KV_URL}/pipeline`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify([
        ['SADD', 'optout:domains', target.domain],
        // 最初の停止日時を残したいので、既にあれば上書きしない（SET ... NX）
        ['SET', `optout:${target.domain}`, JSON.stringify(record), 'NX'],
      ]),
    });
    return res.ok;
  } catch (err) {
    console.error('KV recordOptOut error:', err);
    return false;
  }
}

/** 既に停止済みか */
export async function isOptedOut(domain: string): Promise<boolean> {
  if (!KV_URL || !KV_TOKEN) return false;
  try {
    const res = await fetch(`${KV_URL}/sismember/optout:domains/${encodeURIComponent(domain)}`, {
      headers: headers(),
      cache: 'no-store',
    });
    const data = await res.json();
    return data.result === 1;
  } catch {
    return false;
  }
}

/** 停止済みの一覧（手元の抑止リストへの取り込み用） */
export async function listOptOuts(): Promise<OptOutRecord[]> {
  if (!KV_URL || !KV_TOKEN) return [];
  try {
    const res = await fetch(`${KV_URL}/smembers/optout:domains`, {
      headers: headers(),
      cache: 'no-store',
    });
    const data = await res.json();
    const domains: string[] = Array.isArray(data.result) ? data.result : [];
    if (domains.length === 0) return [];

    const detail = await fetch(`${KV_URL}/pipeline`, {
      method: 'POST',
      headers: headers(),
      cache: 'no-store',
      body: JSON.stringify(domains.map((d) => ['GET', `optout:${d}`])),
    });
    const rows = await detail.json();

    return domains.map((domain, i) => {
      const raw = rows?.[i]?.result;
      if (raw) {
        try {
          return JSON.parse(raw) as OptOutRecord;
        } catch {
          /* 壊れていればドメインだけ返す */
        }
      }
      return { domain, campaign: '', optedOutAt: '' };
    });
  } catch (err) {
    console.error('KV listOptOuts error:', err);
    return [];
  }
}

/**
 * 配信停止の記録を取り消す。
 *
 * 配信停止は本来「永久」であり、消す手段は本来いらない。それでも用意するのは、
 * テスト送信や誤記録で入った行を残すと、`sync-optout` が走るたびに手元の
 * 抑止リストへ復活し、本物の配信停止と混ざって数字が読めなくなるため。
 *
 * 相手の意思で入った停止をこれで消してはいけない。管理用（CRON_SECRET 認証）。
 */
export async function removeOptOut(domain: string): Promise<boolean> {
  if (!KV_URL || !KV_TOKEN || !domain) return false;
  try {
    const res = await fetch(`${KV_URL}/pipeline`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify([
        ['SREM', 'optout:domains', domain],
        ['DEL', `optout:${domain}`],
      ]),
    });
    return res.ok;
  } catch (err) {
    console.error('KV removeOptOut error:', err);
    return false;
  }
}
