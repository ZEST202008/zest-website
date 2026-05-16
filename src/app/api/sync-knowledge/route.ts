import { NextRequest, NextResponse } from 'next/server';
import { notion } from '@/lib/notion';
import { getKnowledgeSyncedAt, saveKnowledge } from '@/lib/kv';

/**
 * Notion → KV 知識同期エンドポイント
 *
 * Vercel Cron から毎時呼び出される。
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
    const servicesDbId = process.env.NOTION_SERVICES_DB_ID;

    if (!blogDbId || !servicesDbId) {
      return NextResponse.json(
        { error: 'Notion DB IDs not configured' },
        { status: 500 }
      );
    }

    // ── 1. Notion から最終編集時刻を取得（変更検知）─────────────────
    const [blogRes, servicesRes] = await Promise.all([
      notion.databases.query({
        database_id: blogDbId,
        filter: { property: 'Status', select: { equals: 'Published' } },
        sorts: [{ timestamp: 'last_edited_time', direction: 'descending' }],
        page_size: 1,
      }),
      notion.databases.query({
        database_id: servicesDbId,
        filter: { property: 'Published', checkbox: { equals: true } },
        sorts: [{ timestamp: 'last_edited_time', direction: 'descending' }],
        page_size: 1,
      }),
    ]);

    // 最新の編集時刻を取得
    const latestBlogTime =
      (blogRes.results[0] as any)?.last_edited_time ?? null;
    const latestServiceTime =
      (servicesRes.results[0] as any)?.last_edited_time ?? null;

    const latestEditTime = [latestBlogTime, latestServiceTime]
      .filter(Boolean)
      .sort()
      .pop() ?? new Date().toISOString();

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

    // ── 2. 全コンテンツを取得────────────────────────────────────────
    const [allBlogRes, allServicesRes] = await Promise.all([
      notion.databases.query({
        database_id: blogDbId,
        filter: { property: 'Status', select: { equals: 'Published' } },
        sorts: [{ property: 'Date', direction: 'descending' }],
      }),
      notion.databases.query({
        database_id: servicesDbId,
        filter: { property: 'Published', checkbox: { equals: true } },
        sorts: [{ property: 'Order', direction: 'ascending' }],
      }),
    ]);

    // ── 3. 知識テキストを構築────────────────────────────────────────
    const lines: string[] = [];

    // ブログ記事一覧
    lines.push('### 最新ブログ記事');
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

    // サービス情報
    lines.push('');
    lines.push('### サービス最新情報');
    for (const page of allServicesRes.results) {
      const p = page as any;
      const name = p.properties?.Name?.title?.[0]?.plain_text ?? '';
      const tagline = p.properties?.Tagline?.rich_text?.[0]?.plain_text ?? '';
      const description = p.properties?.Description?.rich_text?.[0]?.plain_text ?? '';
      if (name) {
        lines.push(`- ${name}: ${tagline}`);
        if (description) lines.push(`  ${description}`);
      }
    }

    const knowledge = lines.join('\n');

    // ── 4. KVに保存────────────────────────────────────────────────
    await saveKnowledge(knowledge, latestEditTime);

    return NextResponse.json({
      synced: true,
      latestEditTime,
      blogCount: allBlogRes.results.length,
      serviceCount: allServicesRes.results.length,
    });
  } catch (err) {
    console.error('sync-knowledge error:', err);
    return NextResponse.json(
      { error: 'Sync failed' },
      { status: 500 }
    );
  }
}
