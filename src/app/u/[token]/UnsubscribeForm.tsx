'use client';

import { useState } from 'react';

type State = 'idle' | 'sending' | 'done' | 'error';

export default function UnsubscribeForm({ token, domain }: { token: string; domain: string }) {
  const [state, setState] = useState<State>('idle');

  async function submit() {
    setState('sending');
    try {
      const res = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      setState(res.ok ? 'done' : 'error');
    } catch {
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
        <p className="font-medium">配信を停止しました。</p>
        <p className="mt-2 text-sm text-slate-600">
          {domain} 宛に、今後この件でご連絡することはありません。
          お手数をおかけしました。
        </p>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={submit}
        disabled={state === 'sending'}
        className="btn-primary disabled:opacity-60"
      >
        {state === 'sending' ? '処理しています…' : '配信を停止する'}
      </button>

      {state === 'error' && (
        <p className="mt-4 text-sm text-red-600">
          停止の記録に失敗しました。お手数ですが、このメールにご返信いただければ確実に停止いたします。
        </p>
      )}
    </div>
  );
}
