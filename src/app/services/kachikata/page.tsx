import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, AlertCircle, User, BarChart2,
  Target, CheckCircle, ChevronRight, RefreshCw,
  TrendingUp, TrendingDown, Users, Database, Zap,
  Archive, EyeOff, ChevronDown, Layers, MessageCircle,
} from 'lucide-react';
import DiagnosisSection from './DiagnosisSection';

export const metadata: Metadata = {
  title: 'カチカタ | KFS特定・営業の型化サービス',
  description: 'トップセールスの行動パターンをデータで解析し、誰もが再現できる「型」として定着させる。センターピン特定サービス カチカタ × SheetViz で営業組織のデータ活用を支援します。',
};

// ── Pain points ──
const PAINS = [
  {
    icon: <AlertCircle size={20} className="text-brand-orange" />,
    title: 'CRMツールを導入したが、\n現場への定着が難しかった',
    desc: '導入費用をかけたにもかかわらず、操作の複雑さなどから現場への浸透が進まず、ツールが活用されないまま月額費用だけが発生し続けるケースは少なくありません。',
    em: '鍵は「何を記録するか」を先に明確にすること',
  },
  {
    icon: <User size={20} className="text-brand-orange" />,
    title: 'トップセールスの成功パターンが\n言語化・共有されていない',
    desc: '成果を上げるメンバーの行動には、再現可能なパターンがあります。しかしそれを抽出・型化する方法論を持っている組織はまだ多くありません。属人的なノウハウを組織の資産に変えることが、安定した成長への近道です。',
    em: '',
  },
  {
    icon: <BarChart2 size={20} className="text-brand-orange" />,
    title: 'データは集まっているのに\n意思決定に活かせていない',
    desc: '蓄積されたデータが「どの指標を見ればいいか」「何がボトルネックか」の判断に活かされていない状態。データを意思決定につなげるには、分析の枠組み（KFS設計）が必要です。',
    em: '',
  },
];

// ── Growth cycle steps ──
const CYCLE = [
  {
    num: '①',
    bg: 'bg-blue-100',
    numBg: 'bg-blue-600',
    titleCls: 'text-blue-900',
    tags: ['SheetViz CRM', 'SheetViz IS', 'SheetViz Daily'],
    tagCls: 'bg-blue-200 text-blue-800',
    title: 'データ蓄積',
    desc: '商談・コンタクト・日報のデータが日々蓄積される',
    descCls: 'text-blue-900',
  },
  {
    num: '②',
    bg: 'bg-green-100',
    numBg: 'bg-green-600',
    titleCls: 'text-green-900',
    tags: ['カチカタ'],
    tagCls: 'bg-green-200 text-green-800',
    title: 'KFS特定',
    desc: '統計分析＋現場ヒアリング＋AIでセンターピンを科学的に特定',
    descCls: 'text-green-900',
  },
  {
    num: '③',
    bg: 'bg-yellow-100',
    numBg: 'bg-yellow-600',
    titleCls: 'text-yellow-900',
    tags: ['SheetViz CRM', 'SheetViz IS'],
    tagCls: 'bg-yellow-200 text-yellow-800',
    title: '実行・定着',
    desc: '特定されたKFSを行動チェック項目としてCRM/ISに組み込み実行',
    descCls: 'text-yellow-900',
  },
  {
    num: '④',
    bg: 'bg-purple-100',
    numBg: 'bg-purple-600',
    titleCls: 'text-purple-900',
    tags: ['カチカタ', 'Tableau'],
    tagCls: 'bg-purple-200 text-purple-800',
    title: 'モニタリング・改善',
    desc: 'KFS実施率と成約率の相関をモニタリングし、次のKFSへ改善',
    descCls: 'text-purple-900',
  },
];

