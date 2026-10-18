'use client';

import Link from 'next/link';
import { Suspense, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Check, Copy } from 'lucide-react';
import { QUESTIONS, type Answers, type QuestionId } from '@/lib/is-diagnosis/questions';
import { evaluate, isComplete, VERDICT_PRESENTATION, type DiagnosisResult } from '@/lib/is-diagnosis/scoring';
import { readPersonalization } from '@/lib/is-diagnosis/personalize';
import { trackEvent, AnalyticsEvent } from '@/lib/analytics';

/** 4つの目盛りの表示 */
function Gauge({ label, value, level }: { label: string; value: string; level: '高' | '中' | '低' }) {
  const color =
    level === '高' ? 'bg-brand-orange' : level === '中' ? 'bg-amber-400' : 'bg-slate-300';
  const width = level === '高' ? 'w-full' : level === '中' ? 'w-2/3' : 'w-1/3';
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-sm font-bold text-brand-navy">{label}</span>
        <span className="text-xs text-slate-500">{value}</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} ${width} rounded-full transition-all`} />
      </div>
    </div>
  );
}

/** 社長へ転送できる1枚。設計書で求められている出力 */
function buildForwardText(result: DiagnosisResult, company: string | null): string {
  const p = VERDICT_PRESENTATION[result.verdict];
  return [
    `【無料診断の結果】${company ? `${company} 様` : ''}`,
    '',
    `判定：${result.verdict}　${p.heading}`,
    '',
    p.summary,
    '',
    '■ 現在の状態',
    `・売上への意識：${result.awareness.level}（${result.awareness.score}/${result.awareness.max}）`,
    `・方法論の具体度：${result.method.level}（${result.method.score}/${result.method.max}）`,
    `・売上の勢い：${result.momentum.label}`,
    `・取引が止まったお取引先への手当て：${result.dormantCare}`,
    '',
    `■ 手が回っていない領域（${result.upside.score}/${result.upside.max}）`,
    ...(result.upside.reasons.length > 0
      ? result.upside.reasons.map((r) => `・${r}`)
      : ['・該当なし']),
    '',
    '■ この判定の根拠',
    ...result.rationale.map((r) => `・${r}`),
    '',
    '診断：株式会社ZEST インサイドセールス内製化支援',
    'https://www.zest2020.com/services/inside-sales',
  ].join('\n');
}

function DiagnosisContent() {
  const params = useSearchParams();
  const p = readPersonalization(params);
  const query = params.toString();

  const [answers, setAnswers] = useState<Answers>({});
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);
  const startTracked = useRef(false);

  const answeredCount = QUESTIONS.filter((q) => {
    const v = answers[q.id];
    return q.type === 'multiple' ? Array.isArray(v) && v.length > 0 : typeof v === 'string';
  }).length;
  const complete = isComplete(answers);

  function answer(id: QuestionId, value: string, type: 'single' | 'multiple') {
    if (!startTracked.current) {
      startTracked.current = true;
      trackEvent(AnalyticsEvent.IsDiagnosisStart);
    }
    setAnswers((prev) => {
      if (type === 'single') return { ...prev, [id]: value };
      const current = Array.isArray(prev[id]) ? (prev[id] as string[]) : [];
      // 「特にない」を選んだら他を外す。逆も同じ
      if (value === 'none') return { ...prev, [id]: current.includes('none') ? [] : ['none'] };
      const next = current.filter((v) => v !== 'none');
      return {
        ...prev,
        [id]: next.includes(value) ? next.filter((v) => v !== value) : [...next, value],
      };
    });
  }

  if (showResult) {
    const result = evaluate(answers);
    const pres = VERDICT_PRESENTATION[result.verdict];
    const forwardText = buildForwardText(result, p.company);
    const exitQuery = new URLSearchParams(query);
    exitQuery.set('via', 'diagnosis');
    exitQuery.set('verdict', result.verdict);

    return (
      <section className="py-16">
        <div className="container-inner max-w-2xl">
          <div className="card border-2 border-brand-orange mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-orange text-white font-black text-lg">
                {result.verdict}
              </span>
              <h1 className="text-xl font-black text-brand-navy">{pres.heading}</h1>
            </div>
            <p className="text-slate-700 leading-relaxed text-sm">{pres.summary}</p>
          </div>

          <div className="card mb-6 space-y-5">
            <h2 className="font-black text-brand-navy">いまの状態</h2>
            <Gauge label="売上への意識" value={`${result.awareness.score} / ${result.awareness.max}`} level={result.awareness.level} />
            <Gauge label="方法論の具体度" value={`${result.method.score} / ${result.method.max}`} level={result.method.level} />
            <Gauge label="売上の勢い" value={result.momentum.label} level={result.momentum.level} />
            <div>
              <div className="flex justify-between items-baseline mb-1.5">
                <span className="text-sm font-bold text-brand-navy">止まったお取引先への手当て</span>
                <span className="text-xs text-slate-500">{result.dormantCare}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${
                  result.dormantCare === '十分' ? 'bg-brand-orange w-full'
                  : result.dormantCare === '部分的' ? 'bg-amber-400 w-2/3' : 'bg-slate-300 w-1/3'}`} />
              </div>
            </div>
          </div>

          {result.upside.reasons.length > 0 && (
            <div className="card mb-6">
              <h2 className="font-black text-brand-navy mb-3">
                手が回っていない領域（{result.upside.score} / {result.upside.max}）
              </h2>
              <ul className="space-y-2">
                {result.upside.reasons.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="text-brand-orange mt-0.5">・</span>{r}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="card mb-8">
            <h2 className="font-black text-brand-navy mb-3">この判定の根拠</h2>
            <ul className="space-y-2">
              {result.rationale.map((r) => (
                <li key={r} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="text-slate-400 mt-0.5">・</span>{r}
                </li>
              ))}
            </ul>
          </div>

          {/* 出口。判定によって主たる導線を変える（設計書の判定ルール） */}
          <div className="space-y-3">
            {pres.primaryCta === 'meeting' ? (
              <Link href={`/is/meeting?${exitQuery.toString()}`} className="btn-primary w-full justify-center">
                {pres.ctaLabel}
              </Link>
            ) : (
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(forwardText).then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2500);
                  });
                }}
                className="btn-primary w-full justify-center"
              >
                {copied ? <><Check size={18} /> コピーしました</> : <><Copy size={18} /> {pres.ctaLabel}</>}
              </button>
            )}

            <Link href={`/is/download?${exitQuery.toString()}`} className="btn-secondary w-full justify-center">
              サービス概要の資料をもらう（無料）
            </Link>

            {pres.primaryCta === 'meeting' && (
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(forwardText).then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2500);
                  });
                }}
                className="w-full text-sm text-slate-500 hover:text-brand-orange py-2"
              >
                {copied ? 'コピーしました' : 'この結果を社内で共有する（文面をコピー）'}
              </button>
            )}
          </div>

          <details className="mt-8">
            <summary className="text-sm text-slate-500 cursor-pointer">共有用の文面を表示する</summary>
            <pre className="mt-3 text-xs text-slate-600 bg-slate-50 rounded-lg p-4 whitespace-pre-wrap leading-relaxed">
              {forwardText}
            </pre>
          </details>

          <button onClick={() => { setShowResult(false); setAnswers({}); startTracked.current = false; }}
            className="mt-6 text-sm text-slate-400 hover:text-slate-600">
            もう一度診断する
          </button>
        </div>
      </section>
    );
  }

  let currentBlock = '';

  return (
    <section className="py-12">
      <div className="container-inner max-w-2xl">
        <Link href={query ? `/is?${query}` : '/is'}
          className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-brand-orange no-underline mb-6">
          <ArrowLeft size={16} /> 戻る
        </Link>

        <h1 className="section-title">無料診断</h1>
        <p className="section-sub mb-8">
          全11問・約3分です。金額はお聞きしません。結果はその場でご覧いただけます。
        </p>

        <div className="sticky top-16 bg-white/95 backdrop-blur py-3 z-10 mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-semibold text-slate-500">{answeredCount} / {QUESTIONS.length} 問</span>
            <span className="font-bold text-brand-orange">{Math.round((answeredCount / QUESTIONS.length) * 100)}%</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-brand-orange rounded-full transition-all"
              style={{ width: `${(answeredCount / QUESTIONS.length) * 100}%` }} />
          </div>
        </div>

        <div className="space-y-5">
          {QUESTIONS.map((q, i) => {
            const showBlock = q.block !== currentBlock;
            currentBlock = q.block;
            const selected = answers[q.id];
            return (
              <div key={q.id}>
                {showBlock && (
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-8 mb-3">
                    {q.block}
                  </div>
                )}
                <div className="card">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-slate-100 text-xs font-bold text-slate-500 flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-bold text-brand-navy text-sm leading-relaxed">{q.text}</p>
                      {q.note && <p className="text-xs text-slate-500 mt-1">{q.note}</p>}
                      {q.type === 'multiple' && (
                        <p className="text-xs text-slate-400 mt-1">あてはまるものをすべて選んでください</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2 pl-9">
                    {q.choices.map((c) => {
                      const isSelected = q.type === 'multiple'
                        ? Array.isArray(selected) && selected.includes(c.value)
                        : selected === c.value;
                      return (
                        <button key={c.value} type="button"
                          onClick={() => answer(q.id, c.value, q.type)}
                          className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                            isSelected
                              ? 'border-brand-orange bg-orange-50 text-brand-navy font-semibold'
                              : 'border-slate-200 text-slate-600 hover:border-brand-orange'
                          }`}>
                          {c.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => {
              const result = evaluate(answers);
              trackEvent(AnalyticsEvent.IsDiagnosisComplete, {
                verdict: result.verdict,
                upside: result.upside.score,
              });
              setShowResult(true);
              window.scrollTo({ top: 0 });
            }}
            disabled={!complete}
            className={`btn-primary ${!complete ? 'opacity-40 cursor-not-allowed' : ''}`}>
            {complete ? '診断結果を見る →' : `結果を見る（残り ${QUESTIONS.length - answeredCount} 問）`}
          </button>
        </div>
      </div>
    </section>
  );
}

export default function DiagnosisPage() {
  return (
    <Suspense fallback={null}>
      <DiagnosisContent />
    </Suspense>
  );
}
