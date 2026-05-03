'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, Info, CheckCircle, ChevronRight, ArrowRight } from 'lucide-react';

const CATEGORIES = [
  {
    id: 'cat1',
    label: 'カテゴリ 1',
    labelCls: 'bg-red-100 text-red-700',
    title: 'エース依存度',
    qIds: ['q1', 'q2', 'q3', 'q4', 'q5'],
    questions: [
      '特定のメンバー1〜2名が、チーム全体の売上の半分以上を占めている。',
      '「あの人だから売れる」という会話が社内でよく出る。',
      'トップメンバーが異動・退職した場合に備えた組織的な対策が十分でない。',
      '新人・中堅メンバーの成績が安定せず、成長スピードにばらつきがある。',
      '「OJT」「見て盗め」が主な育成方法になっている。',
    ],
  },
  {
    id: 'cat2',
    label: 'カテゴリ 2',
    labelCls: 'bg-yellow-100 text-yellow-700',
    title: '言語化・型化レベル',
    qIds: ['q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12'],
    questions: [
      'マネージャーの指示に「もっと熱意を持って」「顧客目線で考えろ」といった抽象的な言葉が多い。',
      '「商談が完了した」「フォローが十分」などの判断基準が、担当者によって異なる。',
      '新しいメンバーに渡せる「営業マニュアル」や「セールスプレイブック」が整備されていない。',
      '成功した商談の「何が決め手だったか」を、担当者が言語化して共有していない。',
      '提案書や商談トークの「型（テンプレート）」が整備されておらず、各自が毎回一から作っている。',
      '顧客へのフォローアップのタイミングや方法が、担当者の「感覚」に委ねられている。',
      '失注した理由を記録・分析する仕組みがなく、同様の傾向が繰り返されている。',
    ],
  },
  {
    id: 'cat3',
    label: 'カテゴリ 3',
    labelCls: 'bg-blue-100 text-blue-700',
    title: 'マネジメント・予測精度',
    qIds: ['q13', 'q14', 'q15', 'q16', 'q17'],
    questions: [
      '月次の売上予測と実績の乖離が、20%以上になることが多い。',
      '営業報告（日報・週報）が、改善につながる分析ではなく「行動の記録」になっている。',
      'CRMへの入力が「管理のためのもの」と感じられ、現場の負担になっている。',
      '実態とは異なる楽観的な数字が報告される傾向がある、と感じることがある。',
      'KGI（売上目標）はあるが、それを達成するためのKFS（成功要因）とKPI（行動指標）が明確でない。',
    ],
  },
];

const TOTAL = 17;
const CATEGORY_OFFSETS = CATEGORIES.reduce<Record<string, number>>((acc, cat, i) => {
  acc[cat.id] = CATEGORIES.slice(0, i).reduce((sum, c) => sum + c.qIds.length, 0);
  return acc;
}, {});

