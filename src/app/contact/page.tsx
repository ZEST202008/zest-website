import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock, MessageCircle, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'お問い合わせ・無料相談',
  description: '営業組織の型化・データ活用についての無料相談を受け付けています。まずはお気軽にご連絡ください。',
};

const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSevX1pLmU3wEk_x1JTu00AjFVeIcCJIRxn3D5ZX9s-_O3e3vw/viewform';

const POINTS = [
  { icon: Clock, text: '所要時間：約3分' },
  { icon: MessageCircle, text: '返信は1営業日以内' },
  { icon: CheckCircle, text: '相談・見積もり完全無料' },
];

export default function ContactPage() {
  return (
    <section className="py-20">
      <div className="container-inner max-w-2xl">
        <div className="text-center mb-12">
          <span className="section-label">お問い合わせ</span>
          <h1 className="section-title">まずは話すだけで大丈夫です。</h1>
          <p className="section-sub">
            「何から始めればよいかわからない」という段階からお気軽にご相談ください。
            現状のCRM・データ体制は問いません。
          </p>
        </div>

        {/* CTA Card */}
        <div className="card text-center py-12 px-8">
          <div className="flex justify-center gap-8 mb-10 flex-wrap">
            {POINTS.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-slate-600 text-sm">
                <Icon size={18} className="text-brand-orange shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <Link
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-lg px-10 py-4"
          >
            <ArrowRight size={20} />
            お問い合わせフォームへ
          </Link>

          <p className="text-xs text-slate-400 mt-6">
            ※ 別タブでGoogleフォームが開きます
          </p>
        </div>

        {/* FAQ-style supplement */}
        <div className="mt-12 space-y-4">
          {[
            {
              q: 'どんな段階でも相談できますか？',
              a: 'はい。「まだ課題が整理できていない」「何から始めたらいいかわからない」という段階からお気軽にどうぞ。ヒアリングを通じて一緒に整理します。',
            },
            {
              q: '費用はかかりますか？',
              a: '初回のご相談・ヒアリング・お見積もりはすべて無料です。',
            },
            {
              q: '対応エリアはありますか？',
              a: 'オンライン対応のため全国どこでも対応可能です。',
            },
          ].map((item) => (
            <div key={item.q} className="card">
              <p className="font-bold text-brand-navy text-sm mb-2">{item.q}</p>
              <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