// ── Analysis methods ──
const ANALYSIS = [
  {
    step: 'Step A',
    stepCls: 'text-blue-600',
    bg: 'bg-blue-50 border-blue-200',
    title: '定量分析',
    titleCls: 'text-blue-900',
    items: [
      'SheetVizの商談データから行動フラグ別の成約率を自動算出',
      'リフト値で「どの行動が効くか」を可視化',
      '複数行動の組み合わせパターンも分析',
    ],
    itemCls: 'text-blue-800',
  },
  {
    step: 'Step B',
    stepCls: 'text-green-600',
    bg: 'bg-green-50 border-green-200',
    title: '定性分析（ヒアリング）',
    titleCls: 'text-green-900',
    items: [
      '5ステップ構造化ヒアリングで「顧客の態度が変わった決定的な瞬間」を記録',
      '心理学に裏付いた質問項目でトップ営業の本音の行動を抽出',
    ],
    itemCls: 'text-green-800',
  },
  {
    step: 'Step C',
    stepCls: 'text-purple-600',
    bg: 'bg-purple-50 border-purple-200',
    title: 'AI統合',
    titleCls: 'text-purple-900',
    items: [
      '定量＋定性を統合してセンターピンを特定',
      '新人でも明日から真似できる行動指示を生成',
      '信頼度スコアと根拠説明を自動出力',
    ],
    itemCls: 'text-purple-800',
  },
];

// ── Roadmap phases ──
const ROADMAP = [
  {
    phase: 'Phase 1',
    phaseCls: 'text-blue-600',
    bg: 'bg-blue-50 border-blue-200',
    title: 'SheetViz本格稼働',
    items: [
      'CRM/IS/Dailyにデータが蓄積される',
      'Tableau / Looker Studioで売上予測・KPI管理が定着',
      'カチカタ初回KFS分析を実施',
      '最初のセンターピンを全社に展開',
    ],
  },
  {
    phase: 'Phase 2',
    phaseCls: 'text-green-600',
    bg: 'bg-green-50 border-green-200',
    title: 'KFSの精度向上',
    items: [
      'KFS実施率と成約率の相関が蓄積',
      '第2・第3のセンターピンを特定',
      '新人の早期戦力化が実現',
      '属人化から組織の型へ',
    ],
  },
  {
    phase: 'Phase 3',
    phaseCls: 'text-purple-600',
    bg: 'bg-purple-50 border-purple-200',
    title: '科学的営業組織の完成',
    items: [
      '自社固有の「勝ちパターン」が完成',
      'データが増えるほどKFS精度が向上',
      '採用・育成・評価がデータで一貫',
      '経営判断の精度が飛躍的に向上',
    ],
  },
];

// ── Before / After ──
const BEFORE = [
  { icon: <User size={16} className="text-slate-500" />, title: '個人の能力に依存した成果', desc: '組織としての再現性がなく、特定メンバーへの依存が続く。' },
  { icon: <EyeOff size={16} className="text-slate-500" />, title: '育成が「背中を見て盗め」に依存', desc: '教育コストが高く、新人の成長スピードにばらつきが生じやすい。' },
  { icon: <Archive size={16} className="text-slate-500" />, title: 'ノウハウが組織に蓄積されない', desc: 'メンバーが変わるたびにノウハウがリセットされる構造。' },
  { icon: <TrendingDown size={16} className="text-slate-500" />, title: '予測・計画の精度が上がりにくい', desc: '因果関係が不明瞭なため、データに基づいた打ち手が立てにくい。' },
];

const AFTER = [
  { icon: <Users size={16} className="text-brand-orange" />, title: '仕組みで組織全体を底上げ', desc: '「型」を共有することで、誰もが安定した成果を出せる状態へ。' },
  { icon: <Zap size={16} className="text-brand-orange" />, title: '新メンバーの立ち上がりが加速', desc: '「これをやれば成果につながる」が明確なため、育成効率が向上。' },
  { icon: <Database size={16} className="text-brand-orange" />, title: '組織にノウハウが蓄積され続ける', desc: 'メンバーが変わっても仕組みは残り、データ資産として積み上がる。' },
  { icon: <TrendingUp size={16} className="text-brand-orange" />, title: 'データで意思決定できる組織へ', desc: 'KFS実施率と成果の相関を計測し、次の施策が明確になる。' },
];

