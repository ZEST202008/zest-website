import { Message } from './agent/types';

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL!;
// Slack管理画面でグループIDを確認して環境変数に設定してください（例: S12345ABC）
// 未設定の場合は @client-inquiry のテキストメンションにフォールバック
const SLACK_GROUP_ID = process.env.SLACK_GROUP_ID ?? '';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zest2020.com';
const STAFF_REPLY_TOKEN = process.env.STAFF_REPLY_TOKEN ?? '';

export async function sendEscalationToSlack(
  messages: Message[],
  reason: string,
  sessionId?: string
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

  // グループメンション: IDが設定済みなら <!subteam^ID>、未設定なら @handle テキスト
  const mention = SLACK_GROUP_ID
    ? `<!subteam^${SLACK_GROUP_ID}|client-inquiry>`
    : '@client-inquiry';

  // スタッフ返信URL（sessionIdがある場合のみ生成）
  const replyUrl =
    sessionId && STAFF_REPLY_TOKEN
      ? `${SITE_URL}/staff/reply/${sessionId}?token=${encodeURIComponent(STAFF_REPLY_TOKEN)}`
      : null;

  const payload = {
    text: `${mention} *ホームページからの問い合わせが届きました*`,
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
            text: `*エスカレーション理由 / 連絡先:*\n${reason}`,
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
          // KVが設定済みの場合のみ「チャットで返信」ボタンを表示
          ...(replyUrl
            ? [
                {
                  type: 'button',
                  text: { type: 'plain_text', text: '💬 チャットで返信する', emoji: true },
                  style: 'primary',
                  url: replyUrl,
                },
              ]
            : []),
          {
            type: 'button',
            text: { type: 'plain_text', text: '🌐 サイトを見る', emoji: true },
            url: SITE_URL,
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
