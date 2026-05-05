import { Message } from './agent/types';

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL!;
const SLACK_GROUP_HANDLE = 'client-inquiry'; // <!subteam^ID> 形式か @handle 形式

export async function sendEscalationToSlack(
  messages: Message[],
  reason: string
): Promise<void> {
  if (!SLACK_WEBHOOK_URL) {
    console.error('SLACK_WEBHOOK_URL is not set');
    return;
  }

  // 直近の会話をフォーマット（最大5往復）
  const recentMessages = messages.slice(-10);
  const conversationText = recentMessages
    .map((m) => `${m.role === 'user' ? '👤 訪問者' : '🤖 Bot'}: ${m.content}`)
    .join('\n');

  const payload = {
    text: `<!subteam^${SLACK_GROUP_HANDLE}> *ホームページからの問い合わせが届きました*`,
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '📩 ホームページ問い合わせ',
          emoji: true,
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*エスカレーション理由:*\n${reason}`,
          },
          {
            type: 'mrkdwn',
            text: `*チャンネル:*\n#homepage-inquiry`,
          },
        ],
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*会話履歴:*\n\`\`\`${conversationText}\`\`\``,
        },
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: '対応する',
              emoji: true,
            },
            style: 'primary',
            url: 'https://www.zest2020.com',
          },
        ],
      },
    ],
  };

  try {
    const res = await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error('Slack webhook error:', res.status, await res.text());
    }
  } catch (err) {
    console.error('Failed to send Slack notification:', err);
  }
}