// ── Pricing inclusions ──
const PLAN_ITEMS = [
  'SBM行動解析・ヒアリング',
  'センターピン（KFS）の特定',
  'KPI設定',
  '専用CRM（SheetViz）構築',
  'オンボーディング研修',
  '日報革命（AIコーチング）',
  'Looker Studio / Tableau 分析レポート',
  'プレイブック（セールスブック）納品',
  'Google製品活用支援',
];

// ── FAQ ──
const FAQS = [
  {
    q: '現在利用しているCRMはそのままで大丈夫ですか？',
    a: 'はい、現在お使いのCRMはそのままご利用いただけます。カチカタのKFS設計・分析は既存のCRMとも連携可能です。SheetVizは「よりシンプルなCRM基盤を探している」という場合の選択肢であり、既存ツールを活かしたままカチカタのメソッドを適用することも可能です。',
  },
  {
    q: 'データがほとんどない状態でも相談できますか？',
    a: 'はい、ご相談いただけます。「データがない」という状況からSheetViz導入でデータ収集を始めながら、同時にKFS設計を進めるプランも対応可能です。まずは無料相談でご状況をお聞かせください。',
  },
  {
    q: '6ヶ月後に契約が終了したら、仕組みはどうなりますか？',
    a: '6ヶ月間で構築したSheetViz・プレイブック・Looker Studio / Tableauダッシュボードはすべてお客様の資産になります。「卒業（自走化）」がカチカタの最終ゴールであり、契約終了後も自社で運用を継続できる状態を目指します。',
  },
  {
    q: '分析ツールはLooker StudioとTableauのどちらを使いますか？',
    a: 'お客様の環境・ご希望に応じてLooker StudioまたはTableauをご提案しています。既にどちらかをお使いの場合はそちらに合わせて対応いたします。詳しくは相談時にご確認ください。',
  },
  {
    q: 'コスト対効果の考え方を教えてください。',
    a: '同等の専門人材を採用した場合、人件費・採用費合計で年1,300万円以上かかることが多い状況です。カチカタは年約480万円で「専門チーム」と「自走できる仕組み」の両方が手に入ります。詳細な試算については、無料相談の際にご状況に合わせてご案内いたします。',
  },
];

