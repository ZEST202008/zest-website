import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, TrendingUp, BadgePercent, ShieldCheck, Building2, LineChart, Users, Megaphone, BookOpen, Database } from 'lucide-react';
import { getServices, getBlogPosts } from '@/lib/notion';

// ── Hero ───────────────────────────────────────────────
function Hero() {
  return (
    <section className="bg-brand-navy py-24 md:py-32 relative overflow-hidden">
      {/* 装飾 */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 70% 50%, #e04102 0%, transparent 60%)',
        }}
      />
      <div className="container-inner relative">
        <div className="max-w-3xl">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-orange bg-orange-950/40 border border-orange-900/40 rounded-full px-3 py-1 mb-8">
            Sales Enablement for SMB
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-6">
            売上を伸ばしながら、<br />
            <span className="text-brand-orange">営業コストを削減する。</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-4 max-w-2xl">
            「人に頼らず、仕組みで売れる組織」をつくる。
            休眠顧客の掘り起こしから、トップセールスの型化まで。
            中小企業の営業力を、根本から底上げします。
          </p>
          <p className="text-slate-500 text-sm mb-10">
            IS代行と比較してランニングコスト<strong className="text-white">最大90%削減</strong>・最短<strong className="text-white">90日</strong>で自走する組織を構築
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary">
              <ArrowRight size={18} />
              無料相談を予約する
            </Link>
            <Link
              href="/services/inside-sales"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-600 text-slate-300 hover:border-slate-400 hover:text-white transition-colors text-sm font-bold"
            >
              サービスを見る
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 数字で示す価値 ─────────────────────────────────────
const METRICS = [
  { value: '1/10', unit: 'のコスト', label: 'IS代行と比較した\nランニングコスト' },
  { value: '90', unit: '日', label: '実稼働まで\n最短ロードマップ' },
  { value: '100', unit: '%', label: '自社に残る\n顧客データ・ノウハウ' },
];

function Metrics() {
  return (
    <section className="bg-white border-b border-slate-100 py-12">
      <div className="container-inner">
        <div className="grid grid-cols-3 gap-4 md:gap-12 max-w-2xl mx-auto text-center">
          {METRICS.map((m) => (
            <div key={m.label}>
              <div className="flex items-end justify-center gap-1 mb-1">
                <span className="text-3xl md:text-4xl font-black text-brand-navy">{m.value}</span>
                <span className="text-brand-orange font-bold text-sm md:text-base pb-1">{m.unit}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed whitespace-pre-line">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 課題提起 ───────────────────────────────────────────
const PAINS = [
  { q: '営業の成果が、特定の人に依存していませんか？', desc: 'エースが退職したとたん売上が激減。「あの人だから売れた」では組織が育たない。' },
  { q: '休眠顧客を、放置したままにしていませんか？', desc: '過去に接点があった顧客は最大の金脈。しかし多忙な営業マンは新規に走り、休眠は誰も追わない。' },
  { q: '外部代行に、毎月数十万を払い続けていませんか？', desc: '契約を切ればノウハウも人材もすべて消える「永遠のレンタルモデル」。自社に何も残らない。' },
];

function PainSection() {
  return (
    <section className="py-20 bg-brand-bg">
      <div className="container-inner max-w-4xl">
        <div className="text-center mb-12">
          <span className="section-label">こんな課題ありませんか？</span>
          <h2 className="section-title">
            営業組織の「3つの壁」が<br className="hidden md:block" />
            成長にブレーキをかけている
          </h2>
        </div>
        <div className="space-y-4">
          {PAINS.map((p) => (
            <div key={p.q} className="card flex gap-4 items-start">
              <div className="text-brand-orange font-black text-2xl shrink-0 mt-0.5">?</div>
              <div>
                <p className="font-black text-brand-navy mb-1">{p.q}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 価値提案 ───────────────────────────────────────────
const VALUES = [
  {
    icon: <TrendingUp size={24} className="text-brand-orange" />,
    title: '売上を伸ばす',
    desc: '休眠顧客の掘り起こしと、トップセールスの「型化」で、組織全体の商談創出力を底上げ。属人的な営業から、仕組みによる安定した売上成長へ。',
  },
  {
    icon: <BadgePercent size={24} className="text-brand-orange" />,
    title: 'コストを削減する',
    desc: '月額6万円〜のパートタイムモデルで、代行費用の最大90%をカット。しかも自社にノウハウとデータが丸ごと残り、永続的な資産になる。',
  },
  {
    icon: <ShieldCheck size={24} className="text-brand-orange" />,
    title: '再現性を担保する',
    desc: '「エースが辞めると売上が落ちる」リスクを根本から排除。科学的に検証されたプレイブックと専用CRMで、誰でも同じ成果を出せる仕組みを構築。',
  },
];

function ValueSection() {
  return (
    <section className="py-20">
      <div className="container-inner">
        <div className="text-center mb-12">
          <span className="section-label">ZESTが提供する価値</span>
          <h2 className="section-title">
            売上アップとコスト削減を、<br className="hidden md:block" />
            同時に実現する
          </h2>
          <p className="section-sub mt-3 max-w-xl mx-auto">
            どちらかを犠牲にするのではなく、仕組みの力で両方を手に入れる。
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {VALUES.map((v) => (
            <div key={v.title} className="card text-center">
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                {v.icon}
              </div>
              <h3 className="font-black text-brand-navy text-xl mb-3">{v.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── サービス ───────────────────────────────────────────
type Service = {
  slug: string;
  step: string;
  name: string;
  tagline: string;
  description: string;
  logo?: string;
  logoClass?: string;
  logoAlt?: string;
};

const SERVICES: Service[] = [
  {
    slug: 'inside-sales',
    step: 'Step 01',
    name: 'インサイドセールス内製化',
    tagline: '休眠顧客を商談機会に変える',
    description: '眠っている既存顧客を確実な商談へ。月額6万円〜の圧倒的ローコストで、パートスタッフが成果を出す持続可能なIS組織を社内に完全内製化します。',
  },
  {
    slug: 'kachikata',
    step: 'Step 02',
    name: 'カチカタ',
    tagline: 'トップセールスの勝ち方を組織の型に',
    description: 'トップセールスの行動データを解析し、「なぜ売れたのか」を組織の共有知に変換。誰もが再現できる営業の型で、属人依存から脱却します。',
    logo: '/kachikata-logo.png',
    logoClass: 'h-14 w-auto object-contain',
    logoAlt: 'カチカタ',
  },
  {
    slug: 'sheetziv',
    step: 'Step 03',
    name: 'SheetViz',
    tagline: '営業データをリアルタイムで可視化',
    description: 'Google SheetsとAppSheetを使った、導入コストゼロの営業支援CRM。フィールド・インサイド・管理職の3役割に最適化し、データを自社資産に変えます。',
    logo: '/sheetviz-logo.png',
    logoClass: 'h-10 w-auto object-contain',
    logoAlt: 'SheetViz',
  },
];

function Services() {
  return (
    <section className="py-20 bg-brand-bg">
      <div className="container-inner">
        <div className="text-center mb-12">
          <span className="section-label">サービス</span>
          <h2 className="section-title">3つのアプローチで、<br className="hidden md:block" />営業力を組織の仕組みに変える</h2>
          <p className="section-sub mt-3 max-w-xl mx-auto">
            掘り起こし → 型化 → データ蓄積。一気通貫で支援します。
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="card group no-underline flex flex-col"
            >
              <div className="h-12 mb-4 flex items-center">
                {s.logo ? (
                  <Image src={s.logo} alt={s.logoAlt ?? s.name} width={180} height={48} className={s.logoClass} />
                ) : (
                  <span className="text-lg font-black text-brand-navy">{s.name}</span>
                )}
              </div>
              <div className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-0.5">{s.step}</div>
              <div className="text-xs text-slate-500 font-semibold mb-2">{s.tagline}</div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">{s.description}</p>
              <div className="flex items-center gap-1 text-brand-orange text-sm font-bold
                              group-hover:gap-2 transition-all mt-auto">
                詳しく見る <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 実行支援実績 ───────────────────────────────────────
const TRACK_RECORDS = [
  {
    icon: <Building2 size={20} className="text-brand-orange" />,
    num: '01',
    category: '経営・事業戦略',
    title: 'ビジョンを組織構造に落とし込む',
    items: ['中期経営計画・推進ガイドラインの策定', '事業ポートフォリオ戦略の構築', '組織マネジメントの進化戦略策定'],
  },
  {
    icon: <LineChart size={20} className="text-brand-orange" />,
    num: '02',
    category: '営業・セールスプロセス',
    title: '属人化を排除し、再現性を確立する',
    items: ['営業プロセス標準化ガイドラインの策定', 'KFS・KPIの設計と運用定着', 'セールスプレイブックの作成'],
  },
  {
    icon: <Users size={20} className="text-brand-orange" />,
    num: '03',
    category: '採用・人材育成',
    title: '次代のリーダーを育て、採用力を強化する',
    items: ['採用ペルソナ&運用レギュレーションの構築', '経営人材育成プロジェクトの設計', '経営幹部向け評価制度の設計'],
  },
  {
    icon: <Megaphone size={20} className="text-brand-orange" />,
    num: '04',
    category: 'マーケティング体制',
    title: 'データと顧客インサイトでプロセスを設計する',
    items: ['マーケティングチーム構築支援', 'トップパフォーマーの提案ロジック可視化', 'マーケティングオペレーター研修ガイド作成'],
  },
  {
    icon: <BookOpen size={20} className="text-brand-orange" />,
    num: '05',
    category: 'マニュアル作成',
    title: '熟練者のノウハウを形式知に変える',
    items: ['業務オペレーション基本マニュアルの整備', '部門別・特定業務別手順書の作成', 'カスタマーサポートマニュアルの構築'],
  },
  {
    icon: <Database size={20} className="text-brand-orange" />,
    num: '06',
    category: 'DX推進・データ経営',
    title: '勘と経験から、データに基づく意思決定へ',
    items: ['SheetViz CRM開発・導入支援', 'BIダッシュボード構築・運用支援', '経営DX推進ロードマップの策定'],
  },
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: '現状分析と要件定義',
    desc: '経営層・現場への入念なヒアリングで本質的な課題を抽出。目指すべき指標（KPI）を明確に定義します。',
  },
  {
    step: '02',
    title: '仕組みのドキュメント化',
    desc: '暗黙知となっていた業務フローや属人的なノウハウを言語化し、誰もが再現・実行できるガイドラインとして策定します。',
  },
  {
    step: '03',
    title: '現場定着・運用支援',
    desc: '作成して終わりではなく、データに基づく効果測定と改善を繰り返しながら、組織の文化として根付くまで伴走します。',
  },
];

function TrackRecord() {
  return (
    <section className="py-20">
      <div className="container-inner">
        {/* ヘッダー */}
        <div className="text-center mb-14">
          <span className="section-label">実行支援実績</span>
          <h2 className="section-title">
            戦略から、現場の実行まで。
          </h2>
          <p className="section-sub mt-3 max-w-2xl mx-auto">
            単なる計画策定にとどまらず、現場の行動を変容させる具体的な「仕組み」として業務に落とし込み、
            組織の再現性を高める支援を行ってきました。
          </p>
        </div>

        {/* 6領域グリッド */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {TRACK_RECORDS.map((r) => (
            <div key={r.num} className="card group hover:border-brand-orange/30 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                  {r.icon}
                </div>
                <span className="text-xs font-bold text-slate-400 tracking-widest">{r.num}</span>
              </div>
              <div className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-1">{r.category}</div>
              <h3 className="font-black text-brand-navy text-base mb-3 leading-snug">{r.title}</h3>
              <ul className="space-y-1.5">
                {r.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-slate-500 leading-relaxed">
                    <span className="text-brand-orange mt-0.5 shrink-0">–</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 支援プロセス */}
        <div className="bg-brand-bg rounded-2xl p-8 md:p-12">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-orange text-center mb-2">Support Process</p>
          <h3 className="text-xl font-black text-brand-navy text-center mb-8">実績を生み出してきた3つの支援プロセス</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {PROCESS_STEPS.map((p, i) => (
              <div key={p.step} className="relative">
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-5 left-full w-full h-px bg-slate-200 z-0" style={{ width: 'calc(100% - 2rem)', transform: 'translateX(1rem)' }} />
                )}
                <div className="flex items-center gap-3 mb-3 relative z-10">
                  <div className="w-10 h-10 bg-brand-orange rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0">
                    {p.step}
                  </div>
                  <h4 className="font-black text-brand-navy text-base">{p.title}</h4>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed pl-13">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────
function CtaSection() {
  return (
    <section className="bg-brand-navy py-24">
      <div className="container-inner text-center">
        <p className="text-brand-orange text-sm font-bold uppercase tracking-widest mb-4">First Step</p>
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
          「何から始めればいいかわからない」<br />
          その段階からご相談ください。
        </h2>
        <p className="text-slate-400 mb-10 leading-relaxed max-w-lg mx-auto">
          現状の営業体制・CRM・データ環境は問いません。
          課題を整理するところから、ZESTが一緒に考えます。
        </p>
        <Link href="/contact" className="btn-primary text-base px-8 py-4">
          <ArrowRight size={18} />
          無料相談を予約する
        </Link>
        <p className="text-slate-600 text-xs mt-4">完全無料・セールスなし・オンライン対応可</p>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────
export default async function HomePage() {
  return (
    <>
      <Hero />
      <Metrics />
      <PainSection />
      <ValueSection />
      <Services />
      <TrackRecord />
      <CtaSection />
    </>
  );
}
