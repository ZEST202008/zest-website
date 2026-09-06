import type { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/notion';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zest2020.com';

// ブログはNotion由来のため1時間ごとに再生成する
export const revalidate = 3600;

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/services/kachikata', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/services/ai-chat-assistant', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/services/sheetziv', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/inside-sales', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'yearly' },
  { path: '/about', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // Notionが落ちていてもサイトマップ自体は返す
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await getBlogPosts();
    blogEntries = posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: p.date ? new Date(p.date) : now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch {
    blogEntries = [];
  }

  return [...staticEntries, ...blogEntries];
}
