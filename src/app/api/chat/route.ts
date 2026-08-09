import { NextRequest, NextResponse } from 'next/server';
import { sendMessage } from '@/lib/agent';
import { Message } from '@/lib/agent/types';
import { getSession, saveSession, isKvConfigured, checkRateLimit, addSessionToDailyIndex, getJstDateKey } from '@/lib/kv';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';

    // KVベースのレート制限（10秒間に10回まで）
    if (await checkRateLimit(ip, 'rl:chat', 10, 10)) {
      return NextResponse.json(
        { error: 'リクエストが多すぎます。少し待ってから再送信してください。' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const messages: Message[] = body.messages;
    const sessionId: string | undefined = body.sessionId;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: '不正なリクエストです。' }, { status: 400 });
    }

    // 最後のメッセージが空でないか確認
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage?.content?.trim()) {
      return NextResponse.json({ error: 'メッセージが空です。' }, { status: 400 });
    }

    const { reply, escalated, contactInfo } = await sendMessage(messages, sessionId);

    // 全会話をKVに保存（日次Slackダイジェスト用。エスカレーション有無に関わらず記録）
    if (sessionId && isKvConfigured()) {
      const existing = await getSession(sessionId);
      const transcript = [...messages, { role: 'assistant' as const, content: reply }];
      const now = new Date().toISOString();

      if (!existing) {
        await saveSession({
          sessionId,
          escalated,
          contactInfo: contactInfo ?? {},
          staffMessages: [],
          visitorMessages: [],
          messages: transcript,
          createdAt: now,
          lastActivityAt: now,
        });
      } else {
        existing.messages = transcript;
        existing.lastActivityAt = now;
        if (escalated) {
          existing.escalated = true;
          // 連絡先情報をマージ（既存データを上書きしない）
          if (contactInfo) {
            existing.contactInfo = { ...contactInfo, ...existing.contactInfo };
          }
        }
        await saveSession(existing);
      }

      await addSessionToDailyIndex(sessionId, getJstDateKey());
    }

    return NextResponse.json({ reply, escalated });
  } catch (err) {
    console.error('Chat API error:', err);
    return NextResponse.json(
      { error: '申し訳ございません。エラーが発生しました。お問い合わせフォームよりご連絡ください。' },
      { status: 500 }
    );
  }
}
