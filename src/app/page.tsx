import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, TrendingUp, BadgePercent, Sparkles,
  Database, Users, Building2, LineChart, Megaphone, BookOpen,
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
      <div className="container-inner relative w-full min-w-0 py-24 md:py-32">
        <div className="max-w-3xl">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-orange bg-orange-950/40 border border-orange-900/40 rounded-full px-3 py-1 mb-8">
            ZEST Inc.
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-[3.5rem] font-black text-white leading-[1.2] mb-8 md:[word-break:keep-all]">
            あなたの会社にしかできないことを、<br />
            <span className="text-brand-orange">最大化する。</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-6 max-w-2xl">
            AIは、やがて誰もが同じものを使う。<br className="hidden md:block" />
            差がつくのは、その会社にしかないデータと、<br className="hidden md:block" />
            それを使いこなす組織です。
          </p>
          <p className="text-slate-400 text-base leading-relaxed mb-10 max-w-2xl">
            ZESTは「勘と経験」と「データ」の2本柱で、<br className="hidden md:block" />
            中小企業の稼ぐ力そのものをつくります。
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

// ── Era（時代認識） ────────────────────────────────────────
const ERA = [
  {
    num: '01',
    title: 'インターネットの30年は、\n「置き換え」にとどまった',
    desc: 'ホームページ、ネット通販、予約サイト。窓口は移っても、稼ぎ方そのものは変わりませんでした。利益の多くは広告費や手数料としてプラットフォームへ流れ、顧客のデータも自社には残らなかった。',
  },
  {
    num: '02',
    title: 'AIの時代は、\n「データ」で差がつく',
    desc: 'AIはコモディティ化し、誰もが安く使えるものになります。誰もが同じAIを使える以上、AIそのものは差になりません。差になるのは、その会社にしかないデータと、それを使いこなす組織です。',
  },
  {
    num: '03',
    title: '本当の壁は、\n「データがまだない」こと',
    desc: '顧客の情報は担当者の頭の中にあり、商談の経緯は残らず、休眠顧客は放置されている。AIの性能がどれだけ上がっても、データを生み出し続ける組織だけは、AIには代われません。',
  },
];

const ROLES = [
  { title: 'データが生まれる組織をつくる', desc: '行動を記録し、型にし、回し続ける仕組みを社内につくる。' },
  { title: 'データを自社に残す', desc: 'プラットフォームに渡すのではなく、会社の資産として手元にためる。' },
  { title: 'データを稼ぐ力に変える', desc: 'AIを使って、稼ぎ方そのものを変える。' },
];

