/**
 * GA4 イベント送信ユーティリティ
 *
 * 【セットアップ手順】
 * 1. https://analytics.google.com → 管理 → データストリーム → ウェブ で
 *    www.zest2020.com のストリームを作成し、測定ID（G-XXXXXXXXXX）を取得
 * 2. Vercel の環境変数（Production / Preview / Development）に追加：
 *    NEXT_PUBLIC_GA_ID = G-XXXXXXXXXX
 * 3. 再デプロイすると計測が開始される
 *    （未設定の環境ではタグ自体を読み込まないので、ローカル開発が汚れない）
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';
export const isAnalyticsEnabled = GA_ID.length > 0;

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** 任意のGA4イベントを送信する（GA未設定時は何もしない） */
export function trackEvent(name: string, params: GtagParams = {}): void {
  if (typeof window === 'undefined' || !window.gtag || !isAnalyticsEnabled) return;
  window.gtag('event', name, params);
}

/** ページビューを手動送信する（App Router のクライアント遷移用） */
export function trackPageview(path: string): void {
  if (typeof window === 'undefined' || !window.gtag || !isAnalyticsEnabled) return;
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
  /** 属人化診断の開始・完了 */
  DiagnosisStart: 'diagnosis_start',
  DiagnosisComplete: 'diagnosis_complete',
} as const;
