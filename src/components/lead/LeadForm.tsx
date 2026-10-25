'use client';

import { useState } from 'react';
import { CalendarDays, Download } from 'lucide-react';
import { trackEvent, AnalyticsEvent } from '@/lib/analytics';

type LeadType = 'document' | 'meeting';
export type ServiceId = 'inside-sales' | 'ai-chat';

interface Question {
  id: string;
  label: string;
  options: string[];
}

interface ServiceConfig {
  /** 資料の実体。public/documents に置いた静的ファイルなので、メール本文から直接案内しても同じものが開ける */
  documentUrl: string;
  documentDone: string;
  meetingDone: string;
  /**
   * Googleカレンダーの予約スケジュールのURL。案件ごとに担当が違うため、サービス単位で持つ。
   *
   * 空文字のあいだは、申込を受けて人が日程を調整する従来の動きのままになる。
   * URLを入れた時点で、送信後の画面に「空いている日時を選ぶ」が出る。
   * フォームを残すのは、会社名と事前質問の回答を取りこぼさないため。
   * 予約ページだけにすると、この情報が手に入らない。
   */
  bookingUrl: string;
  bookingOwner: string;
  /** 打ち合わせ前に相手の状況をつかむための設問。多くすると送信率が落ちるので2問まで */
  meetingQuestions: Question[];
}

const SERVICE: Record<ServiceId, ServiceConfig> = {
  'inside-sales': {
    documentUrl: '/documents/zest-inside-sales-overview.pdf',
    documentDone: 'この場でダウンロードいただけます。',
    meetingDone: 'ありがとうございます。日程の候補をメールでお送りします。',
    bookingUrl: '', // 丹澤 直紀のアカウントで作成した予約スケジュールのURLを入れる
    bookingOwner: '丹澤 直紀',
    meetingQuestions: [
      {
        id: 'ledger',
        label: 'これまでの取引の記録は残っていますか',
        options: [
          'システムで一元管理している',
          'ExcelやGoogleスプレッドシートで管理している',
          '担当者ごとにバラバラに持っている',
          'まとまった記録は残っていない',
        ],
      },
      {
        id: 'dormant',
        label: '取引が止まったお取引先へ、連絡はされていますか',
        options: [
          '決まった担当者が定期的に連絡している',
          '気の向いたときに連絡している',
          'ほとんど連絡していない',
          'どこが止まっているか把握できていない',
        ],
      },
    ],
  },
  'ai-chat': {
    documentUrl: '/documents/zest-ai-chat-overview.pdf',
    documentDone: 'この場でダウンロードいただけます。',
    meetingDone: 'ありがとうございます。日程の候補をメールでお送りします。',
    bookingUrl: 'https://calendar.app.google/yUbDSmdBf12wAmv7A',
    bookingOwner: '丹澤 俊平',
    meetingQuestions: [
      {
        id: 'inquiryVolume',
        label: 'サイトからの問い合わせは、いまどれくらいありますか',
        options: ['月に10件以上ある', '月に数件ある', 'ほとんどない', '把握していない'],
      },
      {
        id: 'responseTime',
        label: '問い合わせを受けてから、最初の返信までどれくらいかかりますか',
        options: ['当日中に返している', '翌営業日になることが多い', '数日かかることがある', '決まっていない'],
      },
    ],
  },
};

interface Props {
  type: LeadType;
  service?: ServiceId;
  /** 診断を経由してきたか。設計書でホット案件の判別に使うとされている */
  viaDiagnosis?: boolean;
  verdict?: string;
  defaultCompany?: string;
}

const COPY: Record<LeadType, { submit: string; consent: string }> = {
  document: {
    submit: '資料を受け取る',
    consent: 'ご入力いただいた情報は、資料の送付と、今後のご案内のために利用します。配信の停止はいつでも承ります。',
  },
  meeting: {
    submit: '打ち合わせを申し込む',
    consent: 'ご入力いただいた情報は、ご連絡と日程調整のために利用します。配信の停止はいつでも承ります。',
  },
};

