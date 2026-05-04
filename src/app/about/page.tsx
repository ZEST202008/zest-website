import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: '会社概要 | ZEST Inc.',
  description: 'ZESTのVision・Mission・Value、代表メッセージ、会社情報をご紹介します。',
};

const COMPANY_INFO = [
  { label: '会社名', value: '株式会社ZEST（ゼスト）' },
  { label: '代表者', value: '丹澤 俊平（Shunpei Tanzawa）' },
  { label: '設立', value: '2020年8月' },
  { label: '資本金', value: '15,000,000円' },
  { label: '所在地', value: '〒107-0061 東京都港区北青山3-6-7' },
  { label: '事業内容', value: '型化プラットフォーム事業 / 成長支援プログラム事業' },
  { label: 'メンバー', value: '20名（業務委託・アドバイザー含む）' },
];

const VMV = [
  {
    label: 'Mission',
    title: '中小企業の「人の力」を、データで解き放つ',
    desc: '日本経済を支える中小企業には、まだ引き出されていない営業力が眠っている。トップセールスの「属人的な勘」を行動データとして可視化し、組織全体で再現できる「型」に変えることで、すべての営業担当者が成果を出せる世界をつくる。',
    border: 'border-brand-orange',
    labelColor: 'text-brand-orange',
  },
  {
    label: 'Vision',
    title: '「隠れた価値」を、誰もが実行できる勝ちパターンへ',
    desc: '熟練の知見と行動データ科学を融合し、自社では気づけない営業の「センターピン」を特定する。それを組織的な型として定着させることで、個人の才能に依存しない、持続可能な営業組織の構築を支援する。',
    border: 'border-brand-navy',
    labelColor: 'text-brand-navy',
  },
  {
    label: 'Value',
    title: '価値観と行動指針',
    desc: (
      <div className="space-y-4">
        {[
          { num: '01', title: '本質的かつ継続的なコミュニケーション', desc: '社内外問わず、本質的で継続的なコミュニケーションを実践しよう。お客様にも働く仲間にも信頼されることで、深く長期的な関係性が生まれ、いずれ自分への糧になる。' },
          { num: '02', title: '完璧より完遂', desc: '完璧を求めて道半ばで終わるより、完遂して改善を繰り返そう。完遂は少なくとも、掲げた目標に向けた前進を保証し、進歩と成長の機会を与えてくれる。' },
          { num: '03', title: '凡事徹底、迅速実行', desc: '当たり前を当たり前にこなし、今できる時に実行してしまおう。些細なことの継続的な積み重ねが、近い将来周囲との天と地の差になる。何よりも他者からの信頼に繋がる。' },
          { num: '04', title: 'トライ→分析→仕組み化→展開', desc: '大きな成果も一度きりでは心許ない。それを徹底的に分析し、仕組み化して組織に展開することで、継続的かつ何倍もの大きな成果に成長させよう。' },
          { num: '05', title: '創造的組み合わせ+α', desc: '0から1を創らずともイノベーションは起こせる。常日頃から周囲に思考のアンテナを張り巡らせ、既にあるもの同士の組み合わせに、少しのアイデアを付け足そう。' },
        ].map((item) => (
          <div key={item.num} className="flex gap-3">
            <span className="text-slate-400 font-black text-xs w-5 shrink-0 pt-0.5">{item.num}</span>
            <div>
              <div className="font-bold text-brand-navy text-sm mb-1">{item.title}</div>
              <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    ),
    border: 'border-slate-300',
    labelColor: 'text-slate-500',
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
            {VMV.map((v) => (
              <div key={v.label} className={`card border-l-4 ${v.border}`}>
                <div className="mb-3">
                  <span className={`text-xs font-black uppercase tracking-widest ${v.labelColor}`}>
                    {v.label}
                  </span>
                </div>
                <h3 className="font-black text-brand-navy text-xl mb-3">{v.title}</h3>
                <div className="text-slate-600 leading-relaxed">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 代表メッセージ */}
      <section className="bg-brand-bg py-20">
        <div className="container-inner max-w-3xl">
          <span className="section-label">Message</span>
          <h2 className="section-title">代表メッセージ</h2>
          <div className="card mt-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-40 shrink-0 text-center">
                <div className="w-28 h-28 rounded-full mx-auto mb-3 overflow-hidden bg-slate-100">
                  <Image
                    src="/profile_shunpei.avif"
                    alt="丹澤 俊平"
                    width={112}
                    height={112}
                    className="w-full h-full object-cover"
                  />
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
                  その経験の中で、あることに気づきました。
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
                <p className="text-sm text-slate-500 pt-2 border-t border-slate-100">
                  代表取締役社長 / CEO<br />
                  <span className="text-brand-navy font-black text-base">丹澤 俊平</span>
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
