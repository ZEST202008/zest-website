import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Next.js の既定の404は英語表記のため、日本語のページを用意する。
// 削除された記事のURLもここに来る。
export default function NotFound() {
  return (
    <section className="py-24">
      <div className="container-inner max-w-xl text-center">
        <span className="section-label">404</span>
        <h1 className="section-title">ページが見つかりませんでした</h1>
        <p className="text-slate-600 leading-relaxed mt-4">
          URLが変わったか、公開を終えた可能性があります。
          お探しの内容は、トップページかブログ一覧から見つかるかもしれません。
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <Link href="/" className="btn-primary">
            <ArrowRight size={18} /> トップページへ
          </Link>
          <Link href="/blog" className="btn-secondary">
            ブログ一覧を見る
          </Link>
        </div>
      </div>
    </section>
  );
}
