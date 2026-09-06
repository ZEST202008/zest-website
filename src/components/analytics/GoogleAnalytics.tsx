'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState, Suspense } from 'react';
import { resolveGaId, trackPageview } from '@/lib/analytics';

/**
 * App Router のクライアント遷移でもページビューを送るための追跡コンポーネント。
 * gtag の config では send_page_view:false にしており、
 * 初回表示・遷移ともにここから明示的に送信する（二重計上を防ぐため）。
 */
function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastSentPath = useRef<string | null>(null);

  // useSearchParams() は再レンダーのたびに別オブジェクトを返すため、
  // 依存配列には文字列を入れる（オブジェクトを入れると同じURLで再発火して二重計上になる）
  const query = searchParams.toString();

  useEffect(() => {
    const path = query ? `${pathname}?${query}` : pathname;
    // 同じURLの連続送信を防ぐ（同一URLへの遷移は起こり得ないため実害はない）
    if (lastSentPath.current === path) return;
    lastSentPath.current = path;
    trackPageview(path);
  }, [pathname, query]);

  return null;
}

export default function GoogleAnalytics() {
  // 計測するかどうかは host 名で決まるため、判定はマウント後に行う。
  // サーバー側と初回レンダーはどちらも null を返すのでハイドレーションはずれない。
  const [gaId, setGaId] = useState<string | null>(null);

  useEffect(() => {
    setGaId(resolveGaId(window.location.hostname));
  }, []);

  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${gaId}', { send_page_view: false });
        `}
      </Script>
      <Suspense fallback={null}>
        <PageviewTracker />
      </Suspense>
    </>
  );
}
