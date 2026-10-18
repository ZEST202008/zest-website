'use client';

import Link from 'next/link';
import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ClipboardCheck, FileText, CalendarDays, ArrowRight } from 'lucide-react';
import { trackEvent, AnalyticsEvent } from '@/lib/analytics';
import { readPersonalization, buildIntro } from '@/lib/is-diagnosis/personalize';

/**
 * 入口メールの着地ページ。
 * メールに載せるリンクは1本で、ここで3つの入口から選んでもらう（設計書の遷移図）。
 */
function EntryContent() {
  const params = useSearchParams();
  const p = readPersonalization(params);
  const query = params.toString();
  const withQuery = (path: string) => (query ? `${path}?${query}` : path);

  useEffect(() => {
    trackEvent(AnalyticsEvent.IsEntryView, { personalized: p.company ? 'yes' : 'no' });
  }, [p.company]);

  const entries = [
    {
      href: withQuery('/is/diagnosis'),
      icon: <ClipboardCheck size={22} className="text-brand-orange" />,
      label: '無料診断を受ける',
      meta: '約3分・全11問',
      desc: '11の質問にお答えいただくと、御社にいま起きていることと、インサイドセールスが有効かどうかをその場でお返しします。費用はかかりません。',
      primary: true,
    },
    {
      href: withQuery('/is/download'),
      icon: <FileText size={22} className="text-brand-orange" />,
      label: 'サービス概要の資料をもらう',
      meta: '無料',
      desc: '休眠のお取引先から売上をつくる仕組みについて、考え方と進め方をまとめた資料をお送りします。',
      primary: false,
    },
    {
      href: withQuery('/is/meeting'),
      icon: <CalendarDays size={22} className="text-brand-orange" />,
      label: 'オンライン打ち合わせを予約する',
      meta: '30分・無料',
      desc: '診断を受けずに、直接お話しすることもできます。進め方と、導入後に何が起きるかをご説明します。',
      primary: false,
    },
  ];

  return (
    <section className="py-16 md:py-20">
      <div className="container-inner max-w-3xl">
        <div className="mb-12">
          <span className="section-label">インサイドセールス内製化支援</span>
          <h1 className="section-title">御社に眠る売上を、御社の中で掘り起こす。</h1>
          <p className="section-sub">{buildIntro(p)}</p>
          <p className="section-sub mt-3">
            取引が止まったお取引先の多くは、御社を嫌いになったわけではなく、連絡が途絶えただけです。
            まずは、いまどうなっているかを確かめるところから始めてください。
          </p>
        </div>

        <div className="space-y-4">
          {entries.map((e) => (
            <Link key={e.href} href={e.href}
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

export default function InsideSalesEntryPage() {
  return (
    <Suspense fallback={null}>
      <EntryContent />
    </Suspense>
  );
}