export default function LeadForm({
  type, service = 'inside-sales', viaDiagnosis = false, verdict, defaultCompany,
}: Props) {
  const cfg = SERVICE[service];
  const [company, setCompany] = useState(defaultCompany ?? '');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const copy = COPY[type];

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch('/api/is/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          service,
          company,
          name,
          email,
          viaDiagnosis,
          verdict,
          // 設問はサービスごとに違うので、固定のキーではなくラベルと回答の組で送る
          answers: cfg.meetingQuestions
            .filter((q) => answers[q.id])
            .map((q) => ({ label: q.label, value: answers[q.id] })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? '送信に失敗しました。');
      trackEvent(
        type === 'document' ? AnalyticsEvent.IsDocumentRequest : AnalyticsEvent.IsMeetingRequest,
        { service, via: viaDiagnosis ? 'diagnosis' : 'direct', ...(verdict ? { verdict } : {}) }
      );
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : '送信に失敗しました。');
    } finally {
      setSending(false);
    }
  }

  if (done) {
    const canBook = type === 'meeting' && cfg.bookingUrl !== '';
    return (
      <div className="card text-center py-10">
        <p className="text-brand-navy font-bold mb-2">送信しました</p>
        <p className="text-slate-600 text-sm leading-relaxed">
          {type === 'document'
            ? cfg.documentDone
            : canBook
              ? 'このまま、空いている日時をお選びいただけます。'
              : cfg.meetingDone}
        </p>
        {canBook && (
          // 申込を受けてから人が日程を出すと、往復のあいだに熱が冷める。
          // 送信直後にその場で確定できるようにする。
          <>
            <a
              href={cfg.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent(AnalyticsEvent.IsMeetingBookingOpen, { service })}
              className="btn-primary inline-flex items-center gap-2 mt-6 no-underline"
            >
              <CalendarDays size={16} /> 空いている日時を選ぶ
            </a>
            <p className="text-xs text-slate-500 mt-4 leading-relaxed">
              {cfg.bookingOwner}のカレンダーの空き状況が表示されます。<br />
              都合のよい時間が見つからない場合は、このままお待ちください。改めてご連絡します。
            </p>
          </>
        )}
        {type === 'document' && (
          // 送信後に待たせない。メール送付を約束すると、届くまでの間に関心が冷め、
          // 送信処理が落ちていた場合は約束が果たされないまま終わる。
          <a
            href={cfg.documentUrl}
            download
            onClick={() => trackEvent(AnalyticsEvent.IsDocumentDownload, { service, via: viaDiagnosis ? 'diagnosis' : 'direct' })}
            className="btn-primary inline-flex items-center gap-2 mt-6 no-underline"
          >
            <Download size={16} /> 資料をダウンロード（PDF）
          </a>
        )}
      </div>
    );
  }

  const field = 'w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-orange';

  return (
    <form onSubmit={submit} className="card space-y-5">
      <div>
        <label htmlFor="company" className="block text-sm font-bold text-brand-navy mb-1.5">
          会社名 <span className="text-brand-orange">必須</span>
        </label>
        <input id="company" className={field} value={company} required
          onChange={(e) => setCompany(e.target.value)} placeholder="株式会社○○" />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-bold text-brand-navy mb-1.5">
          メールアドレス <span className="text-brand-orange">必須</span>
        </label>
        <input id="email" type="email" className={field} value={email} required
          onChange={(e) => setEmail(e.target.value)} placeholder="you@example.co.jp" />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-bold text-brand-navy mb-1.5">お名前</label>
        <input id="name" className={field} value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      {type === 'meeting' && cfg.meetingQuestions.map((q) => (
        <div key={q.id}>
          <label htmlFor={q.id} className="block text-sm font-bold text-brand-navy mb-1.5">{q.label}</label>
          <select id={q.id} className={field} value={answers[q.id] ?? ''}
            onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}>
            <option value="">選択してください</option>
            {q.options.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
      ))}

      <p className="text-xs text-slate-500 leading-relaxed">
        {copy.consent}
        <br />
        取り扱いの詳細は<a href="/privacy" className="text-brand-orange hover:underline">プライバシーポリシー</a>をご覧ください。
      </p>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button type="submit" disabled={sending}
        className={`btn-primary w-full justify-center ${sending ? 'opacity-50 cursor-not-allowed' : ''}`}>
        {sending ? '送信中…' : copy.submit}
      </button>
    </form>
  );
}
