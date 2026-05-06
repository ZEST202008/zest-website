import { NextRequest, NextResponse } from 'next/server';
import { addStaffMessage, getSession, isKvConfigured } from '@/lib/kv';
import { sendStaffReplyNotification } from '@/lib/email';

const STAFF_REPLY_TOKEN = process.env.STAFF_REPLY_TOKEN;

/**
 * POST /api/staff/reply
 * Body: { sessionId: string, message: string, token: string }
 *
 * スタッフがチャットに返信するためのエンドポイント。
 * STAFF_REPLY_TOKEN による簡易認証付き。
 * 返信後、訪問者がメールアドレスを登録済みであればメール通知を送信する。
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

  // メッセージ追加前にセッション情報を取得（メール送信用）
  const session = await getSession(sessionId);

  const success = await addStaffMessage(sessionId, message.trim());
  if (!success) {
    return NextResponse.json(
      { error: 'Session not found' },
      { status: 404 }
    );
  }

  // 訪問者にメール通知（メールアドレスが登録されている場合のみ）
  if (session?.contactInfo?.email) {
    sendStaffReplyNotification({
      visitorEmail: session.contactInfo.email,
      visitorName: session.contactInfo.name,
      staffMessage: message.trim(),
      sessionId,
    }).catch((err) => {
      // メール送信失敗はレスポンスに影響させない
      console.error('[reply] Email notification failed:', err);
    });
  }

  return NextResponse.json({ ok: true });
}
