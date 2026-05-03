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

export default function AboutPage() {
  return (
    <section className="py-20">
      <div className="container-inner max-w-3xl">
        <div className="mb-12">
          <span className="section-label">会社概要</span>
          <h1 className="section-title">「勝ち」と「価値」を型化する</h1>
          <p className="section-sub">
            ZESTは、トップセールスが持つ暗黙知をデータとして可視化し、
            組織全体で再現できる「型」として定着させることで、
            営業組織の生産性向上を支援しています。
          </p>
        </div>

        {/* 会社情報テーブル */}
        <div className="card mb-10">
          <h2 className="font-black text-brand-navy mb-6 text-lg">基本情報</h2>
          <dl className="divide-y divide-slate-100">
            {COMPANY_INFO.map((item) => (
              <div key={item.label} className="flex flex-col md:flex-row py-3 gap-1 md:gap-6">
                <dt className="text-sm font-bold text-slate-500 md:w-28 shrink-0">{item.label}</dt>
                <dd className="text-sm text-slate-800">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ミッション */}
        <div className="bg-brand-navy rounded-2xl p-8 text-white mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Mission
          </div>
          <h2 className="text-2xl font-black mb-3 leading-tight">
            すべての営業担当者が、<br />
            <span className="text-brand-orange">再現性の高い成果</span>を出せる世界へ。
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            「あの人だから売れる」をなくし、チームの誰もが正しい行動で成果を出せる組織づくりを支援します。
          </p>
        </div>

        <div className="text-center">
          <Link href="/contact" className="btn-primary">
            お問い合わせ・無料相談
          </Link>
        </div>
      </div>
    </section>
  );
}
