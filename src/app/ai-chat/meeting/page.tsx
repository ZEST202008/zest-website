'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import LeadForm from '@/components/lead/LeadForm';
import { readPersonalization } from '@/lib/is-diagnosis/personalize';

function Content() {
  const params = useSearchParams();
  const p = readPersonalization(params);
  const query = params.toString();

  return (
    <section className="py-16">
      <div className="container-inner max-w-xl">
        <Link href={query ? `/ai-chat?${query}` : '/ai-chat'}
          className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-brand-orange no-underline mb-8">
          <ArrowLeft size={16} /> 戻る
        </Link>
        <h1 className="section-title">オンライン打ち合わせのお申し込み</h1>
        <p className="section-sub mb-8">30分・無料です。御社のサイトを一緒に見ながら、どこに置くと効くかをお話しします。合わないと判断した場合は、その旨をお伝えします。</p>
        <LeadForm type="meeting" service="ai-chat" defaultCompany={p.company ?? undefined} />
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Content />
    </Suspense>
  );
}