export default function KachikataPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-brand-bg border-b border-slate-200 py-20">
        <div className="container-inner">
          <span className="section-label">Service</span>
          <div className="mb-5">
            <Image
              src="/kachikata-logo.png"
              alt="カチカタ"
              width={220}
              height={66}
              className="h-14 w-auto object-contain"
            />
          </div>
          <p className="text-xl text-brand-orange font-bold mb-4">
            「勝ち」と「価値」を型化する、KFS特定サービス
          </p>
          <p className="text-slate-600 leading-relaxed max-w-2xl mb-8">
            トップセールスの行動パターンをデータで解析し、誰もが再現できる「型」として定着させる。
            シンプルなCRM基盤 <strong className="text-brand-navy">SheetViz</strong> と、
            センターピン特定サービス <strong className="text-brand-orange">カチカタ</strong> を組み合わせた、
            データドリブン営業支援サービスです。
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary">
              <ArrowRight size={18} /> 無料相談を予約する
            </Link>
            <Link href="#diagnosis" className="btn-secondary">
              属人化リスク診断を受ける
            </Link>
          </div>
          <p className="text-xs text-slate-400 mt-4">診断は無料・所要5分 / 既存CRMとの連携も対応</p>
        </div>
      </section>

      {/* ── Pain ── */}
      <section className="py-20">
        <div className="container-inner">
          <div className="text-center mb-12">
            <span className="section-label">課題の整理</span>
            <h2 className="section-title">こんな課題をお持ちではないでしょうか</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PAINS.map((p, i) => (
              <div key={i} className="card border-t-4 border-t-brand-orange">
                <div className="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
                  {p.icon}
                </div>
                <h3 className="font-black text-brand-navy text-base mb-3 leading-snug whitespace-pre-line">
                  {p.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {p.desc}
                  {p.em && <><br /><strong className="text-brand-navy">{p.em}</strong></>}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-brand-bg border border-slate-200 rounded-2xl p-6 flex gap-4 items-start">
            <MessageCircle size={22} className="text-brand-orange shrink-0 mt-0.5" />
            <div>
              <p className="text-brand-navy font-semibold leading-relaxed mb-1">
                「データドリブンを目指したいが、どこから始めればよいかわからない」——その答えは、
                <span className="text-brand-orange">センターピン（KFS）</span>を先に定義することにあります。
                何を記録・追跡するかが決まれば、ツールは機能します。
              </p>
              <p className="text-xs text-slate-400">— 株式会社ZEST / カチカタ設計チーム</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Solution ── */}
      <section className="bg-brand-bg py-20">
        <div className="container-inner">
          <div className="text-center mb-12">
            <span className="section-label">ソリューション</span>
            <h2 className="section-title">「使えるCRM」と「使い方の設計」<br />両方があって初めて機能する</h2>
            <p className="section-sub mt-3">
              ツールだけでも、戦略だけでも成果につながりにくい。<br />
              ZESTが提供するのは、2つをセットにした「動く仕組み」です。
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* SheetViz */}
            <div className="card border-2 border-blue-400">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center">
                  <BarChart2 size={20} className="text-blue-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-0.5">Step 1 — データ基盤</div>
                  <div className="font-black text-slate-800 text-lg">SheetViz</div>
                </div>
              </div>
              <p className="font-bold text-brand-navy mb-3">Googleスプレッドシートで動く、シンプルな専用CRM基盤</p>
              <ul className="space-y-2 mb-4">
                {['現場が迷わない最小限UI（SheetViz CRM / IS / Daily）', 'スマホ・PCどちらでも即時入力', '追加ライセンスコスト不要', '既存CRMとの連携・併用も可能'].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle size={14} className="text-blue-500 shrink-0 mt-0.5" /> {t}
                  </li>
                ))}
              </ul>
              <div className="bg-blue-50 rounded-xl p-3 text-sm text-blue-800 font-medium">
                センターピン入力に特化したシンプルな設計により、現場への定着率が向上します。
              </div>
            </div>
            {/* カチカタ */}
            <div className="card border-2 border-brand-orange">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center">
                  <Target size={20} className="text-brand-orange" />
                </div>
                <div>
                  <div className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-0.5">Step 2 — KFS設計</div>
                  <div className="font-black text-brand-navy text-lg">カチカタ</div>
                </div>
              </div>
              <p className="font-bold text-brand-navy mb-3">データとヒアリングで「センターピン（KFS）」を特定・定着</p>
              <ul className="space-y-2 mb-4">
                {['統計分析＋現場ヒアリング＋AIでセンターピンを科学的に特定', '「精神論」を「測定可能な行動」へ変換', 'Looker Studio・Tableauで成果との相関を可視化', '6ヶ月でプレイブックを組織に定着'].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle size={14} className="text-brand-orange shrink-0 mt-0.5" /> {t}
                  </li>
                ))}
              </ul>
              <div className="bg-orange-50 rounded-xl p-3 text-sm text-orange-900 font-medium">
                「まず勝てる型（質）を確立し、その後にアクセル（量）を踏む」——順序が成果を左右します。
              </div>
            </div>
          </div>
          <div className="text-center bg-white border border-dashed border-slate-300 rounded-2xl py-4 px-6">
            <p className="text-sm text-slate-600">
              <strong className="text-brand-navy">既存のCRMはそのままご利用いただけます。</strong>
              現在のCRMを利用中の場合、SheetViz導入なしでカチカタのKFS分析のみを活用することも可能です。
            </p>
          </div>
        </div>
      </section>

      {/* ── Growth Cycle ── */}
      <section className="py-20">
        <div className="container-inner">
          <div className="text-center mb-12">
            <span className="section-label">連携の仕組み</span>
            <h2 className="section-title">SheetViz × カチカタが実現する<br />「成長の循環」</h2>
            <p className="section-sub mt-3">
              データ蓄積→KFS特定→実行定着→モニタリング改善が循環することで、<br />
              組織の営業力が継続的に高まっていきます。
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            {CYCLE.map((c) => (
              <div key={c.num} className={`rounded-2xl p-5 ${c.bg}`}>
                <div className={`w-9 h-9 ${c.numBg} rounded-full flex items-center justify-center text-white font-black text-sm mb-3`}>
                  {c.num}
                </div>
                <h3 className={`font-black text-base mb-3 ${c.titleCls}`}>{c.title}</h3>
                <div className="flex flex-wrap gap-1 mb-3">
                  {c.tags.map((t) => (
                    <span key={t} className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.tagCls}`}>{t}</span>
                  ))}
                </div>
                <p className={`text-xs leading-relaxed ${c.descCls}`}>{c.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-brand-bg border border-slate-200 rounded-full px-5 py-2">
              <RefreshCw size={16} className="text-brand-orange" />
              <span className="text-sm font-semibold text-slate-600">この循環が継続することで、組織の営業力が積み上がっていく</span>
            </div>
          </div>
          <div className="bg-brand-bg border border-slate-200 rounded-2xl p-6">
            <p className="font-bold text-brand-navy mb-2">
              SheetVizで蓄積されるデータは、それ自体が<span className="text-brand-orange">「組織の財産」</span>です。
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              そのデータにカチカタのAI分析とヒアリングを掛け合わせることで、「なぜトップ営業は売れるのか」という問いに、感覚ではなくデータで答えられるようになります。その答えをSheetVizの行動チェック項目に落とし込み、全員が実行し、その結果をまたデータとして蓄積していく——この循環が回り始めたとき、組織は「個人の力に頼る営業」から<strong className="text-brand-orange">「組織の型で戦える営業」</strong>へと進化します。
            </p>
          </div>
        </div>
      </section>

      {/* ── Center Pin ── */}
      <section className="bg-brand-bg py-20">
        <div className="container-inner max-w-4xl">
          <div className="text-center mb-12">
            <span className="section-label">中心概念</span>
            <h2 className="section-title">カチカタが特定する<br />「センターピン（KFS）」とは</h2>
          </div>
          {/* Concept card */}
          <div className="card mb-8">
            <p className="text-slate-600 leading-relaxed mb-6">
              センターピンとは、ボウリングのピン配置における中央の1本のように、「これを倒せば他のピンも連鎖して倒れる」核心の行動のことです。カチカタはSheetVizに蓄積されたデータと現場の声を統合し、自社固有の「これを徹底すれば成約率が上がる、たった一つの行動」を科学的に導き出します。
            </p>
            {/* Before / After contrast */}
            <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
              <div className="opacity-60">
                <p className="text-sm font-bold text-slate-500 mb-2 text-center">意識の言葉</p>
                <div className="bg-slate-100 rounded-xl p-4">
                  <p className="text-sm font-bold text-slate-600 text-center">
                    「もっとお客様のことを考えて、丁寧に対応しよう」
                  </p>
                </div>
                <p className="text-xs text-slate-400 text-center mt-2">測定不可 / 人によって解釈が異なる</p>
              </div>
              <div className="flex justify-center">
                <ArrowRight size={24} className="text-brand-orange" />
              </div>
              <div>
                <p className="text-sm font-bold text-brand-orange mb-2 flex items-center justify-center gap-1">
                  <Target size={14} /> センターピン（行動の言葉）
                </p>
                <div className="bg-orange-50 border-2 border-brand-orange rounded-xl p-4">
                  <p className="text-sm font-black text-brand-navy text-center leading-relaxed">
                    「初回商談後<span className="text-brand-orange">60分以内</span>に、ヒアリングした
                    <span className="text-brand-orange">3つの課題</span>を追記した提案書(A)を送付する。」
                  </p>
                </div>
                <p className="text-xs text-brand-orange font-semibold text-center mt-2">Yes/Noで判定可能 / 誰でも再現できる</p>
              </div>
            </div>
          </div>
          {/* Analysis methods */}
          <h3 className="font-black text-brand-navy flex items-center gap-2 mb-5">
            <Layers size={18} className="text-brand-orange" /> カチカタのセンターピン特定プロセス
          </h3>
          <div className="grid md:grid-cols-3 gap-5">
            {ANALYSIS.map((a) => (
              <div key={a.step} className={`card border ${a.bg}`}>
                <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${a.stepCls}`}>{a.step}</div>
                <h4 className={`font-black text-base mb-3 ${a.titleCls}`}>{a.title}</h4>
                <ul className="space-y-2">
                  {a.items.map((item) => (
                    <li key={item} className={`flex items-start gap-2 text-sm ${a.itemCls}`}>
                      <ChevronRight size={13} className="shrink-0 mt-0.5 opacity-60" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Roadmap ── */}
      <section className="py-20">
        <div className="container-inner">
          <div className="text-center mb-12">
            <span className="section-label">導入ロードマップ</span>
            <h2 className="section-title">連携が変える「組織の成長フェーズ」</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5 mb-8">
            {ROADMAP.map((r) => (
              <div key={r.phase} className={`rounded-2xl border p-6 ${r.bg}`}>
                <div className={`font-black text-lg mb-1 ${r.phaseCls}`}>{r.phase}</div>
                <div className="font-black text-brand-navy mb-4 pb-3 border-b border-slate-200">{r.title}</div>
                <ul className="space-y-2">
                  {r.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle size={13} className="text-brand-orange shrink-0 mt-0.5" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Before / After ── */}
      <section className="bg-brand-bg py-20">
        <div className="container-inner">
          <div className="text-center mb-12">
            <span className="section-label">導入効果</span>
            <h2 className="section-title">組織の「OS」を書き換える</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Before */}
            <div>
              <div className="bg-slate-300 rounded-t-xl px-5 py-3 text-center">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Before</p>
                <p className="font-black text-slate-700">属人型組織</p>
              </div>
              <div className="card rounded-t-none border-t-0 space-y-3">
                {BEFORE.map((item) => (
                  <div key={item.title} className="flex gap-3 items-start p-3 bg-slate-50 rounded-xl">
                    <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-slate-600">{item.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* After */}
            <div>
              <div className="bg-brand-orange rounded-t-xl px-5 py-3 text-center">
                <p className="text-xs font-bold uppercase tracking-wider text-orange-200">After / With カチカタ</p>
                <p className="font-black text-white">仕組み型組織</p>
              </div>
              <div className="card rounded-t-none border-t-0 border-2 border-brand-orange space-y-3">
                {AFTER.map((item) => (
                  <div key={item.title} className="flex gap-3 items-start p-3 bg-orange-50 rounded-xl border border-orange-100">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-brand-navy">{item.title}</p>
                      <p className="text-xs text-slate-600 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-20">
        <div className="container-inner max-w-3xl">
          <div className="text-center mb-10">
            <span className="section-label">料金プラン</span>
            <h2 className="section-title">
              カチカタ・ブートキャンプ<br />
              <span className="text-brand-orange">Standard Plan</span>
            </h2>
            <p className="section-sub mt-3">
              トップセールスの暗黙知を科学的に解析し、<br />
              組織全員が使える「型」として実装するまでの全工程をワンストップで。
            </p>
          </div>
          <div className="card border-2 border-brand-orange max-w-lg mx-auto mb-6">
            <div className="flex flex-wrap justify-between gap-4 pb-5 mb-5 border-b border-slate-100">
              <div>
                <p className="text-xs font-bold text-slate-500 mb-1">集中支援期間</p>
                <p className="text-2xl font-black text-brand-navy">6ヶ月間</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-500 mb-1">初期費用</p>
                <p className="text-3xl font-black text-brand-orange leading-none">
                  300<span className="text-lg">万円</span>
                  <span className="text-sm font-normal text-slate-500">（税別）</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-500 mb-1">月額費用</p>
                <p className="text-2xl font-black text-brand-navy leading-none">
                  15<span className="text-base">万円</span>
                </p>
                <p className="text-xs text-slate-400 mt-0.5">20ユーザーまで含む / 追加 +1,000円/名</p>
              </div>
            </div>
            <p className="font-bold text-brand-navy mb-3">パッケージに含まれるもの</p>
            <div className="grid grid-cols-2 gap-2">
              {PLAN_ITEMS.map((item, i) => (
                <div key={item} className="text-sm text-slate-600 flex gap-1.5">
                  <span className="text-brand-orange font-bold shrink-0">{'0' + (i + 1) === '010' ? '10' : '0' + (i + 1)}</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
          {/* Cost comparison */}
          <div className="bg-brand-bg border border-slate-200 rounded-2xl overflow-hidden max-w-lg mx-auto">
            <div className="grid grid-cols-[1fr_auto_1fr] text-center p-5 gap-4 items-center">
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1">専門人材を採用した場合</p>
                <p className="text-2xl font-black text-slate-500">約1,300万円<span className="text-sm font-normal">/年</span></p>
                <p className="text-xs text-slate-400 mt-1">採用コスト + 人件費 + ツール費</p>
              </div>
              <div className="text-2xl font-black text-slate-300 italic">VS</div>
              <div>
                <p className="text-xs font-semibold text-brand-orange mb-1">カチカタを導入した場合</p>
                <p className="text-2xl font-black text-brand-orange">約480万円<span className="text-sm font-normal text-slate-500">/年</span></p>
                <p className="text-xs text-brand-orange font-semibold mt-1">コスト約1/3の水準</p>
              </div>
            </div>
            <div className="bg-orange-50 border-t border-orange-100 py-3 px-5 text-center text-sm font-semibold text-orange-900">
              「仕組み」が残るため、契約終了後も組織の資産として機能し続ける
            </div>
          </div>
        </div>
      </section>

      {/* ── Diagnosis ── */}
      <section className="bg-brand-bg py-20" id="diagnosis">
        <div className="container-inner">
          <div className="text-center mb-12">
            <span className="section-label">無料診断</span>
            <h2 className="section-title">営業組織の属人化リスク診断</h2>
            <p className="section-sub mt-3">
              3つのカテゴリ・17の設問に回答するだけ（所要5分）。<br />
              組織の<strong className="text-brand-navy">属人化傾向スコア</strong>と、改善に向けた参考アクションをご確認いただけます。
            </p>
          </div>
          <DiagnosisSection />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20">
        <div className="container-inner max-w-2xl">
          <div className="text-center mb-10">
            <span className="section-label">よくある質問</span>
            <h2 className="section-title">FAQ</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <details key={faq.q} className="card overflow-hidden group">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                  <span className="font-bold text-brand-navy text-sm leading-snug">{faq.q}</span>
                  <ChevronDown size={18} className="text-slate-400 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <p className="text-sm text-slate-600 leading-relaxed mt-4 pt-4 border-t border-slate-100">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-brand-navy py-20">
        <div className="container-inner text-center">
          <h2 className="text-2xl font-black text-white mb-4">
            まずは話すだけで大丈夫です。<br />
            <span className="text-brand-orange">センターピン特定のデモも可能です。</span>
          </h2>
          <p className="text-slate-400 mb-8 leading-relaxed text-sm">
            現状のCRM・データ体制は問いません。<br />
            「何から始めればよいかわからない」という段階からお気軽にご相談ください。
          </p>
          <Link href="/contact" className="btn-primary">
            <ArrowRight size={18} /> 無料相談を予約する
          </Link>
        </div>
      </section>
    </>
  );
}
