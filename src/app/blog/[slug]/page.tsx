import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPosts, getBlogPostContent } from '@/lib/notion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// 10分ごとに作り直す。公開直後に反映したいときは /api/revalidate を叩く。
export const revalidate = 600;

export async function generateStaticParams() {
  try {
    const posts = await getBlogPosts();
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  try {
    const { slug } = await params;
    const posts = await getBlogPosts();
    const post = posts.find((p) => p.slug === slug);
    if (post) {
      return { title: post.title, description: post.excerpt };
    }
  } catch (e) {
    console.error('[blog] メタデータの取得に失敗しました', e);
  }
  return { title: '記事が見つかりません', robots: { index: false } };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post: any = null;
  let content = '';
  let fetchFailed = false;

  try {
    const posts = await getBlogPosts();
    post = posts.find((p) => p.slug === slug);
    if (post) {
      content = await getBlogPostContent(post.id);
    }
  } catch (e) {
    console.error('[blog] 記事の取得に失敗しました', e);
    fetchFailed = true;
  }

  // Notionから取れなかっただけのときは404にしない。
  // 一時的な障害で、生きている記事まで検索結果から外されるのを避ける。
  if (!post && fetchFailed) {
    return (
      <div className="container-inner py-20 text-center">
        <p className="text-slate-500">記事を読み込めませんでした。時間をおいて開いてください。</p>
        <Link href="/blog" className="btn-secondary mt-6 inline-flex">
          ブログ一覧に戻る
        </Link>
      </div>
    );
  }

  // Notionから消された記事・存在しないURLは404を返す（ソフト404にしない）
  if (!post) {
    notFound();
  }

  return (
    <article className="py-16">
      <div className="container-inner max-w-3xl">

        {/* 戻るリンク */}
        <Link href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500
                     hover:text-brand-orange no-underline mb-10 transition-colors group">
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          ブログ一覧
        </Link>

        {/* カテゴリ・タイトル・日付 */}
        <div className="mb-10">
          {post.category && (
            <span className="inline-block text-xs font-bold text-brand-orange uppercase tracking-wider mb-3">
              {post.category}
            </span>
          )}
          <h1 className="text-3xl md:text-4xl font-black text-brand-navy leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-sm text-slate-400">{post.date}</p>
        </div>

        {post.coverUrl && (
          <img
            src={post.coverUrl}
            alt={post.title}
            className="w-full rounded-2xl mb-12 object-cover max-h-80"
          />
        )}

        {/* 本文 */}
        <div
          className="prose prose-slate max-w-none
                     prose-headings:font-black prose-headings:text-brand-navy
                     prose-headings:leading-tight prose-headings:mt-10 prose-headings:mb-4
                     prose-h2:text-2xl prose-h3:text-xl
                     prose-p:leading-8 prose-p:text-slate-700 prose-p:mb-6
                     prose-a:text-brand-orange prose-a:no-underline hover:prose-a:underline
                     prose-strong:text-brand-navy prose-strong:font-bold
                     prose-li:leading-7 prose-li:text-slate-700
                     prose-ul:my-6 prose-ol:my-6
                     prose-blockquote:border-brand-orange prose-blockquote:text-slate-600
                     prose-code:text-brand-orange prose-code:bg-orange-50 prose-code:px-1.5
                     prose-code:py-0.5 prose-code:rounded prose-code:text-sm"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </article>
  );
}
