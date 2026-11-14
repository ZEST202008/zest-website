import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-brand-navy text-white">
      <div className="container-inner py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="mb-3">
              <Image
                src="/zest-logo.png"
                alt="ZEST"
                width={90}
                height={32}
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              現場の勘と経験に、裏付けを。<br />
              中小企業の稼ぐ力をつくる。
            </p>
          </div>

          {/* Services */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              サービス
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/services/soshikizukuri"
                  className="text-sm text-slate-300 hover:text-white no-underline transition-colors">
                  組織づくり支援
                </Link>
              </li>
              <li>
                <Link href="/services/kachikata"
                  className="text-sm text-slate-300 hover:text-white no-underline transition-colors">
                  カチカタ
                </Link>
              </li>
              <li>
                <Link href="/services/sheetviz"
                  className="text-sm text-slate-300 hover:text-white no-underline transition-colors">
                  SheetViz
                </Link>
              </li>
              <li>
                <Link href="/services/inside-sales"
                  className="text-sm text-slate-300 hover:text-white no-underline transition-colors">
                  インサイドセールス内製化
                </Link>
              </li>
              <li>
                <Link href="/services/ai-chat-assistant"
                  className="text-sm text-slate-300 hover:text-white no-underline transition-colors">
                  AIチャットアシスタント
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
