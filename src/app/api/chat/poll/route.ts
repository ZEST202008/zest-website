import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/kv';

/**
 * GET /api/chat/poll?sessionId=xxx&since=ISO_DATE
 *
 * 訪問者側: staffMessages（スタッフからの返信）を取得
 * スタッフ側: staffMessages + visitorMessages（双方向会話）を取得
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('sessionId');
  const since = searchParams.get('since');
  const role = searchParams.get('role'); // 'staff' の場合は訪問者メッセージも返す

  if (!sessionId) {
    return NextResponse.json({ error: 'sessionId is required' }, { status: 400 });
  }

  const session = await getSession(sessionId);
  if (!session) {
    return NextResponse.json({ messages: [], visitorMessages: [] });
  }

  // スタッフへの返信（新着のみ）
  let staffMessages = session.staffMessages;
  if (since) {
    const sinceDate = new Date(since);
    staffMessages = staffMessages.filter((m) => new Date(m.sentAt) > sinceDate);
  }

  // スタッフ用: 訪問者メッセージも含める
  const visitorMessages = role === 'staff' ? (session.visitorMessages ?? []) : [];

  return NextResponse.json({
    messages: staffMessages,
    visitorMessages,
    escalated: session.escalated,
  });
}
