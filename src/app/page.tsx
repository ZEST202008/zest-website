import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BarChart2, Users, TrendingUp } from 'lucide-react';
import { getServices, getBlogPosts } from '@/lib/notion';

// ── Hero Section ──────────────────────────────────────
function Hero() {
  return (
    <section className="bg-brand-bg border-b border-slate-200 py-20 md:py-28">
      <div className="container-inner">
        <div className="max-w-2xl">
          <span className="section-label">Sales Enablement</span>
          <h1 className="text-4xl md:text-5xl font-black text-brand-navy leading-tight mb-6">
            「なぜ売れたのか」を、<br />
            <span className="text-brand-orange">組織全体の力</span>に変える。
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            トップセールスの行動パターンをデータで解析し、<br className="hidden md:block" />
            誰もが再現できる「型」として定着させる。<br />
            <strong className="text-slate-800">SheetViz</strong> ×{' '}
            <strong className="text-brand-orange">カチカタ</strong>で、
            営業組織のデータ活用を支援します。
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary">
              <ArrowRight size={18} />
              無料相談を予約する
            </Link>
            <Link href="/services/kachikata" className="btn-secondary">
              サービスを見る
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Services Section ──────────────────────────────────
const SERVICES_STATIC = [
  {
    slug: 'kachikata',
    name: 'カチカタ',
    tagline: 'KFS特定・営業の型化',
    description: 'トップセールスの行動データを解析し、組織全体で再現できる「センターピン（KFS）」を特定。誰もが成果を出せる営業の型を作ります。',
    logo: '/kachikata-logo.png',
    color: 'orange',
  },
  {
    slug: 'sheetziv',
    name: 'SheetViz',
    tagline: 'AppSheetベースの営業CRM',
    description: 'Google SheetsとAppSheetを使った、導入コストゼロの営業支援プラットフォーム。フィールド・インサイド・管理職の3役割に最適化。',
    logo: '/sheetviz-logo.png',
    color: 'navy',
  },
];

function Services() {
  return (
    <section className="py-20">
      <div className="container-inner">
        <div className="text-center mb-12">
          <span className="section-label">サービス</span>
          <h2 className="section-title">2つのサービスで営業組織を変える</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {SERVICES_STATIC.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="card group no-underline"
            >
              <div className="h-12 mb-4 flex items-center">
                <Image src={s.logo} alt={s.name} width={160} height={48} className="h-10 w-auto object-contain" />
              </div>
              <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                s.color === 'orange' ? 'text-brand-orange' : 'text-brand-navy'
              }`}>
                {s.tagline}
              </div>
              <h3 className="text-xl font-black text-brand-navy mb-2">{s.name}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">{s.description}</p>
              <div className="flex items-center gap-1 text-brand-orange text-sm font-bold
                              group-hover:gap-2 transition-all">
                詳しく見る <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Why ZEST ──────────────────────────────────────────
const FEATURES = [
  { icon: <BarChart2 size={22} className="text-brand-orange" />, title: 'データドリブン', desc: '感覚や経験則ではなく、実際の営業データから再現性の高い「型」を導き出します。' },
  { icon: <Users size={22} className="text-brand-orange" />, title: '組織全体に展開', desc: '特定の個人に依存しない営業組織へ。ナレッジを資産として蓄積・共有します。' },
  { icon: <TrendingUp size={22} className="text-brand-orange" />, title: 'シンプルな導入', desc: 'GoogleスプレッドシートとAppSheetベースなので、既存ツールから大きな変更なしに導入可能。' },
];

function WhyZest() {
  return (
    <section className="bg-brand-bg py-20">
      <div className="container-inner">
        <div className="text-center mb-12">
          <span className="section-label">選ばれる理由</span>
          <h2 className="section-title">なぜZESTが選ばれるのか</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="card">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="font-black text-brand-navy mb-2">{f.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────
function CtaSection() {
  return (
    <section className="bg-brand-navy py-20">
      <div className="container-inner text-center">
        <h2 className="text-3xl font-black text-white mb-4">
          まずは話すだけで大丈夫です。
        </h2>
        <p className="text-slate-400 mb-8 leading-relaxed">
          「何から始めればよいかわからない」という段階からお気軽にご相談ください。<br />
          現状のCRM・データ体制は問いません。
        </p>
        <Link href="/contact" className="btn-primary">
          <ArrowRight size={18} />
          無料相談を予約する
        </Link>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────
export default async function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <WhyZest />
      <CtaSection />
    </>
  );
}
