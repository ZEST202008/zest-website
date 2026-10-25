/**
 * GA4 イベント送信ユーティリティ
 *
 * 【測定IDの管理方針】
 * GA4の測定IDは配信HTMLに出力される公開値であり秘匿情報ではないため、
 * 環境変数ではなくコードで管理する。これにより「mainにマージ＝本番で計測開始」となり、
 * デプロイのたびに管理画面での設定作業が発生しない。
 *
 * 計測されるのは本番ドメイン（PRODUCTION_HOST）でアクセスされたときだけなので、
 * ローカル開発・Vercelのプレビューデプロイのアクセスは本番データに混ざらない。
 *
 * 【セットアップ手順】
 * 1. https://analytics.google.com → 管理 → データストリーム → ウェブ で
 *    www.zest2020.com のストリームを作成し、測定ID（G-XXXXXXXXXX）を取得
 * 2. 下の PRODUCTION_GA_ID に貼り付けてmainにマージする（未設定の間はタグを読み込まない）
 * 3. GA4 → 管理 → イベント で contact_form_click と chat_lead_captured を
 *    キーイベントとしてマークする
 *
 * プレビュー環境で一時的に計測を試したい場合のみ、環境変数 NEXT_PUBLIC_GA_ID で上書きできる。
 */

/** 本番の測定ID（GA4プロパティ「ZEST Inc.」の www.zest2020.com ウェブストリーム） */
const PRODUCTION_GA_ID = 'G-YVTJXSLHDD';

/** この host でアクセスされたときだけ計測する */
const PRODUCTION_HOST = 'www.zest2020.com';

/** 環境変数による上書き（プレビュー環境での検証用。通常は未設定） */
const GA_ID_OVERRIDE = process.env.NEXT_PUBLIC_GA_ID ?? '';

/**
 * 現在のホスト名で使うべき測定IDを返す。計測しない場合は null。
 * ホスト名の判定が必要なため、クライアント側でのみ呼ぶこと。
 */
export function resolveGaId(hostname: string): string | null {
  if (GA_ID_OVERRIDE) return GA_ID_OVERRIDE;
  if (!PRODUCTION_GA_ID) return null;
  return hostname === PRODUCTION_HOST ? PRODUCTION_GA_ID : null;
}

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * 任意のGA4イベントを送信する。
 * gtagが読み込まれていない環境（開発・プレビュー・測定ID未設定）では何もしない。
 */
export function trackEvent(name: string, params: GtagParams = {}): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', name, params);
}

/** ページビューを手動送信する（App Router のクライアント遷移用） */
export function trackPageview(path: string): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

/**
 * 商談化までのファネルを追跡するためのイベント名。
 * GA4 の「管理 → イベント → キーイベントとしてマークを付ける」で
 * contact_form_click / chat_lead_captured をキーイベント（旧コンバージョン）に設定する。
 */
export const AnalyticsEvent = {
  /** お問い合わせフォーム（Googleフォーム）への遷移 */
  ContactFormClick: 'contact_form_click',
  /** チャットウィジェットを開いた */
  ChatOpen: 'chat_open',
  /** チャットで最初のメッセージを送信した（=会話開始） */
  ChatFirstMessage: 'chat_first_message',
  /** チャットから担当者へエスカレーション＝リード獲得 */
  ChatLeadCaptured: 'chat_lead_captured',
  /** 属人化診断の開始・完了（カチカタ） */
  DiagnosisStart: 'diagnosis_start',
  DiagnosisComplete: 'diagnosis_complete',

  // ── インサイドセールス内製化の入口診断 ──
  // 設計書のKPI（診断の開始率・完了率、資料DL数、打ち合わせ申込数〈診断経由かどうか別〉）に対応する
  /** 着地ページの表示 */
  IsEntryView: 'is_entry_view',
  /** 診断の開始（最初の回答） */
  IsDiagnosisStart: 'is_diagnosis_start',
  /** 診断の完了（判定A/B/Cをパラメータで送る） */
  IsDiagnosisComplete: 'is_diagnosis_complete',
  /** 資料ダウンロードの申込（フォーム送信） */
  IsDocumentRequest: 'is_document_request',
  /** 資料PDFの実ダウンロード。申込と分けるのは、申込だけして受け取らない離脱を見るため */
  IsDocumentDownload: 'is_document_download',
  /** オンライン打ち合わせの申込（診断経由かどうかを via で送る） */
  IsMeetingRequest: 'is_meeting_request',
  /** 申込後に予約ページを開いた。申込と分けるのは、日程選びで離脱する割合を見るため */
  IsMeetingBookingOpen: 'is_meeting_booking_open',
} as const;
