import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, AlertCircle, User, BarChart2,
  Target, CheckCircle, ChevronRight, RefreshCw,
  TrendingUp, TrendingDown, Users, Database, Zap,
  Archive, EyeOff, ChevronDown, Layers, MessageCircle,
  Shield, Award, BookOpen, XCircle, MinusCircle,
} from 'lucide-react';
import DiagnosisSection from './DiagnosisSection';

export const metadata: Metadata = {
  title: 'カチカタ | KFS特定・営業の型化サービス',
  description: 'トップセールスの行動パターンをデータで解析し、誰もが再現できる「型」として定着させる。センターピン特定サービス カチカタ × SheetViz で営業組織のデータ活用を支援します。',
};

// ── 3つの悪循環 ──
const BAD_CYCLES = [
  {
    icon: <User size={20} className="text-brand-orange" />,
    title: '現場の疲弊',
    subtitle: 'トップが頑張るほど組織が弱くなる',
    desc: 'トップセールスが動き続けなければ売上が落ちる構造から抜け出せない。特定メンバーへの依存が深まるほど、組織全体の再現性は失われていく。',
  },
  {
    icon: <AlertCircle size={20} className="text-brand-orange" />,
    title: '経営の不確実性',
    subtitle: '予測できない売上が戦略を歪める',
    desc: '「なぜ売れたのか」「なぜ失注したのか」の因果関係が見えないため、再現できない。データはあるのに意思決定の根拠にならない状態が続く。',
  },
  {
    icon: <TrendingDown size={20} className="text-brand-orange" />,
    title: '成長の停滞',
    subtitle: '属人化が組織の限界を決める',
    desc: 'メンバーが増えても売上が比例して伸びない。新人教育に時間がかかり、育成コストが積み上がる一方で、ノウハウは個人の頭の中にしか残らない。',
  },
];

// ── 3つの構造的欠陥 ──
const BOTTLENECKS = [
  {
    icon: <Target size={20} className="text-red-500" />,
    num: '01',
    title: '武器の不在',
    desc: '勝てる行動が定義されていない。トップ営業の何が成果につながっているのかが言語化されておらず、組織として活かせる「型」がない。',
  },
  {
    icon: <BarChart2 size={20} className="text-red-500" />,
    num: '02',
    title: '基準の欠如',
    desc: '何を測り、何を追跡するかが決まっていない。記録されるデータがバラバラで、分析に使えるデータが溜まらず、改善のサイクルが回らない。',
  },
  {
    icon: <Archive size={20} className="text-red-500" />,
    num: '03',
    title: '資産の放棄',
    desc: '蓄積されるはずの経験が次に活かされていない。メンバーが変わるたびにノウハウがリセットされ、組織は永遠に同じスタートラインに戻り続ける。',
  },
];

// ── 4つのソリューション ──
const SOLUTIONS = [
  {
    num: '01',
    color: 'orange',
    icon: <Target size={20} className="text-brand-orange" />,
    title: 'KFS設計・設定',
    desc: 'データ分析×ヒアリング×AIで、成約率と最も相関する行動を科学的に特定。「精神論」を「測定可能なアクション」へ変換する。',
    tags: ['センターピン特定', 'KPI設計', '行動指標の定義'],
  },
  {
    num: '02',
    color: 'blue',
    icon: <Database size={20} className="text-blue-600" />,
    title: 'CRM構築・連携',
    desc: 'GoogleスプレッドシートとAppSheetをベースにした、現場が使いたくなるシンプルなCRM基盤を構築。既存ツールとの連携も対応。',
    tags: ['SheetViz CRM / IS / Daily', '既存CRM連携', '現場定着支援'],
  },
  {
    num: '03',
    color: 'purple',
    icon: <BarChart2 size={20} className="text-purple-600" />,
    title: 'データ・ドリブン分析',
    desc: '蓄積されたデータをKPI改善に直結させるダッシュボードと分析レポートを提供。Looker Studio・Tableauで経営判断を支援する。',
    tags: ['Looker Studio / Tableau', 'KFS実施率モニタリング', '改善サイクル設計'],
  },
  {
    num: '04',
    color: 'green',
    icon: <Users size={20} className="text-green-600" />,
    title: '運用支援',
    desc: '定着まで伴走する6ヶ月のフルサポート。オンボーディング研修からプレイブック納品まで、「自走できる組織」になるまで支援し続ける。',
    tags: ['オンボーディング研修', 'プレイブック納品', '日報革命（AIコーチング）'],
  },
];

// ── 競争優位性 ──
const ADVANTAGES = [
  {
    icon: <Award size={22} className="text-brand-orange" />,
    title: '経営の重鎮',
    desc: '現役経営者・投資家としての実践知を持つメンバーが支援。机上の理論ではなく、実際の営業現場で検証されたメソッドを提供する。',
  },
  {
    icon: <Database size={22} className="text-brand-orange" />,
    title: 'データ戦略家',
    desc: 'SaaS・金融領域でのデータ解析実績を持つ専門家が在籍。統計分析から意思決定支援まで、データ活用のプロが営業組織を変える。',
  },
  {
    icon: <Shield size={22} className="text-brand-orange" />,
    title: '独自学習データ',
    desc: '複数社の営業データで訓練された独自モデルを保有。業界・商材の特性を踏まえたKFS特定で、汎用AIツールでは出せない精度を実現する。',
  },
];

