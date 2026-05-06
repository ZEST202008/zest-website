/**
 * メール送信ユーティリティ（Resend REST API 使用）
 *
 * 【セットアップ手順】
 * 1. https://resend.com でアカウント作成（無料プランで月3,000通まで）
 * 2. ダッシュボード → API Keys → Create API Key
 * 3. Domains → Add Domain で zest2020.com を追加・DNS設定（または onboarding@resend.dev で無料テスト可）
 * 4. Vercel の環境変数に以下を追加：
 *    RESEND_API_KEY = re_xxxxxxxxxx
 *    EMAIL_FROM = noreply@zest2020.com  （ドメイン認証後）
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM ?? 'ZEST Inc. <noreply@zest2020.com>';

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Resend REST API でメールを送信する。
 * RESEND_API_KEY が未設定の場合はスキップ（ログのみ）。
 */
export async function sendEmail(options: SendEmailOptions): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.warn('[email] RESEND_API_KEY is not set. Skipping email send.');
    return false;
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: [options.to],
        subject: options.subject,
        html: options.html,
        ...(options.text ? { text: options.text } : {}),
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error('[email] Resend API error:', res.status, error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('[email] Failed to send email:', err);
    return false;
  }
}

/**
 * スタッフ返信通知メール（訪問者向け）を生成して送信する。
 */
export async function sendStaffReplyNotification(options: {
  visitorEmail: string;
  visitorName?: string;
  staffMessage: string;
  sessionId: string;
}): Promise<boolean> {
  const { visitorEmail, visitorName, staffMessage, sessionId } = options;

  const siteUrl = process.env.SITE_URL ?? 'https://www.zest2020.com';
  const chatUrl = `${siteUrl}/?chat=${sessionId}`;
  const greeting = visitorName ? `${visitorName} 様` : 'お問い合わせいただいた方';

  const html = `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ZESTからご返信が届きました</title>
</head>
<body style="margin:0;padding:0;background:#f8f8f6;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f8f6;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#0d1c3d;padding:24px 32px;">
              <p style="margin:0;color:#e04001;font-weight:900;font-size:20px;letter-spacing:0.05em;">ZEST</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 16px;color:#1e293b;font-size:15px;line-height:1.7;">
                ${greeting}
              </p>
              <p style="margin:0 0 24px;color:#475569;font-size:14px;line-height:1.8;">
                ZESTの担当者からチャットにご返信が届きました。
              </p>

              <!-- Staff message -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f8f6;border-left:3px solid #e04001;border-radius:4px;margin-bottom:28px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0 0 6px;color:#e04001;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">ZEST 担当者からのメッセージ</p>
                    <p style="margin:0;color:#1e293b;font-size:14px;line-height:1.8;white-space:pre-wrap;">${escapeHtml(staffMessage)}</p>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="background:#e04001;border-radius:6px;">
                    <a href="${chatUrl}" style="display:inline-block;padding:12px 28px;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;letter-spacing:0.02em;">
                      チャットを開いて返信する →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;color:#94a3b8;font-size:12px;line-height:1.6;">
                このメールはZESTのチャットサポートから自動送信されています。<br />
                ご不明な点は <a href="mailto:shunpei.tanzawa@zest2020.com" style="color:#e04001;text-decoration:none;">shunpei.tanzawa@zest2020.com</a> までご連絡ください。
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f1f5f9;padding:16px 32px;">
              <p style="margin:0;color:#94a3b8;font-size:11px;">
                株式会社ZEST　〒107-0061 東京都港区北青山3-6-7
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const text = `${greeting}\n\nZESTの担当者からチャットにご返信が届きました。\n\n---\n${staffMessage}\n---\n\nチャットを開いて返信する: ${chatUrl}\n\n株式会社ZEST`;

  return sendEmail({
    to: visitorEmail,
    subject: '【ZEST】担当者からご返信が届きました',
    html,
    text,
  });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
