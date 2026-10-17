'use client';

import { useState } from 'react';
import { trackEvent, AnalyticsEvent } from '@/lib/analytics';

type LeadType = 'document' | 'meeting';

interface Props {
  type: LeadType;
  /** 診断を経由してきたか。設計書でホット案件の判別に使うとされている */
  viaDiagnosis?: boolean;
  verdict?: string;
  defaultCompany?: string;
}

const COPY: Record<LeadType, { submit: string; done: string; consent: string }> = {
  document: {
    submit: '資料を受け取る',
    done: 'ありがとうございます。ご入力のメールアドレス宛に、サービス概要の資料をお送りします。',
    consent:
      'ご入力いただいた情報は、資料の送付と、今後のご案内のために利用します。配信の停止はいつでも承ります。',
  },
  meeting: {
    submit: '打ち合わせを申し込む',
    done: 'ありがとうございます。日程の候補をメールでお送りします。',
    consent:
      'ご入力いただいた情報は、ご連絡と日程調整のために利用します。配信の停止はいつでも承ります。',
  },
};

export default function LeadForm({ type, viaDiagnosis = false, verdict, defaultCompany }: Props) {
  const [company, setCompany] = useState(defaultCompany ?? '');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [hasLedger, setHasLedger] = useState('');
  const [dormantContact, setDormantContact] = useState('');
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
        body: JSON.stringify({ type, company, name, email, hasLedger, dormantContact, viaDiagnosis, verdict }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? '送信に失敗しました。');
      trackEvent(
        type === 'document' ? AnalyticsEvent.IsDocumentRequest : AnalyticsEvent.IsMeetingRequest,
        { via: viaDiagnosis ? 'diagnosis' : 'direct', ...(verdict ? { verdict } : {}) }
      );
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : '送信に失敗しました。');
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <div className="card text-center py-10">
        <p className="text-brand-navy font-bold mb-2">送信しました</p>
        <p className="text-slate-600 text-sm leading-relaxed">{copy.done}</p>
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

      {type === 'meeting' && (
        <>
          <div>
            <label htmlFor="ledger" className="block text-sm font-bold text-brand-navy mb-1.5">
              これまでの取引の記録は残っていますか
            </label>
            <select id="ledger" className={field} value={hasLedger} onChange={(e) => setHasLedger(e.target.value)}>
              <option value="">選択してください</option>
              <option>システムで一元管理している</option>
              <option>ExcelやGoogleスプレッドシートで管理している</option>
              <option>担当者ごとにバラバラに持っている</option>
              <option>まとまった記録は残っていない</option>
            </select>
          </div>
          <div>
            <label htmlFor="dormant" className="block text-sm font-bold text-brand-navy mb-1.5">
              取引が止まったお取引先へ、連絡はされていますか
            </label>
            <select id="dormant" className={field} value={dormantContact}
              onChange={(e) => setDormantContact(e.target.value)}>
              <option value="">選択してください</option>
              <option>決まった担当者が定期的に連絡している</option>
              <option>気の向いたときに連絡している</option>
              <option>ほとんど連絡していない</option>
              <option>どこが止まっているか把握できていない</option>
            </select>
          </div>
        </>
      )}

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
