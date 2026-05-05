import Anthropic from '@anthropic-ai/sdk';
import { Message, DEFAULT_CONFIG } from './types';
import { SYSTEM_PROMPT } from './system-prompt';
import { TOOLS } from './tools';
import { sendEscalationToSlack } from '../slack';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

/**
 * メッセージを送信してレスポンスを取得する。
 *
 * 【将来の Managed Agents への移行方法】
 * この関数の中身を Managed Agents の Session API に差し替えるだけでOK。
 * 呼び出し元（route.ts）は変更不要。
 */
export async function sendMessage(
  messages: Message[],
  sessionId?: string
): Promise<{
  reply: string;
  escalated: boolean;
}> {
  // コスト最適化：直近N件のみ保持
  const trimmedMessages = messages.slice(-DEFAULT_CONFIG.maxHistoryLength);

  const response = await client.messages.create({
    model: DEFAULT_CONFIG.model,
    max_tokens: DEFAULT_CONFIG.maxTokens,
    system: SYSTEM_PROMPT,
    tools: TOOLS,
    messages: trimmedMessages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
  });

  // ツール使用の検出
  if (response.stop_reason === 'tool_use') {
    const toolUse = response.content.find((c) => c.type === 'tool_use');

    if (toolUse && toolUse.type === 'tool_use' && toolUse.name === 'escalate_to_slack') {
      const input = toolUse.input as { reason: string };
      await sendEscalationToSlack(trimmedMessages, input.reason, sessionId);

      return {
        reply:
          'ありがとうございます。担当者よりこのチャットまたはメールにてご連絡いたします。少々お待ちください。',
        escalated: true,
      };
    }
  }

  // 通常のテキストレスポンス
  const textContent = response.content.find((c) => c.type === 'text');
  const reply = textContent && textContent.type === 'text'
    ? textContent.text
    : '申し訳ございません。うまく応答できませんでした。お問い合わせフォームよりご連絡ください。';

  return { reply, escalated: false };
}
