import { NextRequest, NextResponse } from 'next/server';
import { getDailySessionIds, getSession, getJstDateKey, isKvConfigured, ChatSession } from '@/lib/kv';
import { sendDailyDigestToSlack } from '@/lib/slack';

/**
 * 前日分の全チャットログをまとめてSlackのログ専用チャンネルへ投稿する。
 *
 * Vercel Cronから1日1回（07:00 JST）呼び出される。
 * エスカレーション通知（即時・別チャンネル）とは独立して動作する。
 *
 * 認証: Authorization: Bearer CRON_SECRET
 */
export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    console.error('[chat-digest] CRON_SECRET is not configured');
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!isKvConfigured()) {
    return NextResponse.json({ error: 'KV is not configured' }, { status: 500 });
  }

  try {
    // 実行時刻(07:00 JST)から見て「前日」のJST日付をダイジェスト対象にする
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const dateKey = getJstDateKey(yesterday);

    const sessionIds = await getDailySessionIds(dateKey);
    if (sessionIds.length === 0) {
      return NextResponse.json({ sent: false, reason: 'No sessions for the day', dateKey });
    }

    const sessions = (
      await Promise.all(sessionIds.map((id) => getSession(id)))
    ).filter((s): s is ChatSession => s !== null);

    // 会話開始時刻順に並べる
    sessions.sort((a, b) => a.createdAt.localeCompare(b.createdAt));

    await sendDailyDigestToSlack(dateKey, sessions);

    return NextResponse.json({ sent: true, dateKey, sessionCount: sessions.length });
  } catch (err) {
    console.error('chat-digest error:', err);
    return NextResponse.json({ error: 'Digest failed' }, { status: 500 });
  }
}
