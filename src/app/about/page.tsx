import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '会社概要 | ZEST Inc.',
  description: 'ZESTのVision・Mission・Value、代表メッセージ、会社情報をご紹介します。',
};

const COMPANY_INFO = [
  { label: '会社名', value: 'ZEST Inc.（ゼスト）' },
  { label: '代表者', value: '丹澤 俊平（Shunpei Tanzawa）' },
  { label: 'メール', value: 'shunpei.tanzawa@zest2020.com' },
  { label: '設立', value: '2020年' },
  { label: '事業内容', value: '営業支援プラットフォーム開発・提供 / 営業組織コンサルティング' },
];

const VALUES = [
  {
    label: 'Vision',
    title: '中小企業の「人の力」を、データで解き放つ',
    desc: '日本経済を支える中小企業には、まだ引き出されていない営業力が眠っている。トップセールスの「属人的な勘」を行動データとして可視化し、組織全体で再現できる「型」に変えることで、すべての営業担当者が成果を出せる世界をつくる。',
    color: 'border-brand-orange',
    badge: 'text-brand-orange',
  },
  {
    label: 'Mission',
    title: '「隠れた価値」を、誰もが実行できる勝ちパターンへ',
    desc: '熟練の知見と行動データ科学を融合し、自社では気づけない営業の「センターピン」を特定する。それを組織的な型として定着させることで、個人の才能に依存しない、持続可能な営業組織の構築を支援する。',
    color: 'border-brand-navy',
    badge: 'text-brand-navy',
  },
  {
    label: 'Value',
    title: '精神論ゼロ。行動の言葉だけで定義する。',
    desc: '「頑張れ」「気合いを入れろ」ではなく、「いつ・誰に・何を・どのくらい」が明確な物理的行動として定義する。Yes/Noで判定できる行動だけをKFSとし、現場が迷わず動ける仕組みを渡す。',
    color: 'border-slate-300',
    badge: 'text-slate-500',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-bg border-b border-slate-200 py-20">
        <div className="container-inner max-w-3xl">
          <span className="section-label">会社概要</span>
          <h1 className="section-title">「勝ち」と「価値」を型化する</h1>
          <p className="section-sub">
            ZESTは、トップセールスが持つ暗黙知をデータとして可視化し、
            組織全体で再現できる「型」として定着させることで、
            営業組織の生産性向上を支援しています。
          </p>
        </div>
      </section>

      {/* Vision / Mission / Value */}
      <section className="py-20">
        <div className="container-inner max-w-3xl">
          <span className="section-label">Philosophy</span>
          <h2 className="section-title">私たちが大切にしていること</h2>
          <div className="space-y-5 mt-10">
            {VALUES.map((v) => (
              <div key={v.label} className={`card border-l-4 ${v.color}`}>
                <div className={`text-xs font-black uppercase tracking-widest mb-2 ${v.badge}`}>{v.label}</div>
                <h3 className="font-black text-brand-navy text-xl mb-3">{v.title}</h3>
                <p className="text-slate-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 代表メッセージ */}
      <section className="bg-brand-bg py-20">
        <div className="container-inner max-w-3xl">
          <span className="section-label">Message</span>
          <h2 className="section-title">代表より</h2>
          <div className="card mt-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-40 shrink-0 text-center">
                <div className="w-28 h-28 rounded-full bg-slate-200 mx-auto mb-3 overflow-hidden flex items-center justify-center">
                  <span className="text-slate-400 text-xs">Photo</span>
                </div>
                <div className="font-black text-brand-navy">丹澤 俊平</div>
                <div className="text-xs text-slate-500 mt-1">代表取締役社長 / CEO</div>
              </div>
              <div className="flex-1 space-y-5 text-slate-700 leading-8">
                <p className="font-bold text-brand-navy text-lg leading-snug">
                  中小企業の挑戦をデータで後押しし、<br />日本経済をより豊かにする。
                </p>
                <p>
                  私は、日本経済はまだまだポテンシャルを秘めていると思っています。
                  その鍵を握るのは、中小企業の現場に眠る「人の力」です。
                  データは、その力を引き出すための最も強力なツールです。
                </p>
                <p>
                  私自身、営業・マーケティングの現場からキャリアをスタートし、
                  その後アナリティクスエンジニアとしてデータの専門領域へ。
                  この両軸を歩む中で、多くの中小企業の営業組織を支援してきました。
                </p>
                <p>
                  その経験の中で、あることに気づきました。<br />
                  どの組織にも必ず、成果を出し続けるトップセールスがいる。
                  しかし彼らが「なぜ売れているのか」を言語化できる組織は、ほとんど存在しない。
                  そしてそのトップが抜けた瞬間、組織の成果は崩れ落ちる——。
                </p>
                <p>
                  これは才能の問題ではありません。<strong className="text-brand-navy">「型化」の問題です。</strong>
                </p>
                <p>
                  多くのクライアント企業のデータを深く分析し続ける中で、私たちはあることを確信しました。
                  熟練営業の「属人的な勘」の裏には、必ず再現可能な行動パターンがある。
                  それは表面的な数字では見えない「隠れた価値」ですが、
                  行動データとして可視化すれば、誰もが実行できる勝ちパターンへと変換できる。
                </p>
                <p>
                  この確信から生まれたのが、<strong className="text-brand-navy">カチカタ</strong>です。
                  「熟練の知見」と「行動データ科学」を融合させ、
                  組織のセンターピン——KFS（Key Factor for Success）——を特定するサービスです。
                  精神論ゼロ。行動の言葉だけで定義された、誰もが実践できる営業の型を、現場に渡す。
                </p>
                <p>
                  データを「経営の力」として活用することで、
                  地域経済や社会全体がさらに豊かになると信じています。
                  ZESTは、営業組織の隠れた可能性を引き出し、
                  中小企業が新しい一歩を踏み出せるよう、これからも寄り添い続けます。
                </p>
                <p className="text-sm text-slate-500 pt-2">
                  代表取締役社長 / CEO<br />
                  <span className="text-brand-navy font-bold text-base">丹澤 俊平</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 会社情報テーブル */}
      <section className="py-20">
        <div className="container-inner max-w-3xl">
          <span className="section-label">Company</span>
          <h2 className="section-title">基本情報</h2>
          <div className="card mt-8">
            <dl className="divide-y divide-slate-100">
              {COMPANY_INFO.map((item) => (
                <div key={item.label} className="flex flex-col md:flex-row py-4 gap-1 md:gap-6">
                  <dt className="text-sm font-bold text-slate-500 md:w-28 shrink-0">{item.label}</dt>
                  <dd className="text-sm text-slate-800">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="text-center mt-12">
            <Link href="/contact" className="btn-primary">
              お問い合わせ・無料相談
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
