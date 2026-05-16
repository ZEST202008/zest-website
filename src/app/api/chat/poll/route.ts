import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/kv';

const STAFF_REPLY_TOKEN = process.env.STAFF_REPLY_TOKEN;

/**
 * GET /api/chat/poll?sessionId=xxx&since=ISO_DATE
 *
 * 訪問者側: staffMessages（スタッフからの返信）を取得
 * スタッフ側: ?role=staff&token=STAFF_REPLY_TOKEN で staffMessages + visitorMessages（双方向会話）を取得
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('sessionId');
  const since = searchParams.get('since');
  const role = searchParams.get('role');
  const token = searchParams.get('token');

  if (!sessionId) {
    return NextResponse.json({ error: 'sessionId is required' }, { status: 400 });
  }

  // スタッフ用ポーリングには STAFF_REPLY_TOKEN による認証が必要
  if (role === 'staff') {
    if (!STAFF_REPLY_TOKEN || token !== STAFF_REPLY_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  const session = await getSession(sessionId);
  if (!session) {
    return NextResponse.json({ messages: [], visitorMessages: [] });
  }

  // スタッフからの返信（新着のみ）
  let staffMessages = session.staffMessages;
  if (since) {
    const sinceDate = new Date(since);
    staffMessages = staffMessages.filter((m) => new Date(m.sentAt) > sinceDate);
  }

  // スタッフ用: 訪問者メッセージも含める（認証済みの場合のみ）
  const visitorMessages = role === 'staff' ? (session.visitorMessages ?? []) : [];

  return NextResponse.json({
    messages: staffMessages,
    visitorMessages,
    escalated: session.escalated,
  });
}
