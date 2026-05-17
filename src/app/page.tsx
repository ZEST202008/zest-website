import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, TrendingUp, BadgePercent, Sparkles,
  Database, Layers, Users, Building2, LineChart,
  Megaphone, BookOpen,
} from 'lucide-react';

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

// ── Services ──────────────────────────────────────────────
const SERVICES = [
  {
    slug: 'inside-sales',
    name: 'インサイドセールス内製化',
    tagline: '休眠顧客を商談機会に変える',
    description:
      '眠っている既存顧客を確実な商談へ。月額6万円〜の圧倒的ローコストで、パートスタッフが成果を出す持続可能なIS組織を社内に完全内製化します。',
    logo: null as string | null,
  },
  {
    slug: 'kachikata',
    name: 'カチカタ',
    tagline: 'トップセールスの勝ち方を組織の型に',
    description:
      'トップセールスの行動データを解析し、「なぜ売れたのか」を組織の共有知に変換。誰もが再現できる営業の型で、属人依存から脱却します。',
    logo: '/kachikata-logo.png' as string | null,
  },
  {
    slug: 'sheetziv',
    name: 'SheetViz',
    tagline: '営業データをリアルタイムで可視化',
    description:
      'Google SheetsとAppSheetを使った、導入コストゼロの営業支援CRM。フィールド・インサイド・管理職の3役割に最適化し、データを自社資産に変えます。',
    logo: '/sheetviz-logo.png' as string | null,
  },
];

function Services() {
  return (
    <section className="py-20 bg-white">
      <div className="container-inner">
        <div className="text-center mb-12">
          <span className="section-label">サービス</span>
          <h2 className="section-title">
            3つのアプローチで、<br className="hidden md:block" />
            営業力を組織の仕組みに変える。
          </h2>
          <p className="section-sub mt-3 max-w-xl mx-auto">
            掘り起こし → 型化 → データ蓄積。一気通貫で支援します。
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="card group no-underline flex flex-col hover:border-brand-orange/30 transition-colors"
            >
              <div className="h-10 mb-4 flex items-center">
                {s.logo ? (
                  <Image
                    src={s.logo}
                    alt={s.name}
                    width={160}
                    height={40}
                    className="h-9 w-auto object-contain"
                  />
                ) : (
                  <span className="text-base font-black text-brand-navy">{s.name}</span>
                )}
              </div>
              <div className="text-xs text-slate-500 font-semibold mb-2">{s.tagline}</div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">{s.description}</p>
              <div className="flex items-center gap-1 text-brand-orange text-sm font-bold group-hover:gap-2 transition-all mt-auto">
                詳しく見る <ArrowRight size={14} />
              </div>
            </Link>
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
    <section className="py-24 bg-brand-bg">
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

// ── Achievements ─────────────────────────────────────────
const ACHIEVEMENTS = [
  {
    Icon: Building2,
    category: '経営・事業戦略',
    achievement:
      '中期経営計画の策定と実行管理を一体で支援。事業ポートフォリオの見直しと組織再編を実現。',
    tags: ['中期経営計画', '組織設計', 'ポートフォリオ戦略'],
  },
  {
    Icon: LineChart,
    category: '営業・セールスプロセス',
    achievement:
      'KFS（センターピン）の特定とセールスプレイブック全社展開で、成約率改善・新人の早期戦力化を実現。',
    tags: ['KFS特定', 'プレイブック策定', '属人化排除'],
  },
  {
    Icon: Users,
    category: '採用・人材育成',
    achievement:
      '採用ペルソナと評価基準を再設計し、定着率の高い採用フローと次世代リーダー育成を複数社で実現。',
    tags: ['採用ペルソナ設計', '人材育成', '評価制度構築'],
  },
  {
    Icon: Megaphone,
    category: 'マーケティング体制',
    achievement:
      'ゼロからのマーケティングチーム組成と運用ガイド整備で、商談転換率の向上に貢献。',
    tags: ['チーム組成', '顧客インサイト分析', 'マーケOps'],
  },
  {
    Icon: BookOpen,
    category: 'マニュアル・ナレッジ整備',
    achievement:
      '属人化していた業務ノウハウを言語化・標準化。新人が独力で業務遂行できる体制を構築。',
    tags: ['業務マニュアル整備', 'ナレッジ管理', '引き継ぎ標準化'],
  },
  {
    Icon: Database,
    category: 'DX推進・データ経営',
    achievement:
      'SheetViz CRM導入でデータ経営に移行。経営判断のスピードと根拠の精度が大幅に向上。',
    tags: ['CRM開発・導入', 'BIダッシュボード', 'データドリブン経営'],
  },
];

function AchievementsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container-inner">
        <div className="text-center mb-12">
          <span className="section-label">支援実績</span>
          <h2 className="section-title">
            業種・規模を問わず、<br className="hidden md:block" />
            経営課題の本質に向き合ってきました。
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ACHIEVEMENTS.map((a) => (
            <div
              key={a.category}
              className="card hover:border-brand-orange/30 transition-colors flex flex-col"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                  <a.Icon size={18} className="text-brand-orange" />
                </div>
                <span className="text-xs font-bold text-brand-orange tracking-wider">
                  {a.category}
                </span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">{a.achievement}</p>
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {a.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-slate-100 text-slate-500 font-semibold px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
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
      <Services />
      <Approach />
      <AchievementsSection />
      <Manifesto />
      <CtaSection />
    </>
  );
}
