import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: '会社概要',
  description: 'ZESTのVision・Mission・Value、代表メッセージ、会社情報をご紹介します。',
};

const COMPANY_INFO = [
  { label: '会社名', value: '株式会社ZEST（ゼスト）' },
  { label: '代表者', value: '丹澤 俊平（Shunpei Tanzawa）' },
  { label: '設立', value: '2020年8月' },
  { label: '資本金', value: '15,000,000円' },
  { label: '所在地', value: '〒107-0061 東京都港区北青山3-6-7' },
  { label: '事業内容', value: '経営コンサルティング事業 / データ活用事業（カチカタ・SheetViz・インサイドセールス内製化・AIチャットアシスタント）' },
  { label: 'メンバー', value: '20名（業務委託・アドバイザー含む）' },
];

const VMV = [
  {
    label: 'Mission',
    title: '人間にしかできないことに、人間が集中できる世界をつくる',
    desc: '中小企業の現場には、人にしか出せない価値がある。経営の判断、新しい工夫、相手との関係づくり。しかしその時間の多くが、記録・集計・探しものに奪われている。勘と経験に事実の裏付けを与え、繰り返しの作業は仕組みとAIが引き受ける。そうして人が人にしかできない仕事に集中できる状態を、一社ずつつくっていく。',
    border: 'border-brand-orange',
    labelColor: 'text-brand-orange',
  },
  {
    label: 'Vision',
    title: '中小企業の知恵が、いちばん強い武器になる世の中へ',
    desc: '経済を動かしているのは、中小企業の現場で日々積み重ねられてきた判断と工夫だ。けれどそれは誰かの頭の中にあるかぎり、その人の才能のままで終わり、会社の力にはならない。工夫が形になり、受け継がれ、次の挑戦の元手になる。規模でもブランドでもなく、自分たちの勝ち方を知っていることが強さになる。そんな会社が増えていく先に、世の中の次の成長がある。',
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
        <div className="container-inner max-w-3xl" data-reveal>
          <span className="section-label">会社概要</span>
          <h1 className="section-title">「勝ち」と「価値」を、組織の力に変える</h1>
          <p className="section-sub">
            ZESTは、勘と経験を担う<strong className="text-brand-navy">経営コンサルティング</strong>と、
            データを担う<strong className="text-brand-navy">データ活用</strong>の2本柱で、
            中小企業の<strong className="text-brand-navy">稼ぐ力そのもの</strong>をつくる会社です。
            経営判断の両輪を一社ごとに結び直し、売上・コスト・人材の3つを同時に動かします。
          </p>
        </div>
      </section>

      {/* Vision / Mission / Value */}
      <section className="py-20">
        <div className="container-inner max-w-3xl" data-reveal>
          <span className="section-label">Philosophy</span>
          <h2 className="section-title">私たちが大切にしていること</h2>
          <div className="space-y-5 mt-10">
            {VMV.map((v, i) => (
              <div
                key={v.label}
                data-reveal
                style={{ ['--reveal-delay']: `${i * 120}ms` } as CSSProperties}
                className={`card border-l-4 ${v.border}`}
              >
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
        <div className="container-inner max-w-3xl" data-reveal>
          <span className="section-label">Message</span>
          <h2 className="section-title">代表メッセージ</h2>
          <div className="card mt-8" data-reveal>
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
                  中小企業の現場にある強さを、<br />組織の力に変える。
                </p>
                <p>
                  私は、中小企業にはまだ大きな伸びしろがあると思っています。
                  その源泉は、現場で積み重ねられてきた判断と工夫です。
                  新しい設備や大きな投資の前に、すでに社内にある強さを使い切れていない会社が、あまりにも多い。
                </p>
                <p>
                  私自身、営業・マーケティングの現場からキャリアをスタートし、
                  その後アナリティクスエンジニアとしてデータの専門領域へ。
                  この両軸を歩む中で、多くの中小企業の現場を支援してきました。
                </p>
                <p>
                  その経験の中で、あることに気づきました。
                  どの組織にも必ず、成果を出し続ける人がいる。
                  しかし彼らが「なぜ成果が出ているのか」を言語化できる組織は、ほとんど存在しない。
                  そしてその人が抜けた瞬間、組織の成果は崩れ落ちる——。
                </p>
                <p>
                  これは才能の問題ではありません。<strong className="text-brand-navy">「型化」の問題です。</strong>
                </p>
                <p>
                  一方で、数字だけを見ていても答えは出ません。
                  データは何が起きたかを教えてくれますが、どこへ向かうかまでは決めてくれない。
                  経営の意志が抜け落ちたまま分析を重ねれば、どの会社にも当てはまる、
                  当たり障りのない打ち手にたどり着いてしまいます。
                </p>
                <p>
                  だからZESTは、2本柱で経営に入ります。
                  <strong className="text-brand-navy">経営コンサルティング</strong>で「何をやるか」を決め、
                  <strong className="text-brand-navy">データ活用</strong>でそれを回り続ける仕組みに変える。
                  <strong className="text-brand-navy">カチカタ</strong>で勝ち方の中心（KFS）を特定し、
                  <strong className="text-brand-navy">SheetViz</strong>でその型を日々の業務に実装し、
                  <strong className="text-brand-navy">インサイドセールス内製化</strong>で眠っている顧客を商談機会へ変え、
                  <strong className="text-brand-navy">AIチャットアシスタント</strong>がサイトの訪問者を取りこぼさない。
                </p>
                <p>
                  経験に裏付けを、数字に意志を。
                  この2つが噛み合ったとき、勝ち方は個人の才能から組織の力に変わります。
                  そうして自力で伸び続ける会社が増えることが、社会全体の豊かさにつながると信じています。
                  ZESTは、現場に眠る可能性を引き出し、
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
        <div className="container-inner max-w-3xl" data-reveal>
          <span className="section-label">Company</span>
          <h2 className="section-title">基本情報</h2>
          <div className="card mt-8" data-reveal>
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
