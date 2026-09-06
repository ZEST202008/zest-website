import type { Metadata } from 'next';

// スタッフ用画面は検索エンジンにインデックスさせない
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
