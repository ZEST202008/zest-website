import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'お問い合わせ・無料相談',
  description: '営業組織の型化・データ活用についての無料相談を受け付けています。まずはお気軽にご連絡ください。',
};

export default function ContactPage() {
  return (
    <section className="py-20">
      <div className="container-inner max-w-2xl">
        <div className="text-center mb-10">
          <span className="section-label">お問い合わせ</span>
          <h1 className="section-title">まずは話すだけで大丈夫です。</h1>
          <p className="section-sub">
            「何から始めればよいかわからない」という段階からお気軽にご相談ください。<br />
            現状のCRM・データ体制は問いません。
          </p>
        </div>

        {/* Google Form embed */}
        <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSevX1pLmU3wEk_x1JTu00AjFVeIcCJIRxn3D5ZX9s-_O3e3vw/viewform?embedded=true"
            width="100%"
            height="1112"
            frameBorder="0"
            style={{ display: 'block' }}
          >
            読み込んでいます…
          </iframe>
        </div>
      </div>
    </section>
  );
}
