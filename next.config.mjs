/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.notion.so' },
      { protocol: 'https', hostname: 'www.notion.so' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'static.wixstatic.com' },
    ],
  },

  /**
   * 旧サイト（Wix）のURLから現行ページへの301相当（308）リダイレクト。
   *
   * Search Console の「見つかりませんでした（404）」で検出された旧URLのうち、
   * 内容が対応する現行ページがあるものだけを転送する。
   *
   * 対応関係が薄いURLを一律でトップページへ飛ばすと Google はソフト404と判断し、
   * 被リンクの評価は引き継がれない。訪問者にとっても探していた情報が無い
   * ページに飛ばされるだけなので、無理な転送はしない。
   */
  async redirects() {
    return [
      // 会社概要
      { source: '/company', destination: '/about', permanent: true },
      // プライバシーポリシー（Wixは日本語URLを生成していた）
      // Next.js はエンコード済みのパスで照合するため、パーセントエンコードで書く。
      // 日本語のまま書くと一致せず404になる（実測で確認済み）。
      {
        source:
          '/%E3%83%97%E3%83%A9%E3%82%A4%E3%83%90%E3%82%B7%E3%83%BC%E3%83%9D%E3%83%AA%E3%82%B7%E3%83%BC',
        destination: '/privacy',
        permanent: true,
      },
      // SheetViz の資料ダウンロードページ → SheetViz サービスページ
      {
        source: '/sheetviz%E6%A6%82%E8%A6%81%E8%B3%87%E6%96%99dl',
        destination: '/services/sheetziv',
        permanent: true,
      },
      // お知らせ・ニュース → ブログ
      { source: '/information', destination: '/blog', permanent: true },
      { source: '/news/:path*', destination: '/blog', permanent: true },
    ];
  },
};

export default nextConfig;
