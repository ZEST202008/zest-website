import { NextRequest, NextResponse } from 'next/server';
import { sendMessage } from '@/lib/agent';
import { Message } from '@/lib/agent/types';

// レート制限（簡易版：本番ではRedis等を推奨）
const requestTimestamps = new Map<string, number>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const last = requestTimestamps.get(ip) ?? 0;
  if (now - last < 1000) return true; // 1秒に1回まで
  requestTimestamps.set(ip, now);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'リクエストが多すぎます。少し待ってから再送信してください。' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const messages: Message[] = body.messages;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: '不正なリクエストです。' }, { status: 400 });
    }

    // 最後のメッセージが空でないか確認
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage?.content?.trim()) {
      return NextResponse.json({ error: 'メッセージが空です。' }, { status: 400 });
    }

    const { reply, escalated } = await sendMessage(messages);

    return NextResponse.json({ reply, escalated });
  } catch (err) {
    console.error('Chat API error:', err);
    return NextResponse.json(
      { error: '申し訳ございません。エラーが発生しました。お問い合わせフォームよりご連絡ください。' },
      { status: 500 }
    );
  }
}
