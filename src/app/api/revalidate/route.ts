import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { timingSafeEqual } from 'node:crypto';

/**
 * ブログのキャッシュを手動で作り直すエンドポイント。
 *
 * ブログは Notion を1時間ごとに読み直す設定のため、記事を公開しても最大1時間
 * 反映されない。公開直後にここを叩くと、その場で作り直される。
 *
 * 認証（どちらでも可）:
 *   - Authorization: Bearer <CRON_SECRET>      … Notionのオートメーションや curl 向け
 *   - ?secret=<CRON_SECRET>                    … ブラウザのブックマーク向け
 *
 * 作り直す対象は記事一覧・記事ページ・サイトマップ。公開ページを作り直すだけで、
 * データは一切変更しない。
 */
export const dynamic = 'force-dynamic';

const TARGETS: { path: string; type?: 'page' | 'layout' }[] = [
  { path: '/blog' },
  { path: '/blog/[slug]', type: 'page' },
  { path: '/sitemap.xml' },
];

function matches(given: string, expected: string) {
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  // 長さが違うと timingSafeEqual が例外を投げるため、先に長さを見る
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function handle(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    console.error('[revalidate] CRON_SECRET is not configured');
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }

  const header = req.headers.get('authorization') ?? '';
  const fromHeader = header.startsWith('Bearer ')
    ? matches(header.slice('Bearer '.length), secret)
    : false;
  const querySecret = req.nextUrl.searchParams.get('secret');
  const fromQuery = querySecret !== null && matches(querySecret, secret);

  if (!fromHeader && !fromQuery) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  for (const t of TARGETS) {
    revalidatePath(t.path, t.type);
  }

  const revalidated = TARGETS.map((t) => t.path);
  console.log('[revalidate] revalidated', revalidated.join(', '));

  return NextResponse.json({
    revalidated,
    now: new Date().toISOString(),
  });
}

export async function GET(req: NextRequest) {
  return handle(req);
}

export async function POST(req: NextRequest) {
  return handle(req);
}
