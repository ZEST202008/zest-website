import { NextRequest, NextResponse } from 'next/server';
import { addVisitorMessage, isKvConfigured, checkRateLimit } from '@/lib/kv';

const MAX_MESSAGE_LENGTH = 2000;

/**
 * POST /api/chat/visitor-reply
 * Body: { sessionId: string, message: string }
 *
 * エスカレーション後に訪問者が担当者へ返信するエンドポイント。
 * メッセージをKVに保存し、スタッフ側のページでリアルタイムに表示される。
 */
export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';

  // レート制限（10秒間に5回まで）
  if (await checkRateLimit(ip, 'rl:visitor', 5, 10)) {
    return NextResponse.json(
      { error: 'リクエストが多すぎます。少し待ってから再送信してください。' },
      { status: 429 }
    );
  }

  const body = await req.json();
  const { sessionId, message } = body;

  if (!sessionId || !message?.trim()) {
    return NextResponse.json({ error: 'sessionId と message は必須です' }, { status: 400 });
  }

  // メッセージ長チェック
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: `メッセージは${MAX_MESSAGE_LENGTH}文字以内でお願いします` },
      { status: 400 }
    );
  }

  // KV未設定の場合もエラーにしない（メッセージは訪問者側には表示済み）
  if (isKvConfigured()) {
    await addVisitorMessage(sessionId, message.trim());
  }

  return NextResponse.json({ ok: true });
}
