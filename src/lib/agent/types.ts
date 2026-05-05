export type Role = 'user' | 'assistant';

export interface Message {
  role: Role;
  content: string;
}

export interface ChatRequest {
  messages: Message[];
  sessionId?: string;
}

export interface ChatResponse {
  message: string;
  escalated: boolean;
}

// 将来 Managed Agents へ移行する際はここに SessionId などを追加する
export interface AgentConfig {
  model: string;
  maxTokens: number;
  maxHistoryLength: number;
}

export const DEFAULT_CONFIG: AgentConfig = {
  model: 'claude-haiku-4-5-20251001',
  maxTokens: 1024,
  maxHistoryLength: 10, // 直近10メッセージのみ保持（コスト最適化）
};
