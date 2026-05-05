import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/chat/ChatWidget';

const notoSansJP = Noto_Sans_JP({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: {
    template: '%s | ZEST Inc.',
    default: 'ZEST Inc. | 営業組織の型化・データ活用支援',
  },
  description:
    'トップセールスの行動パターンをデータで解析し、誰もが再現できる「型」として定着させる。SheetViz × カチカタで営業組織のデータ活用を支援します。',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zest2020.com'),
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'ZEST Inc.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={notoSansJP.className}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
