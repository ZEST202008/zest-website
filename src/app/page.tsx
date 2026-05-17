import Link from 'next/link';
import { ArrowRight, TrendingUp, BadgePercent, Sparkles, Database, Layers, Users } from 'lucide-react';

// ── Hero ──────────────────────────────────────────────────
function Hero() {
  return (
    <section className="bg-brand-navy relative overflow-hidden min-h-[600px] md:min-h-[680px] flex items-center">
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 70%, #e04001 0%, transparent 50%), radial-gradient(circle at 80% 20%, #1a2744 0%, transparent 60%)',
        }}
      />
      <div className="container-inner relative py-24 md:py-32">
        <div className="max-w-3xl">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-orange bg-orange-950/40 border border-orange-900/40 rounded-full px-3 py-1 mb-8">
            ZEST Inc.
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-[3.5rem] font-black text-white leading-[1.2] mb-8 [word-break:keep-all]">
            あなたの会社にしかできないことを、<br />
            <span className="text-brand-orange">最大化する。</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
            売上を上げ、コストを下げる。<br className="hidden md:block" />
            そして、人間が人間にしかできない価値に<br className="hidden md:block" />
            もっと集中できる組織をつくる。
          </p>
          <Link href="/contact" className="btn-primary text-base px-8 py-4">
            <ArrowRight size={18} />
            まずは話してみてください
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Belief ────────────────────────────────────────────────
function Belief() {
  return (
    <section className="py-24 bg-white">
      <div className="container-inner max-w-4xl text-center">
        <span className="section-label">私たちの考え方</span>
        <h2 className="section-title mb-8">
          AIを「流行」として使うのではなく、<br className="hidden md:block" />
          あなたの会社の「固有の強み」に変える。
        </h2>
        <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-6">
          生成AI・AIエージェント・外部ツールとの連携。これらは手段であり、目的ではありません。
          ZESTが重要視するのは、
          <strong className="text-brand-navy font-black">あなたの会社にしかないデータと知見を、どう活かすか</strong>
          という問いです。
        </p>
        <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          業種・規模・フェーズに最適化されたテクノロジーの組み合わせで、
          他社が真似できない競争優位をつくる。それがZESTの提供する価値です。
        </p>
      </div>
    </section>
  );
}

// ── Outcomes ─────────────────────────────────────────────
const OUTCOMES = [
  {
    Icon: TrendingUp,
    label: '売上が上がる',
    desc: '企業固有のデータを活用した営業の型化・自動化により、組織全体の商談創出力と成約力を底上げします。',
  },
  {
    Icon: BadgePercent,
    label: 'コストが下がる',
    desc: 'AIとツールの最適な組み合わせで、人的コストと外部委託費を削減。投資対効果の高い仕組みを自社に構築します。',
  },
  {
    Icon: Sparkles,
    label: '人間の価値が最大化される',
    desc: 'ルーティン業務をテクノロジーが担うことで、人間はクリエイティブ・判断・関係構築といった、人間にしかできない仕事に集中できます。',
  },
];

function Outcomes() {
  return (
    <section className="py-20 bg-brand-bg">
      <div className="container-inner">
        <div className="text-center mb-12">
          <span className="section-label">ZESTが実現すること</span>
          <h2 className="section-title">3つの成果を、同時に手に入れる。</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {OUTCOMES.map((o) => (
            <div key={o.label} className="card text-center">
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <o.Icon size={24} className="text-brand-orange" />
              </div>
              <h3 className="font-black text-brand-navy text-xl mb-3">{o.label}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{o.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Approach ─────────────────────────────────────────────
const PILLARS = [
  {
    num: '01',
    Icon: Database,
    title: '企業固有データの最大活用',
    desc: '営業履歴・顧客データ・社内ナレッジ。あなたの会社だけが持つ資産を、競争優位の源泉として最大限に引き出します。',
  },
  {
    num: '02',
    Icon: Layers,
    title: 'テクノロジーの最適な組み合わせ',
    desc: '生成AI、AIエージェント、外部APIとの連携。目的に最も適したツールを選び、有機的に組み合わせて実装します。',
  },
  {
    num: '03',
    Icon: Users,
    title: '人間がフォーカスすべき場所の定義',
    desc: 'どこを自動化し、どこに人間が集中するか。その設計こそが、組織を本当に強くします。',
  },
];

function Approach() {
  return (
    <section className="py-24 bg-white">
      <div className="container-inner">
        <div className="text-center mb-14">
          <span className="section-label">アプローチ</span>
          <h2 className="section-title">
            なぜZESTは、<br className="hidden md:block" />他と違うのか。
          </h2>
          <p className="section-sub mt-3 max-w-xl mx-auto">
            汎用的なAI導入支援ではなく、あなたの会社のために設計された、オーダーメイドのアプローチです。
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {PILLARS.map((p) => (
            <div key={p.num} className="flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-brand-orange rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0">
                  {p.num}
                </div>
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                  <p.Icon size={20} className="text-brand-orange" />
                </div>
              </div>
              <h3 className="font-black text-brand-navy text-lg mb-3 leading-snug">{p.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Manifesto ────────────────────────────────────────────
function Manifesto() {
  return (
    <section className="bg-brand-navy py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 75% 50%, #e04001 0%, transparent 60%)',
        }}
      />
      <div className="container-inner relative text-center max-w-3xl">
        <p className="text-brand-orange text-sm font-bold uppercase tracking-widest mb-10">
          Our Mission
        </p>
        <blockquote className="text-2xl md:text-4xl font-black text-white leading-[1.5] [word-break:keep-all]">
          人間にしかできないことに、<br />
          人間が集中できる世界をつくる。
        </blockquote>
      </div>
    </section>
  );
}

// ── CTA ──────────────────────────────────────────────────
function CtaSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container-inner text-center max-w-2xl">
        <span className="section-label">お問い合わせ</span>
        <h2 className="section-title mb-4">まずは、話してみてください。</h2>
        <p className="text-slate-600 mb-10 leading-relaxed">
          現状のデータ環境・ツール・課題は問いません。<br />
          「何から始めればいいかわからない」その段階から、ZESTが一緒に考えます。
        </p>
        <Link href="/contact" className="btn-primary text-base px-8 py-4">
          <ArrowRight size={18} />
          無料相談を予約する
        </Link>
        <p className="text-slate-400 text-xs mt-4">完全無料・セールスなし・オンライン対応可</p>
      </div>
    </section>
  );
}

// ── Page ─────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Hero />
      <Belief />
      <Outcomes />
      <Approach />
      <Manifesto />
      <CtaSection />
    </>
  );
}
