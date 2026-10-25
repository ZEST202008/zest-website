import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, recordOptOut, listOptOuts } from '@/lib/unsubscribe';

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL ?? '';
const CRON_SECRET = process.env.CRON_SECRET ?? '';

/**
 * POST /api/unsubscribe
 * Body: { token: string }
 *
 * 配信停止を受け付ける。
 *
 * GETではなくPOSTにしているのは、セキュリティ製品やメールスキャナが
 * 本文中のリンクを自動で巡回するため。GETで即停止にすると、相手が
 * 何もしていないのに停止扱いになり、送れるはずの相手を失う。
 * 画面の「配信を停止する」ボタンから、このPOSTが呼ばれる。
 */
export async function POST(req: NextRequest) {
  let token: unknown;
  try {
    ({ token } = await req.json());
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }

  if (typeof token !== 'string' || !token) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }

  const target = verifyToken(token);
  if (!target) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
  }

  const stored = await recordOptOut(target);
  if (!stored) {
    // 記録できないまま「停止しました」と表示すると、相手には停止したつもりが
    // こちらには伝わっていない状態になる。失敗は隠さず返す。
    return NextResponse.json({ error: 'Storage unavailable' }, { status: 503 });
  }

  await notifySlack(target.domain, target.campaign);

  return NextResponse.json({ ok: true, domain: target.domain });
}

/**
 * GET /api/unsubscribe
 * Header: Authorization: Bearer <CRON_SECRET>
 *
 * 手元の抑止リストへ取り込むための一覧。
 * 停止データはこのサーバーにあり、送信可否を判断するのは丹澤さんのMacなので、
 * 取り込む経路がないと停止が送信側に反映されない。
 */
export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization') ?? '';
  if (!CRON_SECRET || auth !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const optOuts = await listOptOuts();
  return NextResponse.json({ count: optOuts.length, optOuts });
}

async function notifySlack(domain: string, campaign: string): Promise<void> {
  if (!SLACK_WEBHOOK_URL) return;
  try {
    await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: [
          '🚫 *営業メールの配信停止がありました*',
          `• ドメイン: \`${domain}\``,
          `• キャンペーン: ${campaign || '(不明)'}`,
          '',
          '`npm run log -- sync-optout` で手元の抑止リストに取り込んでください。',
        ].join('\n'),
      }),
    });
  } catch (err) {
    console.error('Slack notify error:', err);
  }
}
