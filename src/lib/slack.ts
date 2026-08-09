import { Message } from './agent/types';
import { ChatSession } from './kv';

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL!;
// Slack管理画面でグループIDを確認して環境変数に設定してください（例: S12345ABC）
// 未設定の場合は @client-inquiry のテキストメンションにフォールバック
const SLACK_GROUP_ID = process.env.SLACK_GROUP_ID ?? '';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zest2020.com';
const STAFF_REPLY_TOKEN = process.env.STAFF_REPLY_TOKEN ?? '';
// 全会話ログ用の投稿先（エスカレーション通知とは別チャンネルのIncoming Webhook）
const SLACK_LOG_WEBHOOK_URL = process.env.SLACK_LOG_WEBHOOK_URL ?? '';

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

// ────────────────────────────────────────────────────────────────
// 日次ダイジェスト（その日の全会話ログをログ専用チャンネルへ）
// ────────────────────────────────────────────────────────────────
const DIGEST_TRANSCRIPT_MAX_CHARS = 2500; // Slack sectionのtext上限(3000)に安全マージンを取る
const DIGEST_SESSIONS_PER_MESSAGE = 15; // 1メッセージのブロック数がSlackの上限(50)を超えないように分割

function formatDigestSessionBlock(session: ChatSession) {
  const time = new Date(session.createdAt).toLocaleTimeString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    hour: '2-digit',
    minute: '2-digit',
  });
  const contact = [session.contactInfo?.company, session.contactInfo?.name, session.contactInfo?.email]
    .filter(Boolean)
    .join(' / ');
  const conversationText = (session.messages ?? [])
    .map((m) => `${m.role === 'user' ? '👤' : '🤖'} ${m.content}`)
    .join('\n') || '(会話ログなし)';
  const truncated =
    conversationText.length > DIGEST_TRANSCRIPT_MAX_CHARS
      ? `${conversationText.slice(0, DIGEST_TRANSCRIPT_MAX_CHARS)}\n…(以下省略)`
      : conversationText;

  return {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `${session.escalated ? '🔴' : '⚪️'} *${time}〜*${session.escalated ? '（エスカレーション済み）' : ''}${
        contact ? `\n連絡先: ${contact}` : ''
      }\n\`\`\`${truncated}\`\`\``,
    },
  };
}

/** その日の全会話ログをログ専用Slackチャンネルへダイジェスト投稿する（Vercel Cronから1日1回呼び出される） */
export async function sendDailyDigestToSlack(dateKey: string, sessions: ChatSession[]): Promise<void> {
  if (!SLACK_LOG_WEBHOOK_URL) {
    console.error('SLACK_LOG_WEBHOOK_URL is not set');
    return;
  }
  if (sessions.length === 0) return;

  const escalatedCount = sessions.filter((s) => s.escalated).length;
  const chunks: ChatSession[][] = [];
  for (let i = 0; i < sessions.length; i += DIGEST_SESSIONS_PER_MESSAGE) {
    chunks.push(sessions.slice(i, i + DIGEST_SESSIONS_PER_MESSAGE));
  }

  for (let i = 0; i < chunks.length; i++) {
    const blocks: Record<string, unknown>[] = [];

    if (i === 0) {
      blocks.push({
        type: 'header',
        text: {
          type: 'plain_text',
          text: `📋 ${dateKey} のAIチャットログ（全${sessions.length}件・エスカレーション${escalatedCount}件）`,
          emoji: true,
        },
      });
    }

    chunks[i].forEach((session) => {
      blocks.push({ type: 'divider' });
      blocks.push(formatDigestSessionBlock(session));
    });

    try {
      const res = await fetch(SLACK_LOG_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: `${dateKey} のAIチャットログ`, blocks }),
      });
      if (!res.ok) {
        console.error('Slack digest webhook error:', res.status, await res.text());
      }
    } catch (err) {
      console.error('Failed to send Slack digest:', err);
    }
  }
}
