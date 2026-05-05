/**
 * Vercel KV (Redis) の薄いラッパー
 *
 * 【セットアップ手順】
 * 1. Vercel ダッシュボード → Storage → Upstash → Redis → Create
 * 2. プロジェクトにリンクすると以下の環境変数が自動追加される：
 *    KV_REST_API_URL / KV_REST_API_TOKEN
 * 3. ローカル開発: vercel env pull .env.local
 *
 * Upstash REST API（パッケージ不要、fetch のみで動作）
 */

// Vercel × Upstash 連携時に自動追加される環境変数名
const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;

export interface StaffMessage {
  content: string;
  sentAt: string; // ISO string
}

export interface ChatSession {
  sessionId: string;
  escalated: boolean;
  contactInfo: {
    name?: string;
    company?: string;
    email?: string;
  };
  staffMessages: StaffMessage[];
  createdAt: string;
  lastActivityAt: string;
}

function headers() {
  return {
    Authorization: `Bearer ${KV_TOKEN}`,
    'Content-Type': 'application/json',
  };
}

/** セッションを取得する */
export async function getSession(sessionId: string): Promise<ChatSession | null> {
  if (!KV_URL || !KV_TOKEN) return null;
  try {
    const res = await fetch(`${KV_URL}/get/session:${sessionId}`, {
      headers: headers(),
      cache: 'no-store',
    });
    const data = await res.json();
    if (!data.result) return null;
    return JSON.parse(data.result) as ChatSession;
  } catch {
    return null;
  }
}

/** セッションを作成 or 更新する（TTL: 7日） */
export async function saveSession(session: ChatSession): Promise<void> {
  if (!KV_URL || !KV_TOKEN) return;
  try {
    // Upstash REST API: SET key value EX seconds
    // body は配列形式 [key, value, "EX", ttl]
    await fetch(`${KV_URL}/pipeline`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify([
        ['SET', `session:${session.sessionId}`, JSON.stringify(session), 'EX', 604800],
      ]),
    });
  } catch (err) {
    console.error('KV saveSession error:', err);
  }
}

/** スタッフメッセージを追加する */
export async function addStaffMessage(
  sessionId: string,
  content: string
): Promise<boolean> {
  const session = await getSession(sessionId);
  if (!session) return false;

  const msg: StaffMessage = {
    content,
    sentAt: new Date().toISOString(),
  };
  session.staffMessages.push(msg);
  session.lastActivityAt = new Date().toISOString();
  await saveSession(session);
  return true;
}

/** KVが設定済みか確認 */
export function isKvConfigured(): boolean {
  return !!(KV_URL && KV_TOKEN);
}
