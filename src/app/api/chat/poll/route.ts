import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/kv';

/**
 * GET /api/chat/poll?sessionId=xxx&since=ISO_DATE
 *
 * エスカレーション後にフロントエンドがポーリングし、
 * スタッフからの返信メッセージを受け取るためのエンドポイント。
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('sessionId');
  const since = searchParams.get('since'); // ISO date string

  if (!sessionId) {
    return NextResponse.json({ error: 'sessionId is required' }, { status: 400 });
  }

  const session = await getSession(sessionId);
  if (!session) {
    return NextResponse.json({ messages: [] });
  }

  let messages = session.staffMessages;

  // since パラメータがある場合は新着のみ返す
  if (since) {
    const sinceDate = new Date(since);
    messages = messages.filter((m) => new Date(m.sentAt) > sinceDate);
  }

  return NextResponse.json({
    messages,
    escalated: session.escalated,
  });
}
