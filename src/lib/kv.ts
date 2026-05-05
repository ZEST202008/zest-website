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
  sentAt: string;
}

export interface VisitorMessage {
  content: string;
  sentAt: string;
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
  visitorMessages: VisitorMessage[]; // エスカレーション後の訪問者メッセージ
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
    const session = JSON.parse(data.result) as ChatSession;
    // 旧セッションに visitorMessages がない場合の互換対応
    if (!session.visitorMessages) session.visitorMessages = [];
    return session;
  } catch {
    return null;
  }
}

/** セッションを作成 or 更新する（TTL: 7日） */
export async function saveSession(session: ChatSession): Promise<void> {
  if (!KV_URL || !KV_TOKEN) return;
  try {
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

  session.staffMessages.push({ content, sentAt: new Date().toISOString() });
  session.lastActivityAt = new Date().toISOString();
  await saveSession(session);
  return true;
}

/** エスカレーション後の訪問者メッセージを追加する */
export async function addVisitorMessage(
  sessionId: string,
  content: string
): Promise<boolean> {
  const session = await getSession(sessionId);
  if (!session) return false;

  session.visitorMessages.push({ content, sentAt: new Date().toISOString() });
  session.lastActivityAt = new Date().toISOString();
  await saveSession(session);
  return true;
}

/** KVが設定済みか確認 */
export function isKvConfigured(): boolean {
  return !!(KV_URL && KV_TOKEN);
}
