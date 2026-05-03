import type { Metadata } from 'next';
import { getBlogPosts, getBlogPostContent } from '@/lib/notion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const revalidate = 3600;

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
  } catch {}
  return { title: 'ブログ記事' };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post: any = null;
  let content = '';

  try {
    const posts = await getBlogPosts();
    post = posts.find((p) => p.slug === slug);
    if (post) {
      content = await getBlogPostContent(post.id);
    }
  } catch (e) {
    // フォールバック
  }

  if (!post) {
    return (
      <div className="container-inner py-20 text-center">
        <p className="text-slate-500">記事が見つかりませんでした</p>
        <Link href="/blog" className="btn-secondary mt-6 inline-flex">
          ブログ一覧に戻る
        </Link>
      </div>
    );
  }

  return (
    <article className="py-16">
      <div className="container-inner max-w-3xl">
        <Link href="/blog"
          className="inline-flex items-center gap-1 text-sm text-slate-500
                     hover:text-brand-orange no-underline mb-8 transition-colors">
          <ArrowLeft size={14} /> ブログ一覧
        </Link>

        {post.category && (
          <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">
            {post.category}
          </span>
        )}
        <h1 className="text-3xl font-black text-brand-navy leading-tight mt-2 mb-2">
          {post.title}
        </h1>
        <p className="text-xs text-slate-400 mb-8">{post.date}</p>

        {post.coverUrl && (
          <img
            src={post.coverUrl}
            alt={post.title}
            className="w-full rounded-2xl mb-10 object-cover max-h-72"
          />
        )}

        {/* Notion本文（Markdown形式） */}
        <div
          className="prose prose-slate max-w-none
                     prose-headings:font-black prose-headings:text-brand-navy
                     prose-a:text-brand-orange prose-strong:text-brand-navy"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </article>
  );
}
