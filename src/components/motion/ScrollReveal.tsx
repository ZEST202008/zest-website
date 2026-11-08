'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * data-reveal を付けた要素を、画面に入ったタイミングで表示する。
 *
 * - 表示の遅延は要素側の CSS 変数 --reveal-delay で指定する
 * - 動きを減らす設定の端末では、layout.tsx のインラインスクリプトが
 *   reveal-ready クラスを付けないため、CSS 側で常に表示されたままになる
 * - JavaScript が動かない場合も同じ理由で content は見えたままになる
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains('reveal-ready')) return;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-revealed)')
    );
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 }
    );

    for (const target of targets) {
      // 初回描画の時点ですでに画面内にある要素は、観測を待たずに表示する
      const rect = target.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        target.classList.add('is-revealed');
      } else {
        observer.observe(target);
      }
    }

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
