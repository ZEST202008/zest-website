import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Target, Clock, Archive, TrendingUp, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'インサイドセールス内製化 | 持続可能なIS組織を社内に構築',
  description: '量の盲信・精神の摩耗・属人化の3課題を解決。90日ロードマップで、持続可能なインサイドセールス組織を社内に構築します。',
};

const PROBLEMS = [
  { num: '01', title: '量の盲信', desc: '「架電数を増やせ」の一言で疲弊する現場。量を追うほど質が落ち、成果に繋がらない負のサイクル。' },
  { num: '02', title: '精神の摩耗', desc: '断られ続けることへのメンタルケアがなく、離職率が高止まり。採用コストが膨らむ一方。' },
  { num: '03', title: '属人化', desc: '「あの人だから取れる」アポが再現できない。エース不在で組織の成果が崩れる。' },
];

const CONCEPTS = [
  {
    icon: <Target size={22} className="text-brand-orange" />,
    num: 'Concept 01',
    title: 'KPIはプロセスのみ',
    desc: '数字目標ゼロ・根性ゼロ・属人化ゼロ。「何件架電したか」ではなく「どんな行動をしたか」だけをKPIに設定。結果は正しいプロセスの先にある。',
  },
  {
    icon: <Clock size={22} className="text-brand-orange" />,
    num: 'Concept 02',
    title: '集中した短時間の活動',
    desc: '長時間の架電業務は集中力を奪い、クオリティを下げる。短時間に集中して行動する仕組みで、担当者の負荷を下げながら成果を上げる。',
  },
  {
    icon: <Archive size={22} className="text-brand-orange" />,
    num: 'Concept 03',
    title: '休眠顧客の活用',
    desc: '新規開拓だけが営業ではない。過去に接点を持ちながら失注・放置された休眠顧客には、すでに信頼の土台がある。ここを掘り起こすことで効率的に成果を生む。',
  },
  {
    icon: <TrendingUp size={22} className="text-brand-orange" />,
    num: 'Concept 04',
    title: '勝ちパターンの言語化と横展開',
    desc: 'アポが取れた理由を言語化し、組織の共有知にする。エースの行動を型化することで、チーム全員が再現できる仕組みに変換する。',
  },
];

const ROADMAP = [
  {
    phase: 'Phase 1',
    period: '1〜30日目',
    title: '現状診断・設計',
    items: ['現行の架電リスト・スクリプト・KPI設定の棚卸し', 'ターゲット顧客の定義と優先順位付け', 'プロセスKPIの設計', '休眠顧客リストの整備'],
  },
  {
    phase: 'Phase 2',
    period: '31〜60日目',
    title: 'ツール導入・実行',
    items: ['SheetViz ISの導入・設定', '架電スクリプトの型化と練習', '初回ロールプレイ・フィードバック', '日報運用開始（SheetViz Daily）'],
  },
  {
    phase: 'Phase 3',
    period: '61〜90日目',
    title: '改善・内製化',
    items: ['データをもとにスクリプト・KPIを改善', 'チームリーダーへのコーチング移管', '自走できる運用フローの確立', '効果測定レポートの作成'],
  },
];

export default function InsideSalesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-bg border-b border-slate-200 py-20">
        <div className="container-inner">
          <span className="section-label">Service</span>
          <h1 className="text-4xl md:text-5xl font-black text-brand-navy leading-tight mb-4">
            インサイドセールス<br />内製化プログラム
          </h1>
          <p className="text-xl text-brand-orange font-bold mb-6">
            90日で、持続可能なIS組織を社内に構築する
          </p>
          <p className="text-slate-600 leading-relaxed max-w-2xl mb-8">
            「量を増やせ」の精神論から脱却し、プロセスを科学する。
            ZESTが蓄積した営業型化のノウハウで、誰もが成果を出せるインサイドセールス組織を
            社内に完全内製化します。
          </p>
          <Link href="/contact" className="btn-primary">
            <ArrowRight size={18} /> 無料相談を予約する
          </Link>
        </div>
      </section>

      {/* 3つの課題 */}
      <section className="py-20">
        <div className="container-inner max-w-4xl">
          <span className="section-label">Problem</span>
          <h2 className="section-title">インサイドセールスが機能しない、3つの根本原因</h2>
          <p className="section-sub mb-10">
            多くの企業のISが伸び悩む理由は、ツールや人材ではなく「設計」にあります。
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {PROBLEMS.map((p) => (
              <div key={p.num} className="card border-l-4 border-l-brand-orange">
                <div className="text-3xl font-black text-brand-orange/20 mb-2">{p.num}</div>
                <h3 className="font-black text-brand-navy text-lg mb-3">{p.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4つのコンセプト */}
      <section className="bg-brand-bg py-20">
        <div className="container-inner">
          <span className="section-label">4 Concepts</span>
          <h2 className="section-title">ZESTのアプローチ：4つのコアコンセプト</h2>
          <p className="section-sub mb-12 max-w-2xl">
            精神論・根性論を一切排除。科学的なアプローチで、持続可能な営業組織を設計します。
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {CONCEPTS.map((c) => (
              <div key={c.num} className="card flex gap-5 items-start">
                <div className="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                  {c.icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-1">{c.num}</div>
                  <h3 className="font-black text-brand-navy text-lg mb-2">{c.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 90日ロードマップ */}
      <section className="py-20">
        <div className="container-inner max-w-4xl">
          <span className="section-label">Roadmap</span>
          <h2 className="section-title">90日間の伴走ロードマップ</h2>
          <p className="section-sub mb-12">
            診断・設計・実行・内製化まで、ZESTが一気通貫でサポートします。
          </p>
          <div className="space-y-6">
            {ROADMAP.map((r, i) => (
              <div key={r.phase} className="card flex gap-6 items-start">
                <div className="shrink-0 text-center">
                  <div className="w-12 h-12 bg-brand-orange rounded-xl flex items-center justify-center text-white font-black text-sm mb-1">
                    {i + 1}
                  </div>
                  <div className="text-xs text-slate-400 whitespace-nowrap">{r.period}</div>
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-1">{r.phase}</div>
                  <h3 className="font-black text-brand-navy text-lg mb-3">{r.title}</h3>
                  <ul className="space-y-1.5">
                    {r.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle size={14} className="text-brand-orange mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* カチカタ・SheetVizとの連携 */}
      <section className="bg-brand-navy py-16">
        <div className="container-inner max-w-3xl text-center">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Next Step</div>
          <h2 className="text-2xl font-black text-white mb-4 leading-tight">
            内製化の先に、<span className="text-brand-orange">カチカタ × SheetViz</span> で<br />さらなる型化を
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            インサイドセールスが軌道に乗ったら、蓄積されたデータをカチカタで分析し
            KFS（勝ちパターン）を抽出。SheetVizで組織全体に展開することで、
            営業力が組織の「資産」になります。
          </p>
          <Link href="/contact" className="btn-primary">
            <ArrowRight size={18} /> まずは無料相談から
          </Link>
        </div>
      </section>
    </>
  );
}
