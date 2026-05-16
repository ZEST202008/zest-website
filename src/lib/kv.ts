/**
 * Vercel KV (Redis) の薄いラッパー
 *
 * 【セットアップ手順】
 * 1. Vercel ダッシュボード → Storage → Upstash → Redis → Create
 * 2. プロジェクトにリンクすると以下の環境変数が自動追加される：
 *    KV_REST_API_URL / KV_REST_API_TOKEN
 * 3. ローカル開発: vercel env pull .env.local
 *
 * Upstash REST API（パッケージ不要、fetch のみで動作）
 */

// Vercel × Upstash 連携時に自動追加される環境変数名
const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;

export interface StaffMessage {
  content: string;
  sentAt: string;
}

export interface VisitorMessage {
  content: string;
  sentAt: string;
}

export interface ChatSession {
  sessionId: string;
  escalated: boolean;
  contactInfo: {
    name?: string;
    company?: string;
    email?: string;
  };
  staffMessages: StaffMessage[];
  visitorMessages: VisitorMessage[]; // エスカレーション後の訪問者メッセージ
  createdAt: string;
  lastActivityAt: string;
}

function headers() {
  return {
    Authorization: `Bearer ${KV_TOKEN}`,
    'Content-Type': 'application/json',
  };
}

/** セッションを取得する */
export async function getSession(sessionId: string): Promise<ChatSession | null> {
  if (!KV_URL || !KV_TOKEN) return null;
  try {
    const res = await fetch(`${KV_URL}/get/session:${sessionId}`, {
      headers: headers(),
      cache: 'no-store',
    });
    const data = await res.json();
    if (!data.result) return null;
    const session = JSON.parse(data.result) as ChatSession;
    // 旧セッションに visitorMessages がない場合の互換対応
    if (!session.visitorMessages) session.visitorMessages = [];
    return session;
  } catch {
    return null;
  }
}

/** セッションを作成 or 更新する（TTL: 7日） */
export async function saveSession(session: ChatSession): Promise<void> {
  if (!KV_URL || !KV_TOKEN) return;
  try {
    await fetch(`${KV_URL}/pipeline`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify([
        ['SET', `session:${session.sessionId}`, JSON.stringify(session), 'EX', 604800],
      ]),
    });
  } catch (err) {
    console.error('KV saveSession error:', err);
  }
}

/** スタッフメッセージを追加する */
export async function addStaffMessage(
  sessionId: string,
  content: string
): Promise<boolean> {
  const session = await getSession(sessionId);
  if (!session) return false;

  session.staffMessages.push({ content, sentAt: new Date().toISOString() });
  session.lastActivityAt = new Date().toISOString();
  await saveSession(session);
  return true;
}

/** エスカレーション後の訪問者メッセージを追加する */
export async function addVisitorMessage(
  sessionId: string,
  content: string
): Promise<boolean> {
  const session = await getSession(sessionId);
  if (!session) return false;

  session.visitorMessages.push({ content, sentAt: new Date().toISOString() });
  session.lastActivityAt = new Date().toISOString();
  await saveSession(session);
  return true;
}

/** KVが設定済みか確認 */
export function isKvConfigured(): boolean {
  return !!(KV_URL && KV_TOKEN);
}

// ── レート制限 ────────────────────────────────────────

/**
 * KVベースのレート制限（サーバーレス環境対応）
 *
 * INCR + EXPIRE NX を使い、windowSec 秒間に limit 回を超えたら true を返す。
 * KV未設定時は常に false（制限しない）を返す。
 *
 * @param ip          クライアントIPアドレス
 * @param prefix      用途ごとのキープレフィックス（例: "rl:chat", "rl:visitor"）
 * @param limit       windowSec 秒間の最大リクエスト数
 * @param windowSec   カウントウィンドウ（秒）
 * @returns true = レート制限超過（リクエストを拒否すべき）
 */
export async function checkRateLimit(
  ip: string,
  prefix = 'rl:chat',
  limit = 10,
  windowSec = 10
): Promise<boolean> {
  if (!KV_URL || !KV_TOKEN) return false;
  try {
    const key = `${prefix}:${ip}`;
    // INCR でカウントアップ → EXPIRE NX で初回のみ TTL をセット
    const res = await fetch(`${KV_URL}/pipeline`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify([
        ['INCR', key],
        ['EXPIRE', key, windowSec, 'NX'],
      ]),
    });
    const data = await res.json();
    const count: number = data.result?.[0] ?? 1;
    return count > limit;
  } catch {
    return false; // KV エラー時は制限しない（フェイルオープン）
  }
}

// ── AI 知識ベース ────────────────────────────────────

/** AIの知識文字列を取得する */
export async function getKnowledge(): Promise<string | null> {
  if (!KV_URL || !KV_TOKEN) return null;
  try {
    const res = await fetch(`${KV_URL}/get/ai:knowledge`, {
      headers: headers(),
      cache: 'no-store',
    });
    const data = await res.json();
    return data.result ?? null;
  } catch {
    return null;
  }
}

/** 最後に同期した日時を取得する */
export async function getKnowledgeSyncedAt(): Promise<string | null> {
  if (!KV_URL || !KV_TOKEN) return null;
  try {
    const res = await fetch(`${KV_URL}/get/ai:knowledge:synced_at`, {
      headers: headers(),
      cache: 'no-store',
    });
    const data = await res.json();
    return data.result ?? null;
  } catch {
    return null;
  }
}

/** AIの知識文字列と同期日時をまとめて保存する */
export async function saveKnowledge(knowledge: string, syncedAt: string): Promise<void> {
  if (!KV_URL || !KV_TOKEN) return;
  try {
    await fetch(`${KV_URL}/pipeline`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify([
        ['SET', 'ai:knowledge', knowledge],
        ['SET', 'ai:knowledge:synced_at', syncedAt],
      ]),
    });
  } catch (err) {
    console.error('KV saveKnowledge error:', err);
  }
}
