'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { trackEvent } from '@/lib/analytics';

type Props = ComponentProps<typeof Link> & {
  /** 送信するGA4イベント名 */
  event: string;
  /** イベントに付与するパラメータ */
  eventParams?: Record<string, string | number | boolean>;
};

/**
 * クリック時にGA4イベントを送るリンク。
 * 外部フォーム（Googleフォーム）への遷移など、
 * ページ遷移として計測できない導線のコンバージョン計測に使う。
 */
export default function TrackedLink({ event, eventParams, onClick, ...props }: Props) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        trackEvent(event, eventParams);
        onClick?.(e);
      }}
    />
  );
}