export default function DiagnosisSection() {
  const [answers, setAnswers] = useState<Record<string, boolean | undefined>>({});
  const [showResult, setShowResult] = useState(false);

  const allQIds = CATEGORIES.flatMap((c) => c.qIds);
  const answeredCount = allQIds.filter((id) => answers[id] !== undefined).length;
  const score = allQIds.filter((id) => answers[id] === true).length;
  const progress = (answeredCount / TOTAL) * 100;
  const allAnswered = answeredCount >= TOTAL;
  const riskLevel = score >= 10 ? 'high' : score >= 5 ? 'med' : 'low';

  if (showResult) {
    return (
      <DiagResult
        score={score}
        riskLevel={riskLevel}
        onReset={() => { setAnswers({}); setShowResult(false); }}
      />
    );
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-semibold text-slate-500">{answeredCount} / {TOTAL} 回答済み</span>
          <span className="text-sm font-bold text-brand-orange">スコア: {score}</span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-orange rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question cards */}
      <div className="max-w-2xl mx-auto space-y-6">
        {CATEGORIES.map((cat) => (
          <div key={cat.id} className="card">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-slate-100">
              <span className={`text-xs font-bold px-3 py-1.5 rounded-lg ${cat.labelCls}`}>
                {cat.label}
              </span>
              <h3 className="font-black text-brand-navy">{cat.title}</h3>
              <span className="ml-auto text-xs text-slate-400">{cat.qIds.length}問</span>
            </div>
            <div className="divide-y divide-slate-100">
              {cat.questions.map((q, i) => {
                const qId = cat.qIds[i];
                const num = CATEGORY_OFFSETS[cat.id] + i + 1;
                return (
                  <div key={qId} className="flex items-start gap-3 py-4">
                    <div className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center text-xs font-bold text-slate-500 shrink-0 mt-0.5">
                      {num}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-800 leading-relaxed mb-2">{q}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setAnswers((prev) => ({ ...prev, [qId]: true }))}
                          className={`px-4 py-1.5 rounded-lg border text-sm font-semibold transition-colors ${
                            answers[qId] === true
                              ? 'bg-red-50 border-brand-orange text-brand-orange'
                              : 'bg-white border-slate-300 text-slate-500 hover:border-brand-orange'
                          }`}
                        >
                          はい
                        </button>
                        <button
                          onClick={() => setAnswers((prev) => ({ ...prev, [qId]: false }))}
                          className={`px-4 py-1.5 rounded-lg border text-sm font-semibold transition-colors ${
                            answers[qId] === false
                              ? 'bg-green-50 border-green-500 text-green-700'
                              : 'bg-white border-slate-300 text-slate-500 hover:border-green-500'
                          }`}
                        >
                          いいえ
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="text-center pt-2">
          <button
            onClick={() => setShowResult(true)}
            disabled={!allAnswered}
            className={`btn-primary ${!allAnswered ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            診断結果を確認する{!allAnswered ? `（残り ${TOTAL - answeredCount} 問）` : ' →'}
          </button>
        </div>
      </div>
    </div>
  );
}

function DiagResult({
  score,
  riskLevel,
  onReset,
}: {
  score: number;
  riskLevel: string;
  onReset: () => void;
}) {
  const configs = {
    high: {
      badge: '要注意',
      badgeCls: 'bg-red-50 text-brand-orange',
      borderCls: 'border-l-brand-orange',
      icon: <AlertTriangle size={20} className="text-brand-orange" />,
      iconBg: 'bg-red-50',
      title: '属人化の依存度が高い傾向があります',
      desc: '診断結果では、組織の成果がトップメンバーの個人力に依存しやすい状態が示唆されています。センターピン（KFS）の特定と型化に取り組むことで、組織全体の安定した底上げが期待できます。',
      actions: [
        'トップメンバーへの暗黙知ヒアリング実施',
        'センターピン（KFS）の特定と定義化',
        'SheetViz（または既存CRM）への追跡仕組み導入',
        '6ヶ月ブートキャンプによる組織定着',
      ],
      actionBg: 'bg-red-50 border-red-200',
      ctaPrimary: true,
    },
    med: {
      badge: '改善余地あり',
      badgeCls: 'bg-yellow-50 text-yellow-700',
      borderCls: 'border-l-yellow-400',
      icon: <Info size={20} className="text-yellow-600" />,
      iconBg: 'bg-yellow-50',
      title: '成長の次のステージへ進める状態です',
      desc: '一部の型化は進んでいますが、改善できる余地が残っています。センターピンをデータで検証・精度アップするフェーズに移行することで、さらに安定した成長が見込まれます。',
      actions: [
        '既存データの棚卸しとKFS候補の検証',
        'SheetVizによるデータ収集精度の向上',
        'Looker Studio / Tableauでのモニタリング整備',
      ],
      actionBg: 'bg-yellow-50 border-yellow-200',
      ctaPrimary: true,
    },
    low: {
      badge: '比較的良好',
      badgeCls: 'bg-green-50 text-green-700',
      borderCls: 'border-l-green-500',
      icon: <CheckCircle size={20} className="text-green-600" />,
      iconBg: 'bg-green-50',
      title: '比較的健全な状態です',
      desc: '現状は組織として一定の仕組みが機能している状態です。次の成長ステージに備えて、センターピンのデータ検証とプレイブックの精緻化を進めておくことで、さらなるスケールの準備が整います。',
      actions: [
        '現行のKFSをデータで検証・精緻化',
        'LTV最大化（農耕型営業）の型化',
        'プレイブックの体系化と育成への活用',
      ],
      actionBg: 'bg-green-50 border-green-200',
      ctaPrimary: false,
    },
  };

  const c = configs[riskLevel as keyof typeof configs];

  return (
    <div className="max-w-xl mx-auto">
      <div className={`card border-l-4 ${c.borderCls}`}>
        <div className="flex items-start gap-3 mb-4">
          <div className={`w-11 h-11 ${c.iconBg} rounded-full flex items-center justify-center shrink-0`}>
            {c.icon}
          </div>
          <div>
            <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded mb-1 ${c.badgeCls}`}>
              {c.badge}（スコア: {score} / {TOTAL}）
            </span>
            <h3 className="font-black text-brand-navy text-lg leading-tight">{c.title}</h3>
          </div>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">{c.desc}</p>
        <div className={`rounded-xl p-4 border mb-5 ${c.actionBg}`}>
          <p className="text-sm font-bold text-brand-navy mb-2">参考アクション</p>
          <ul className="space-y-1.5">
            {c.actions.map((a, i) => (
              <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                <ChevronRight size={13} className="text-brand-orange shrink-0 mt-0.5" />
                {a}
              </li>
            ))}
          </ul>
        </div>
        {c.ctaPrimary ? (
          <Link href="/contact" className="btn-primary w-full justify-center">
            <ArrowRight size={16} /> カチカタ相談を予約する
          </Link>
        ) : (
          <Link href="/contact" className="btn-secondary w-full justify-center">
            詳しく相談する
          </Link>
        )}
      </div>
      <div className="text-center mt-4">
        <button
          onClick={onReset}
          className="text-sm text-slate-400 underline hover:text-slate-600 transition-colors"
        >
          やり直す
        </button>
      </div>
    </div>
  );
}