function Era() {
  return (
    <section className="py-24 bg-white">
      <div className="container-inner">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <span className="section-label">私たちの時代認識</span>
          <h2 className="section-title">
            AIの時代に、<br className="hidden md:block" />
            中小企業が強くなる条件。
          </h2>
          <p className="section-sub mt-3">
            AIを導入することが目的ではありません。AIが誰にでも安く手に入る時代に、何が会社の差になるのか。ZESTはそこから考えます。
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {ERA.map((e) => (
            <div key={e.num} className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-brand-orange rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0">
                  {e.num}
                </div>
                <div className="h-px flex-1 bg-slate-200" />
              </div>
              <h3 className="font-black text-brand-navy text-lg mb-3 leading-snug whitespace-pre-line">
                {e.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">{e.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto bg-brand-bg rounded-2xl p-8 md:p-10">
          <h3 className="font-black text-brand-navy text-xl mb-6 text-center">
            だからZESTは、ここから始めます。
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {ROLES.map((r, i) => (
              <div key={r.title} className="flex gap-3">
                <span className="text-brand-orange font-black text-sm shrink-0 pt-0.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <div className="font-bold text-brand-navy text-sm mb-1 leading-snug">{r.title}</div>
                  <p className="text-slate-600 text-sm leading-relaxed">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-xs leading-relaxed mt-8 text-center">
            作業を置き換えるだけのAIは、インターネットの30年と同じことの繰り返しになるため、ZESTは取り組みません。
          </p>
        </div>
      </div>
    </section>
  );
}

// ── 2本柱（リボン図） ──────────────────────────────────────
function RibbonDiagram() {
  return (
    <div className="hidden md:block overflow-x-auto py-2">
      <svg
        viewBox="0 0 1040 500"
        role="img"
        aria-label="リボン図。左の輪が経営コンサルティング（勘と経験）、右の輪がデータ活用（データ）、中央の結び目があなたの現場。上の矢印は決めたことを仕組みとして社内に残す流れ、下の矢印はたまったデータが次の経営判断の根拠になる流れ、中央の破線は現場の知見が新しい型になる流れ。"
        className="w-full min-w-[760px] h-auto"
      >
        <defs>
          <marker id="hp-arrow-orange" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 Z" fill="#e04102" />
          </marker>
          <marker id="hp-arrow-slate" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 Z" fill="#94a3b8" />
          </marker>
        </defs>

        {/* 循環：コンサル → データ活用 */}
        <text x="520" y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill="#e04102">
          決めたことを、仕組みとして社内に残す
        </text>
        <path d="M 292,192 Q 520,24 748,192" fill="none" stroke="#e04102" strokeWidth="2" markerEnd="url(#hp-arrow-orange)" />

        {/* 左の柱 */}
        <path d="M 70,140 L 420,235 L 420,325 L 70,420 L 118,280 Z" fill="#fff5f0" stroke="#e04102" strokeWidth="1.5" />
        <text x="240" y="232" textAnchor="middle" fontSize="12" fontWeight="700" letterSpacing="0.08em" fill="#e04102">勘と経験 ／ 人の知恵</text>
        <text x="240" y="263" textAnchor="middle" fontSize="19" fontWeight="700" fill="#1a2744">経営コンサルティング</text>
        <text x="240" y="295" textAnchor="middle" fontSize="14" fill="#475569">「何をやるか」を決める</text>
        <text x="240" y="319" textAnchor="middle" fontSize="14" fill="#475569">一社ごとに、一から設計する</text>

        {/* 右の柱 */}
        <path d="M 970,140 L 620,235 L 620,325 L 970,420 L 922,280 Z" fill="#fff5f0" stroke="#e04102" strokeWidth="1.5" />
        <text x="800" y="232" textAnchor="middle" fontSize="12" fontWeight="700" letterSpacing="0.08em" fill="#e04102">データ ／ 事実と仕組み</text>
        <text x="800" y="263" textAnchor="middle" fontSize="19" fontWeight="700" fill="#1a2744">データ活用</text>
        <text x="800" y="295" textAnchor="middle" fontSize="14" fill="#475569">「どう回し続けるか」を担う</text>
        <text x="800" y="319" textAnchor="middle" fontSize="14" fill="#475569">完成した型を、再現できる形で渡す</text>

        {/* 結び目 */}
        <rect x="408" y="218" width="224" height="124" rx="14" fill="#1a2744" />
        <text x="520" y="252" textAnchor="middle" fontSize="12" fontWeight="700" letterSpacing="0.08em" fill="#ffffff" opacity="0.8">2本柱が結ばれる場所</text>
        <text x="520" y="283" textAnchor="middle" fontSize="18" fontWeight="700" fill="#ffffff">あなたの現場</text>
        <text x="520" y="307" textAnchor="middle" fontSize="12" fill="#ffffff" opacity="0.85">決めたことが実行され、</text>
        <text x="520" y="325" textAnchor="middle" fontSize="12" fill="#ffffff" opacity="0.85">データが生まれる</text>

        {/* 循環：現場の知見 → 新しい型 */}
        <path d="M 388,352 Q 520,418 652,352" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="6 5" markerEnd="url(#hp-arrow-slate)" />
        <text x="520" y="404" textAnchor="middle" fontSize="12" fill="#64748b">現場で生まれた知見が、新しい型になる</text>

        {/* 循環：データ活用 → コンサル */}
        <path d="M 748,368 Q 520,536 292,368" fill="none" stroke="#e04102" strokeWidth="2" markerEnd="url(#hp-arrow-orange)" />
        <text x="520" y="478" textAnchor="middle" fontSize="13" fontWeight="700" fill="#e04102">
          たまったデータが、次の経営判断の根拠になる
        </text>
      </svg>
    </div>
  );
}

// スマートフォンでは、リボンを縦の循環に組み替えて見せる
function MobileCycleArrow({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 py-2">
      <div className="w-px h-4 bg-brand-orange/40" />
      <p className="text-xs font-bold text-brand-orange text-center leading-relaxed">{label}</p>
      <ArrowRight size={16} className="text-brand-orange rotate-90" />
    </div>
  );
}

function MobileRibbon() {
  return (
    <div className="md:hidden">
      <div className="rounded-2xl border border-brand-orange/40 bg-orange-50/50 p-5 text-center">
        <div className="text-xs font-bold tracking-wider text-brand-orange mb-1">勘と経験 ／ 人の知恵</div>
        <div className="font-black text-brand-navy text-lg mb-2">経営コンサルティング</div>
        <p className="text-slate-600 text-sm leading-relaxed">
          「何をやるか」を決める。一社ごとに、一から設計する。
        </p>
      </div>

      <MobileCycleArrow label="決めたことを、仕組みとして社内に残す" />

      <div className="rounded-2xl bg-brand-navy p-5 text-center">
        <div className="text-xs font-bold tracking-wider text-white/70 mb-1">2本柱が結ばれる場所</div>
        <div className="font-black text-white text-lg mb-2">あなたの現場</div>
        <p className="text-white/85 text-sm leading-relaxed">
          決めたことが実行され、データが生まれる。
        </p>
      </div>

      <MobileCycleArrow label="現場で生まれた知見が、新しい型になる" />

      <div className="rounded-2xl border border-brand-orange/40 bg-orange-50/50 p-5 text-center">
        <div className="text-xs font-bold tracking-wider text-brand-orange mb-1">データ ／ 事実と仕組み</div>
        <div className="font-black text-brand-navy text-lg mb-2">データ活用</div>
        <p className="text-slate-600 text-sm leading-relaxed">
          「どう回し続けるか」を担う。完成した型を、再現できる形で渡す。
        </p>
      </div>

      <div className="mt-5 flex items-center gap-3 rounded-xl border border-dashed border-brand-orange/50 px-4 py-3">
        <ArrowRight size={16} className="text-brand-orange -rotate-90 shrink-0" />
        <p className="text-xs font-bold text-brand-orange leading-relaxed">
          たまったデータが、次の経営判断の根拠になる（最初の柱へ戻る）
        </p>
      </div>
    </div>
  );
}

function TwoPillars() {
  return (
    <section className="py-24 bg-brand-bg border-y border-slate-200">
      <div className="container-inner">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <span className="section-label">事業構造</span>
          <h2 className="section-title">
            2本柱は、<br className="hidden md:block" />
            あなたの現場で結ばれる。
          </h2>
          <p className="section-sub mt-3">
            ZESTの事業は、勘と経験を担う<strong className="text-brand-navy font-black">経営コンサルティング</strong>と、
            データを担う<strong className="text-brand-navy font-black">データ活用</strong>の2本柱。
            経営判断の両輪を、それぞれの柱が担います。
          </p>
        </div>
        <RibbonDiagram />
        <MobileRibbon />
        <p className="text-slate-500 text-sm leading-relaxed text-center max-w-2xl mx-auto mt-6">
          2本柱は並んでいるのではなく、循環しています。どちらの柱から入っても、もう一方へ進む理由があります。
        </p>
      </div>
    </section>
  );
}

// ── なぜ2本柱なのか ────────────────────────────────────────
function GutOnlyFigure() {
  return (
    <svg viewBox="0 0 300 120" role="img" aria-label="裏付けのないまま揺れながら進む道筋。進んでいる方向が正しいか確かめられないことを示す。" className="w-full h-auto">
      <defs>
        <marker id="hp-p1-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#94a3b8" />
        </marker>
      </defs>
      <circle cx="22" cy="60" r="5" fill="#94a3b8" />
      <path d="M 30,60 C 70,18 95,104 135,58 S 195,14 230,76" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="7 5" markerEnd="url(#hp-p1-arrow)" />
      <text x="252" y="84" fontSize="26" fontWeight="700" fill="#94a3b8">?</text>
    </svg>
  );
}

function DataOnlyFigure() {
  return (
    <svg viewBox="0 0 300 120" role="img" aria-label="同じ向きに並ぶ3本の同一の道筋。自社の道が他社と見分けのつかないものになることを示す。" className="w-full h-auto">
      <defs>
        <marker id="hp-p2-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#94a3b8" />
        </marker>
      </defs>
      <path d="M 30,30 L 228,30" fill="none" stroke="#94a3b8" strokeWidth="2" opacity="0.35" markerEnd="url(#hp-p2-arrow)" />
      <text x="242" y="34" fontSize="11" fill="#94a3b8" opacity="0.8">他社</text>
      <circle cx="22" cy="60" r="5" fill="#94a3b8" />
      <path d="M 30,60 L 228,60" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#hp-p2-arrow)" />
      <text x="242" y="64" fontSize="11" fill="#64748b">自社</text>
      <path d="M 30,90 L 228,90" fill="none" stroke="#94a3b8" strokeWidth="2" opacity="0.35" markerEnd="url(#hp-p2-arrow)" />
      <text x="242" y="94" fontSize="11" fill="#94a3b8" opacity="0.8">他社</text>
    </svg>
  );
}

function BothFigure() {
  return (
    <svg viewBox="0 0 300 120" role="img" aria-label="同じ出発点から、他社と同じ道筋を離れて上に伸びる太い一本の道筋。自社にしかない勝ち方を確証を持って進むことを示す。" className="w-full h-auto">
      <defs>
        <marker id="hp-p3-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#e04102" />
        </marker>
      </defs>
      <path d="M 30,72 L 228,72" fill="none" stroke="#94a3b8" strokeWidth="2" opacity="0.3" />
      <path d="M 30,96 L 228,96" fill="none" stroke="#94a3b8" strokeWidth="2" opacity="0.3" />
      <circle cx="22" cy="72" r="5" fill="#e04102" />
      <path d="M 30,72 C 96,72 152,44 226,26" fill="none" stroke="#e04102" strokeWidth="3" markerEnd="url(#hp-p3-arrow)" />
      <text x="242" y="30" fontSize="11" fontWeight="700" fill="#e04102">自社</text>
    </svg>
  );
}

const WHY_TWO = [
  {
    Figure: GutOnlyFigure,
    title: '勘と経験だけでは',
    desc: '事実と仕組みの裏付けがないため、意思決定に確証が持てない。正しい方向に進んでいるのかが不明瞭なまま走ることになります。',
    accent: false,
  },
  {
    Figure: DataOnlyFigure,
    title: 'データだけでは',
    desc: 'その企業の意志や独自性の裏付けが持てない。どこの会社でも出せる、当たり障りのないコモディティな筋道になってしまいます。',
    accent: false,
  },
  {
    Figure: BothFigure,
    title: '2つが噛み合うと',
    desc: 'あなたの会社の意志と独自性に、事実と仕組みの裏付けがつく。進む方向を確かめながら、その会社にしかない勝ち方として回り続けます。',
    accent: true,
  },
];

function WhyTwoPillars() {
  return (
    <section className="py-24 bg-white">
      <div className="container-inner">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <span className="section-label">なぜ2本柱なのか</span>
          <h2 className="section-title">片方だけでは、エンジンにならない。</h2>
          <p className="section-sub mt-3">
            「データ」と「勘と経験」は、それぞれ単独では本領を発揮しません。互いを補い合って、はじめて成長のエンジンになります。
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {WHY_TWO.map((w) => (
            <div
              key={w.title}
              className={`rounded-2xl border overflow-hidden flex flex-col ${
                w.accent ? 'border-brand-orange/40 bg-orange-50/40' : 'border-slate-200 bg-white'
              }`}
            >
              <div className={`h-1 ${w.accent ? 'bg-brand-orange' : 'bg-slate-300'}`} />
              <div className="p-6">
                <div className="mb-4">
                  <w.Figure />
                </div>
                <h3 className={`font-black text-lg mb-2 ${w.accent ? 'text-brand-orange' : 'text-brand-navy'}`}>
                  {w.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 循環 ──────────────────────────────────────────────────
const CYCLE = [
  {
    from: '経営コンサルティング',
    to: 'データ活用',
    desc: '経営コンサルで決めたことを、データ活用の仕組みで社内に残す。',
  },
  {
    from: 'データ活用',
    to: '経営コンサルティング',
    desc: 'たまったデータが、次の経営判断の根拠になる。',
  },
  {
    from: '現場の知見',
    to: '新しい型',
    desc: 'コンサルの現場で生まれた知見を型にして、データ活用の商品にする。',
  },
];

function Cycle() {
  return (
    <section className="py-20 bg-brand-bg">
      <div className="container-inner">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <span className="section-label">2本柱の関係</span>
          <h2 className="section-title">片方の成果が、もう一方の入口になる。</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {CYCLE.map((c) => (
            <div key={c.desc} className="card">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-orange mb-3 flex-wrap">
                <span>{c.from}</span>
                <ArrowRight size={14} />
                <span>{c.to}</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 柱①：経営コンサルティング ──────────────────────────────
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

function ConsultingPillar() {
  return (
    <section className="py-20 bg-white">
      <div className="container-inner">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <span className="section-label">柱① 経営コンサルティング</span>
          <h2 className="section-title">強い会社を、より強く。</h2>
          <p className="section-sub mt-3">
            立て直しや再生ではなく、伸びている会社の次の成長を加速させることに力を発揮します。
            テーマと期間を決める<strong className="text-brand-navy font-black">プロジェクト型</strong>と、
            継続して経営判断を支える<strong className="text-brand-navy font-black">顧問型</strong>で関わります。
          </p>
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

// ── 柱②：データ活用 ───────────────────────────────────────
const SERVICES = [
  {
    slug: 'inside-sales',
    name: 'インサイドセールス内製化',
    source: '眠っている休眠顧客',
    tagline: '休眠顧客を商談機会に変える',
    description:
      '眠っている既存顧客を確実な商談へ。月額6万円〜の圧倒的ローコストで、パートスタッフが成果を出す持続可能なIS組織を社内に完全内製化します。',
    logo: null as string | null,
  },
  {
    slug: 'kachikata',
    name: 'カチカタ',
    source: 'トップセールスの行動',
    tagline: 'トップセールスの勝ち方を組織の型に',
    description:
      'トップセールスの行動データを解析し、「なぜ売れたのか」を組織の共有知に変換。誰もが再現できる営業の型で、属人依存から脱却します。',
    logo: '/kachikata-logo.png' as string | null,
  },
  {
    slug: 'sheetziv',
    name: 'SheetViz',
    source: '営業の日々の活動',
    tagline: '営業データをリアルタイムで可視化',
    description:
      'Google SheetsとAppSheetを使った、導入コストゼロの営業支援CRM。フィールド・インサイド・管理職の3役割に最適化し、データを自社資産に変えます。',
    logo: '/sheetviz-logo.png' as string | null,
  },
  {
    slug: 'ai-chat-assistant',
    name: 'AIチャットアシスタント',
    source: 'サイトの訪問者',
    tagline: '見えない機会損失を商談機会へ',
    description:
      'Webサイトに眠る機会損失を確実な商談へ。AIが24時間訪問者の問い合わせに対応し、自然な会話でリードを獲得。初期費用50万円・月額5万円のフルマネージド。',
    logo: '/ai_chat_assistant-logo.png' as string | null,
  },
];

function DataPillar() {
  return (
    <section className="py-20 bg-brand-bg">
      <div className="container-inner">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <span className="section-label">柱② データ活用</span>
          <h2 className="section-title">
            現場をデータに変え、<br className="hidden md:block" />
            型とAIで回し続ける。
          </h2>
          <p className="section-sub mt-3">
            現場に眠っているものをデータに変え、売上につなげる仕組みを「型」として渡します。
            掘り起こし → 型化 → データ蓄積 → AI自動化。一気通貫で支援します。
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
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
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="text-xs font-bold text-brand-orange bg-orange-50 rounded-full px-2.5 py-0.5">
                  {s.source}
                </span>
                <span className="text-xs text-slate-400">をデータに変える</span>
              </div>
              <div className="text-xs text-slate-500 font-semibold mb-2">{s.tagline}</div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">{s.description}</p>
              <div className="flex items-center gap-1 text-brand-orange text-sm font-bold group-hover:gap-2 transition-all mt-auto">
                詳しく見る <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
        <p className="text-slate-500 text-sm leading-relaxed text-center max-w-2xl mx-auto mt-8">
          将来のAI・デジタルの仕組みも、この柱に入ります。AIは別の事業ではなく、データを活かすエンジンです。
        </p>
      </div>
    </section>
  );
}

// ── 成果 ──────────────────────────────────────────────────
const OUTCOMES = [
  {
    Icon: TrendingUp,
    label: '売上が上がる',
    desc: '休眠顧客の掘り起こし、トップセールスの勝ち方の型化、サイトからのリード獲得。どこで勝つかを決める戦略と、それを回す仕組みの両方で押し上げます。',
  },
  {
    Icon: BadgePercent,
    label: 'コストが下がる',
    desc: 'パートで回る営業の仕組み、AIによる定型業務の自動化、新人の早期戦力化。経費を削るのではなく、売上をつくるためのコストそのものが下がり続ける状態をつくります。',
  },
  {
    Icon: Sparkles,
    label: '人間の価値が最大化される',
    desc: 'ルーティンをテクノロジーが担い、人は人にしかできない仕事に集中できる。だから仕事にやりがいが生まれ、人が定着し、会社への思いが強くなります。',
  },
];

function Outcomes() {
  return (
    <section className="py-24 bg-white">
      <div className="container-inner">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <span className="section-label">2本柱で実現すること</span>
          <h2 className="section-title">3つの成果を、同時に手に入れる。</h2>
          <p className="section-sub mt-3">
            3つがばらばらに起きるのではなく、同時に回ること。それが、一時的ではない強さをつくります。
          </p>
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

        <div className="mt-10 max-w-3xl mx-auto bg-brand-orange rounded-2xl px-8 py-10 text-center">
          <p className="text-white/80 text-xs font-bold tracking-widest uppercase mb-3">
            その先にあるもの
          </p>
          <p className="text-white text-2xl md:text-3xl font-black leading-snug mb-3 [word-break:keep-all]">
            企業の成長
          </p>
          <p className="text-white/90 text-sm leading-relaxed">
            強い会社が、一時的ではなく、続けて強くなる。
          </p>
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
      <Era />
      <TwoPillars />
      <WhyTwoPillars />
      <Cycle />
      <ConsultingPillar />
      <DataPillar />
      <Outcomes />
      <Manifesto />
      <CtaSection />
    </>
  );
}
