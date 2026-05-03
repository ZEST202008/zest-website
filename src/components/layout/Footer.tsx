import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-brand-navy text-white">
      <div className="container-inner py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="font-black text-2xl mb-2">
              ZEST<span className="text-brand-orange">.</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              営業組織の「型化」で、<br />
              チーム全体の生産性を変える。
            </p>
          </div>

          {/* Services */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              サービス
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/services/kachikata"
                  className="text-sm text-slate-300 hover:text-white no-underline transition-colors">
                  カチカタ
                </Link>
              </li>
              <li>
                <Link href="/services/sheetziv"
                  className="text-sm text-slate-300 hover:text-white no-underline transition-colors">
                  SheetViz
                </Link>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              リンク
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/blog"
                  className="text-sm text-slate-300 hover:text-white no-underline transition-colors">
                  ブログ
                </Link>
              </li>
              <li>
                <Link href="/about"
                  className="text-sm text-slate-300 hover:text-white no-underline transition-colors">
                  会社概要
                </Link>
              </li>
              <li>
                <Link href="/contact"
                  className="text-sm text-slate-300 hover:text-white no-underline transition-colors">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-6 flex flex-col md:flex-row
                        justify-between items-center gap-2">
          <p className="text-xs text-slate-500">
            © {year} ZEST Inc. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            <Link href="/privacy" className="hover:text-slate-300 no-underline">
              プライバシーポリシー
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
