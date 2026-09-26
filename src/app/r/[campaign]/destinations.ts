/**
 * 短縮リンクの行き先とトラッキングパラメータの組み立て。
 *
 * 【なぜ短縮リンクを挟むのか】
 * 営業メールにUTM付きの長いURLをそのまま貼ると、受け取った側には
 * 「計測されている」ことが一目で伝わり、初回接触では警戒materialになる。
 * かといってUTMを捨てると、どの企業がLPを見たのかが追えなくなる。
 *
 * 自社ドメインの短いURLを挟めば、見た目は普通のリンクのまま、
 * サーバー側でUTMを付与して計測を成立させられる。
 * 外部の短縮URLサービス（bit.ly等）は迷惑メール判定を上げるため使わない。
 *
 * また、問い合わせフォーム経由の送信はプレーンテキストしか送れず
 * アンカーテキストにリンクを埋め込めない。短縮リンクはその制約も同時に解く。
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zest2020.com';

/** キャンペーン識別子 → 遷移先パス */
const DESTINATIONS: Record<string, { path: string; campaign: string }> = {
  ai: { path: '/services/ai-chat-assistant', campaign: 'outbound-ai-chat' },
  kachikata: { path: '/services/kachikata', campaign: 'outbound-kachikata' },
  sheetviz: { path: '/services/sheetziv', campaign: 'outbound-sheetviz' },
  is: { path: '/services/inside-sales', campaign: 'outbound-inside-sales' },
};

/**
 * 追跡コードの先頭1文字で経路を表す。
 * e = メール / f = 問い合わせフォーム / それ以外は不明として扱う。
 */
function mediumFromCode(code: string | null): string {
  if (!code) return 'outbound';
  if (code.startsWith('e')) return 'email';
  if (code.startsWith('f')) return 'form';
  return 'outbound';
}

/** 遷移先URLにUTMを付けて返す。未知のキャンペーンはトップへ */
export function buildTrackedUrl(campaign: string, code: string | null): string {
  const dest = DESTINATIONS[campaign];
  const url = new URL(dest?.path ?? '/', SITE_URL);

  url.searchParams.set('utm_source', 'outbound');
  url.searchParams.set('utm_medium', mediumFromCode(code));
  url.searchParams.set('utm_campaign', dest?.campaign ?? 'outbound-unknown');
  if (code) url.searchParams.set('utm_content', code);

  return url.toString();
}
