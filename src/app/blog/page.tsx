import type { Metadata } from 'next';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/notion';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ブログ',
  description: '営業組織のデータ活用・型化に関するノウハウや事例をお届けします。',
};

export const revalidate = 3600; // 1時間ごとに再生成

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof getBlogPosts>> = [];

  try {
    posts = await getBlogPosts();
  } catch (e) {
    // Notion未設定時はサンプル表示
  }

  return (
    <section className="py-20">
      <div className="container-inner">
        <div className="mb-12">
          <span className="section-label">ブログ</span>
          <h1 className="section-title">営業組織の型化・データ活用</h1>
          <p className="section-sub">ノウハウや事例、ZESTからのお知らせをお届けします。</p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-lg mb-2">記事を準備中です</p>
            <p className="text-sm">Notionで記事を作成すると自動的に表示されます</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="card group no-underline"
              >
                {post.coverUrl && (
                  <img
                    src={post.coverUrl}
                    alt={post.title}
                    className="w-full h-40 object-cover rounded-xl mb-4"
                  />
                )}
                {post.category && (
                  <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">
                    {post.category}
                  </span>
                )}
                <h2 className="font-black text-brand-navy mt-1 mb-2 leading-snug">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1 text-brand-orange font-bold
                                   group-hover:gap-2 transition-all">
                    続きを読む <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
