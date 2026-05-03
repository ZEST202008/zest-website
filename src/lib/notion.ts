import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

// Notion クライアント初期化
export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const n2m = new NotionToMarkdown({ notionClient: notion });

// ── サービス一覧を取得 ──────────────────────────────
export async function getServices() {
  const dbId = process.env.NOTION_SERVICES_DB_ID!;
  const response = await notion.databases.query({
    database_id: dbId,
    filter: { property: 'Published', checkbox: { equals: true } },
    sorts: [{ property: 'Order', direction: 'ascending' }],
  });

  return response.results.map((page: any) => ({
    id: page.id,
    slug: page.properties.Slug?.rich_text?.[0]?.plain_text ?? '',
    name: page.properties.Name?.title?.[0]?.plain_text ?? '',
    tagline: page.properties.Tagline?.rich_text?.[0]?.plain_text ?? '',
    description: page.properties.Description?.rich_text?.[0]?.plain_text ?? '',
    color: page.properties.Color?.select?.name ?? 'orange',
    icon: page.properties.Icon?.rich_text?.[0]?.plain_text ?? '',
  }));
}

// ── ブログ記事一覧を取得 ────────────────────────────
export async function getBlogPosts(limit?: number) {
  const dbId = process.env.NOTION_BLOG_DB_ID!;
  const response = await notion.databases.query({
    database_id: dbId,
    filter: { property: 'Published', checkbox: { equals: true } },
    sorts: [{ property: 'Date', direction: 'descending' }],
    ...(limit ? { page_size: limit } : {}),
  });

  return response.results.map((page: any) => ({
    id: page.id,
    slug: page.properties.Slug?.rich_text?.[0]?.plain_text ?? page.id,
    title: page.properties.Title?.title?.[0]?.plain_text ?? '',
    excerpt: page.properties.Excerpt?.rich_text?.[0]?.plain_text ?? '',
    date: page.properties.Date?.date?.start ?? '',
    category: page.properties.Category?.select?.name ?? '',
    coverUrl: page.cover?.external?.url ?? page.cover?.file?.url ?? null,
  }));
}

// ── ブログ記事の本文を取得 ──────────────────────────
export async function getBlogPostContent(pageId: string) {
  const mdBlocks = await n2m.pageToMarkdown(pageId);
  const mdString = n2m.toMarkdownString(mdBlocks);
  return mdString.parent;
}

// ── ページIDからNotion本文を取得 ───────────────────
export async function getPageContent(pageId: string) {
  const mdBlocks = await n2m.pageToMarkdown(pageId);
  const mdString = n2m.toMarkdownString(mdBlocks);
  return mdString.parent;
}
