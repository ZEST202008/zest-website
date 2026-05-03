import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '会社概要',
  description: 'ZEST Inc.は営業組織のデータ活用・型化を支援するサービスを提供しています。',
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
    title: '営業力の属人化をゼロにする',
    desc: '「あの人だから売れる」が当たり前の世界を変える。すべての営業担当者が、再現性の高い成果を出せる組織を日本中に広げていきます。',
    color: 'border-brand-orange',
    badge: 'text-brand-orange',
  },
  {
    label: 'Mission',
    title: '勝ちパターンを、組織の資産に変える',
    desc: 'トップセールスの暗黙知をデータとして可視化し、誰もが実践できる「型」として定着させる。個人の才能に依存しない、強い組織づくりを支援します。',
    color: 'border-brand-navy',
    badge: 'text-brand-navy',
  },
  {
    label: 'Value',
    title: '精神論ゼロ、行動の言葉で定義する',
    desc: '「頑張れ」「意識を高めろ」ではなく、「いつ・誰に・何を・どのくらい」が明確な物理的行動を定義する。Yes/Noで判定できることだけを、現場に渡します。',
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
                <div className="text-xs text-slate-500 mt-1">ZEST Inc. 代表</div>
              </div>
              <div className="flex-1">
                <p className="text-slate-700 leading-8 mb-5">
                  「なぜあの人だけが売れるのか」——この問いから、ZESTは生まれました。
                </p>
                <p className="text-slate-700 leading-8 mb-5">
                  営業の現場では今も、「気合いを入れろ」「件数を増やせ」という言葉が飛び交っています。
                  しかし、本当に成果を出しているトップセールスは、精神論ではなく、
                  明確な「行動の型」を持っています。
                </p>
                <p className="text-slate-700 leading-8 mb-5">
                  その型をデータで可視化し、チーム全員が再現できる形にすること。
                  それが私たちのやっていることであり、これからもやり続けることです。
                </p>
                <p className="text-slate-700 leading-8">
                  「あの人だから売れる」をなくす日まで、私たちは走り続けます。
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
