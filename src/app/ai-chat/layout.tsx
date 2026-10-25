import type { Metadata } from 'next';

/**
 * 入口メールの着地ページ群。
 * 企業名を差し込んで出し分けるため検索エンジンにはインデックスさせない。
 * 一般公開のサービス紹介は /services/ai-chat-assistant 側にある。
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AiChatEntryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
