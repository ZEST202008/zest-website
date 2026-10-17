import type { Metadata } from 'next';

/**
 * 入口メールの着地ページ群。
 * 企業名を差し込んで出し分けるため検索エンジンにはインデックスさせない。
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function InsideSalesEntryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
