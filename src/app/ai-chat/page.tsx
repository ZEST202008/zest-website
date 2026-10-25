'use client';

import Link from 'next/link';
import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { MessageCircle, FileText, CalendarDays, ArrowRight } from 'lucide-react';
import { trackEvent, AnalyticsEvent } from '@/lib/analytics';
import { readPersonalization } from '@/lib/is-diagnosis/personalize';

/**
 * 入口メールの着地ページ。メールに載せるリンクは1本で、ここで入口を選んでもらう。
 *
 * インサイドセールス側と違い、診断は置かない。
 * チャットが入っていないことはこちらが調べた上で連絡しているため、
 * 相手に自己診断で気づいてもらう必要がなく、実物を触れることのほうが強い。
 */
function EntryContent() {
  const params = useSearchParams();
  const p = readPersonalization(params);
  const query = params.toString();
  const withQuery = (path: string) => (query ? `${path}?${query}` : path);

  useEffect(() => {
    trackEvent(AnalyticsEvent.IsEntryView, { service: 'ai-chat', personalized: p.company ? 'yes' : 'no' });
  }, [p.company]);

  const entries = [
    {
      href: 'https://www.zest2020.com',
      external: true,
      icon: <MessageCircle size={22} className="text-brand-orange" />,
      label: '実物を触ってみる',
      meta: 'いつでも',
      desc: '弊社サイトの右下で、いま動いているものをそのままお試しいただけます。デモ環境ではなく、私たち自身が商談につなげるために使っているものです。',
      primary: true,
    },
    {
      href: withQuery('/ai-chat/download'),
      external: false,
      icon: <FileText size={22} className="text-brand-orange" />,
      label: 'サービス概要の資料をもらう',
      meta: '無料・12ページ',
      desc: '仕組み・設計の考え方・導入の進め方と費用をまとめた資料です。ご入力のあと、その場でダウンロードいただけます。',
      primary: false,
    },
    {
      href: withQuery('/ai-chat/meeting'),
      external: false,
      icon: <CalendarDays size={22} className="text-brand-orange" />,
      label: 'オンライン打ち合わせを予約する',
      meta: '30分・無料',
      desc: '御社のサイトを一緒に見ながら、どこに置くと効くかをお話しします。費用の詳しいこともここでご説明します。',
      primary: false,
    },
  ];

  return (
    <section className="py-16 md:py-20">
      <div className="container-inner max-w-3xl">
        <div className="mb-12">
          <span className="section-label">AIチャットアシスタント</span>
          <h1 className="section-title">サイトに来た人を、取りこぼさない。</h1>
          <p className="section-sub">
            {p.company
              ? `${p.company}様のサイトを拝見して、ご連絡しました。`
              : 'Webサイトの訪問者を、商談につなぐ仕組みのご案内です。'}
          </p>
          <p className="section-sub mt-3">
            Webサイトは夜も休日も動いていますが、問い合わせを受ける人は営業時間にしかいません。
            その時間差のあいだに訪れた人は、答えを得られないまま去っていきます。
          </p>
        </div>

        <div className="space-y-4">
          {entries.map((e) => (
            <Link key={e.href} href={e.href}
              {...(e.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className={`card block no-underline transition-all hover:-translate-y-0.5 ${
                e.primary ? 'border-2 border-brand-orange' : ''
              }`}>
              <div className="flex items-start gap-4">
                <div className="shrink-0 mt-0.5">{e.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <span className="font-black text-brand-navy">{e.label}</span>
                    <span className="text-xs text-slate-500 bg-slate-100 rounded-full px-2 py-0.5">{e.meta}</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{e.desc}</p>
                </div>
                <ArrowRight size={18} className="text-brand-orange shrink-0 mt-1" />
              </div>
            </Link>
          ))}
        </div>

        <p className="text-xs text-slate-400 mt-10 leading-relaxed">
          株式会社ZEST／〒107-0061 東京都港区北青山3-6-7<br />
          ご連絡が不要な場合は、お送りしたメールにご返信ください。以後お送りいたしません。
        </p>
      </div>
    </section>
  );
}

export default function AiChatEntryPage() {
  return (
    <Suspense fallback={null}>
      <EntryContent />
    </Suspense>
  );
}
