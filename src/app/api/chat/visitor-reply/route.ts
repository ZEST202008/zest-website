import { NextRequest, NextResponse } from 'next/server';
import { addVisitorMessage, isKvConfigured } from '@/lib/kv';

/**
 * POST /api/chat/visitor-reply
 * Body: { sessionId: string, message: string }
 *
 * エスカレーション後に訪問者が担当者へ返信するエンドポイント。
 * メッセージをKVに保存し、スタッフ側のページでリアルタイムに表示される。
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { sessionId, message } = body;

  if (!sessionId || !message?.trim()) {
    return NextResponse.json({ error: 'sessionId と message は必須です' }, { status: 400 });
  }

  // KV未設定の場合もエラーにしない（メッセージは訪問者側には表示済み）
  if (isKvConfigured()) {
    await addVisitorMessage(sessionId, message.trim());
  }

  return NextResponse.json({ ok: true });
}
