import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import { getKnowledgeSyncedAt, saveKnowledge } from '@/lib/kv';

// notion-to-md を使わず Client を直接生成（バンドル問題を回避）
const notion = new Client({ auth: process.env.NOTION_API_KEY });

/**
 * Notion → KV 知識同期エンドポイント
 *
 * Vercel Cron から1日1回呼び出される。
 * Notion の最終編集時刻を確認し、前回同期より新しいページがある場合のみ
 * 知識テキストを再構築して KV に保存する（無駄な書き込みを防止）。
 *
 * 認証: Authorization: Bearer CRON_SECRET
 */
export async function GET(req: NextRequest) {
  // 認証チェック（CRON_SECRET は必須。未設定の場合は設定エラーとして拒否）
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    console.error('[sync-knowledge] CRON_SECRET is not configured');
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const blogDbId = process.env.NOTION_BLOG_DB_ID;

    if (!blogDbId) {
      return NextResponse.json(
        { error: 'NOTION_BLOG_DB_ID is not configured' },
        { status: 500 }
      );
    }

    // ── 1. 最終編集時刻を取得（変更検知）────────────────────────────
    const latestRes = await notion.databases.query({
      database_id: blogDbId,
      filter: { property: 'Status', select: { equals: 'Published' } },
      sorts: [{ timestamp: 'last_edited_time', direction: 'descending' }],
      page_size: 1,
    });

    const latestEditTime =
      (latestRes.results[0] as any)?.last_edited_time ?? new Date().toISOString();

    // 前回の同期時刻と比較
    const lastSyncedAt = await getKnowledgeSyncedAt();
    if (lastSyncedAt && lastSyncedAt >= latestEditTime) {
      return NextResponse.json({
        synced: false,
        reason: 'No changes detected',
        lastSyncedAt,
        latestEditTime,
      });
    }

    // ── 2. 全ブログ記事を取得────────────────────────────────────────
    const allBlogRes = await notion.databases.query({
      database_id: blogDbId,
      filter: { property: 'Status', select: { equals: 'Published' } },
      sorts: [{ property: 'Date', direction: 'descending' }],
    });

    // ── 3. 知識テキストを構築────────────────────────────────────────
    const lines: string[] = ['### 最新ブログ記事'];

    for (const page of allBlogRes.results) {
      const p = page as any;
      const title = p.properties?.Title?.title?.[0]?.plain_text ?? '';
      const excerpt = p.properties?.Excerpt?.rich_text?.[0]?.plain_text ?? '';
      const date = p.properties?.Date?.date?.start ?? '';
      const category = p.properties?.Category?.select?.name ?? '';
      if (title) {
        lines.push(`- 【${date}】${title}（カテゴリ: ${category}）`);
        if (excerpt) lines.push(`  概要: ${excerpt}`);
      }
    }

    const knowledge = lines.join('\n');

    // ── 4. KVに保存────────────────────────────────────────────────
    await saveKnowledge(knowledge, latestEditTime);

    return NextResponse.json({
      synced: true,
      latestEditTime,
      blogCount: allBlogRes.results.length,
    });
  } catch (err) {
    console.error('sync-knowledge error:', err);
    return NextResponse.json(
      { error: 'Sync failed' },
      { status: 500 }
    );
  }
}
