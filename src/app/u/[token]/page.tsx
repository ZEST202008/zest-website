import type { Metadata } from 'next';
import { verifyToken } from '@/lib/unsubscribe';
import UnsubscribeForm from './UnsubscribeForm';

// 配信停止ページは検索結果に出す必要がない
export const metadata: Metadata = {
  title: '配信停止 | 株式会社ZEST',
  robots: { index: false, follow: false },
};

export default async function Page({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const target = verifyToken(token);

  return (
    <section className="py-16">
      <div className="container-inner max-w-xl">
        <h1 className="section-title">配信の停止</h1>

        {target ? (
          <>
            <p className="section-sub mb-8">
              {target.domain} 宛の、弊社からのご案内メールを停止します。
              下のボタンを押していただくだけで完了します。ご返信は不要です。
            </p>
            <UnsubscribeForm token={token} domain={target.domain} />
          </>
        ) : (
          <>
            <p className="section-sub mb-8">
              このリンクは有効ではありませんでした。リンクが途中で切れている可能性があります。
            </p>
            <p className="text-sm text-slate-600">
              お手数ですが、受け取られたメールにそのままご返信ください。
              ご返信いただければ、以後お送りいたしません。
            </p>
          </>
        )}
      </div>
    </section>
  );
}
