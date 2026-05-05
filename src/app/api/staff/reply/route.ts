import { NextRequest, NextResponse } from 'next/server';
import { addStaffMessage, isKvConfigured } from '@/lib/kv';

const STAFF_REPLY_TOKEN = process.env.STAFF_REPLY_TOKEN;

/**
 * POST /api/staff/reply
 * Body: { sessionId: string, message: string, token: string }
 *
 * スタッフがチャットに返信するためのエンドポイント。
 * STAFF_REPLY_TOKEN による簡易認証付き。
 */
export async function POST(req: NextRequest) {
  if (!isKvConfigured()) {
    return NextResponse.json(
      { error: 'KV store is not configured' },
      { status: 503 }
    );
  }

  const body = await req.json();
  const { sessionId, message, token } = body;

  // 認証チェック
  if (!STAFF_REPLY_TOKEN || token !== STAFF_REPLY_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!sessionId || !message?.trim()) {
    return NextResponse.json(
      { error: 'sessionId and message are required' },
      { status: 400 }
    );
  }

  const success = await addStaffMessage(sessionId, message.trim());
  if (!success) {
    return NextResponse.json(
      { error: 'Session not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true });
}
