import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/chat/ChatWidget';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';

const notoSansJP = Noto_Sans_JP({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  preload: false,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zest2020.com';

export const metadata: Metadata = {
  title: {
    template: '%s | ZEST Inc.',
    default: 'ZEST Inc. | 営業組織の型化・データ活用支援',
  },
  description:
    'トップセールスの行動パターンをデータで解析し、誰もが再現できる「型」として定着させる。SheetViz × カチカタで営業組織のデータ活用を支援します。',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: './',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'ZEST Inc.',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
  },
  // Search Console の所有権確認（HTMLタグ方式を使う場合に環境変数へ設定）
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } }
    : {}),
};

// 検索結果でのブランド表示（ナレッジパネル）用の構造化データ
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '株式会社ZEST',
  alternateName: 'ZEST Inc.',
  url: SITE_URL,
  logo: `${SITE_URL}/zest-logo.png`,
  description:
    'トップセールスの行動パターンをデータで解析し、誰もが再現できる「型」として定着させる営業組織支援企業。',
  foundingDate: '2020-08',
  address: {
    '@type': 'PostalAddress',
    postalCode: '107-0061',
    addressRegion: '東京都',
    addressLocality: '港区',
    streetAddress: '北青山3-6-7',
    addressCountry: 'JP',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'shunpei.tanzawa@zest2020.com',
    availableLanguage: ['ja'],
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
        <GoogleAnalytics />
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