// ── 他社比較 ──
const COMPARISON_AXES = [
  '現場への定着',
  '導入コスト',
  'スピード感',
  '自社データ活用',
  '継続的な改善',
];

type Mark = 'great' | 'ok' | 'bad';
const COMPARISON_DATA: { company: string; marks: Mark[] }[] = [
  { company: '大手コンサル', marks: ['bad', 'bad', 'bad', 'ok', 'bad'] },
  { company: 'SFAベンダー', marks: ['ok', 'ok', 'ok', 'ok', 'ok'] },
  { company: '営業研修', marks: ['bad', 'great', 'great', 'bad', 'bad'] },
  { company: 'カチカタ', marks: ['great', 'ok', 'great', 'great', 'great'] },
];

function CompMark({ mark, isKachikata }: { mark: Mark; isKachikata: boolean }) {
  if (mark === 'great') return <CheckCircle size={18} className={isKachikata ? 'text-brand-orange mx-auto' : 'text-green-500 mx-auto'} />;
  if (mark === 'ok') return <MinusCircle size={18} className="text-slate-400 mx-auto" />;
  return <XCircle size={18} className="text-red-300 mx-auto" />;
}

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
  { num: '01', label: 'SBM行動解析・ヒアリング', desc: 'トップ営業の行動パターンをデータと対話で解析' },
  { num: '02', label: 'センターピン（KFS）の特定', desc: '成約率と最も相関する核心行動を科学的に導出' },
  { num: '03', label: 'KPI設定', desc: '追跡すべき指標と目標値を組織に合わせて設計' },
  { num: '04', label: '専用CRM（SheetViz）構築', desc: 'KFS入力に特化したCRM基盤をゼロから構築' },
  { num: '05', label: 'オンボーディング研修', desc: '現場への定着を促すハンズオン研修を実施' },
  { num: '06', label: '日報革命（AIコーチング）', desc: 'AIが日報をもとに個別フィードバックを自動生成' },
  { num: '07', label: 'Looker Studio / Tableau 分析レポート', desc: 'KFS実施率と成果の相関をダッシュボードで可視化' },
  { num: '08', label: 'プレイブック（セールスブック）納品', desc: '組織固有の「勝ちパターン」を文書化して納品' },
  { num: '09', label: 'Google製品活用支援', desc: 'Workspace全体の活用最適化まで伴走' },
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
          <h1 className="text-4xl md:text-5xl font-black text-brand-navy leading-tight mb-4">
            属人性を排し、<br />
            <span className="text-brand-orange">再現性を極める。</span>
          </h1>
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

      {/* ── 3つの悪循環 ── */}
      <section className="py-20">
        <div className="container-inner">
          <div className="text-center mb-12">
            <span className="section-label">課題の整理</span>
            <h2 className="section-title">多くの営業組織が陥る<br />「3つの悪循環」</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {BAD_CYCLES.map((p, i) => (
              <div key={i} className="card border-t-4 border-t-brand-orange">
                <div className="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
                  {p.icon}
                </div>
                <h3 className="font-black text-brand-navy text-base mb-1">{p.title}</h3>
                <p className="text-brand-orange text-sm font-semibold mb-3">{p.subtitle}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-brand-bg border border-slate-200 rounded-2xl p-6 flex gap-4 items-start">
            <MessageCircle size={22} className="text-brand-orange shrink-0 mt-0.5" />
            <div>
              <p className="text-brand-navy font-semibold leading-relaxed mb-1">
                この悪循環の根本にあるのは、「感覚」で営業を回し続けてきた組織構造の問題です。
                解決策は<span className="text-brand-orange">センターピン（KFS）</span>を先に定義し、
                「何を記録・追跡するか」を決めること——それだけで、ツールも人も動き始めます。
              </p>
              <p className="text-xs text-slate-400">— 株式会社ZEST / カチカタ設計チーム</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3つの構造的欠陥 ── */}
      <section className="bg-red-50 py-20">
        <div className="container-inner">
          <div className="text-center mb-12">
            <span className="inline-block bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wider uppercase mb-4">
              根本原因
            </span>
            <h2 className="section-title">悪循環を生み出す<br />「3つの構造的欠陥」</h2>
            <p className="section-sub mt-3">
              ツールを入れ替えても、研修を増やしても変わらないのは、<br />
              組織の設計レベルにこれらの欠陥があるからです。
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {BOTTLENECKS.map((b) => (
              <div key={b.num} className="bg-white rounded-2xl border border-red-100 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-black text-red-100">{b.num}</span>
                  <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                    {b.icon}
                  </div>
                </div>
                <h3 className="font-black text-brand-navy text-base mb-3">{b.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Solution (SheetViz + カチカタ) ── */}
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

      {/* ── 4つのソリューション ── */}
      <section className="py-20">
        <div className="container-inner">
          <div className="text-center mb-12">
            <span className="section-label">サービス詳細</span>
            <h2 className="section-title">カチカタが提供する<br />「4つのソリューション」</h2>
            <p className="section-sub mt-3">
              KFS設計から運用定着まで、組織変革に必要なすべてをワンストップで。
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {SOLUTIONS.map((s) => {
              const borderCls =
                s.color === 'orange' ? 'border-brand-orange' :
                s.color === 'blue' ? 'border-blue-400' :
                s.color === 'purple' ? 'border-purple-400' : 'border-green-400';
              const tagBg =
                s.color === 'orange' ? 'bg-orange-50 text-orange-700' :
                s.color === 'blue' ? 'bg-blue-50 text-blue-700' :
                s.color === 'purple' ? 'bg-purple-50 text-purple-700' : 'bg-green-50 text-green-700';
              const numCls =
                s.color === 'orange' ? 'text-brand-orange' :
                s.color === 'blue' ? 'text-blue-600' :
                s.color === 'purple' ? 'text-purple-600' : 'text-green-600';
              return (
                <div key={s.num} className={`card border-l-4 ${borderCls}`}>
                  <div className="flex items-start gap-4 mb-3">
                    <span className={`text-3xl font-black ${numCls} opacity-30 leading-none`}>{s.num}</span>
                    <div>
                      <h3 className="font-black text-brand-navy text-base mb-2">{s.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {s.tags.map((tag) => (
                      <span key={tag} className={`text-xs font-bold px-2.5 py-1 rounded-full ${tagBg}`}>{tag}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 競争優位性 ── */}
      <section className="bg-brand-navy py-20">
        <div className="container-inner">
          <div className="text-center mb-12">
            <span className="inline-block bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-full tracking-wider uppercase mb-4">
              競争優位性
            </span>
            <h2 className="text-3xl font-black text-white leading-tight mb-5">
              なぜカチカタだけが<br />「再現性」を実現できるのか
            </h2>
            <p className="text-slate-400 text-base leading-8">
              3つの固有資産が、他社にはない精度と実行力を生み出します。
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {ADVANTAGES.map((a) => (
              <div key={a.title} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center mb-4">
                  {a.icon}
                </div>
                <h3 className="font-black text-white mb-3">{a.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 他社比較 ── */}
      <section className="py-20">
        <div className="container-inner max-w-3xl">
          <div className="text-center mb-10">
            <span className="section-label">他社との比較</span>
            <h2 className="section-title">カチカタが選ばれる理由</h2>
          </div>
          <div className="card overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand-bg border-b border-slate-200">
                    <th className="text-left p-4 font-bold text-slate-500 text-xs">比較軸</th>
                    {COMPARISON_DATA.map((c) => (
                      <th
                        key={c.company}
                        className={`p-4 font-black text-xs text-center ${c.company === 'カチカタ' ? 'text-brand-orange bg-orange-50' : 'text-brand-navy'}`}
                      >
                        {c.company}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_AXES.map((axis, axisIdx) => (
                    <tr key={axis} className={axisIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="p-4 font-semibold text-slate-700 text-xs">{axis}</td>
                      {COMPARISON_DATA.map((c) => (
                        <td
                          key={c.company}
                          className={`p-4 text-center ${c.company === 'カチカタ' ? 'bg-orange-50/50' : ''}`}
                        >
                          <CompMark mark={c.marks[axisIdx]} isKachikata={c.company === 'カチカタ'} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-slate-100 px-4 py-3 flex items-center gap-6 bg-slate-50 text-xs text-slate-400">
              <span className="flex items-center gap-1"><CheckCircle size={13} className="text-green-500" /> 対応・優位</span>
              <span className="flex items-center gap-1"><MinusCircle size={13} className="text-slate-400" /> 部分対応</span>
              <span className="flex items-center gap-1"><XCircle size={13} className="text-red-300" /> 非対応・弱点</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Growth Cycle ── */}
      <section className="bg-brand-bg py-20">
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
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-5 py-2">
              <RefreshCw size={16} className="text-brand-orange" />
              <span className="text-sm font-semibold text-slate-600">この循環が継続することで、組織の営業力が積み上がっていく</span>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
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
      <section className="py-20">
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
      <section className="bg-brand-bg py-20">
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
      <section className="py-20">
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
      <section className="bg-brand-bg py-20">
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
            <p className="font-bold text-brand-navy mb-4">パッケージに含まれるもの</p>
            <div className="space-y-3">
              {PLAN_ITEMS.map((item) => (
                <div key={item.num} className="flex gap-3 items-start">
                  <span className="text-brand-orange font-black text-xs shrink-0 mt-0.5">{item.num}</span>
                  <div>
                    <p className="text-sm font-bold text-brand-navy">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Cost comparison */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden max-w-lg mx-auto">
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
      <section className="py-20" id="diagnosis">
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
      <section className="bg-brand-bg py-20">
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
