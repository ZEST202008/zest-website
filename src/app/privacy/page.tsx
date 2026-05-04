import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | 株式会社ZEST',
  description: '株式会社ZESTのプライバシーポリシーです。',
};

export default function PrivacyPage() {
  return (
    <section className="py-20">
      <div className="container-inner max-w-3xl">
        <h1 className="text-3xl font-black text-brand-navy mb-2">プライバシーポリシー</h1>
        <p className="text-sm text-slate-500 mb-12">制定日：2020年8月　最終改定日：2026年5月</p>

        <div className="space-y-10 text-slate-700 leading-8">

          <div>
            <h2 className="text-lg font-black text-brand-navy mb-3">第1条（基本方針）</h2>
            <p>
              株式会社ZEST（以下「当社」）は、お客様の個人情報を適切に保護することを社会的責務と認識し、
              個人情報の保護に関する法律（個人情報保護法）およびその他関連法令を遵守するとともに、
              本プライバシーポリシーに従い個人情報を適切に取り扱います。
            </p>
          </div>

          <div>
            <h2 className="text-lg font-black text-brand-navy mb-3">第2条（取得する個人情報）</h2>
            <p>当社は、以下の情報を取得する場合があります。</p>
            <ul className="list-disc pl-6 mt-3 space-y-1 text-sm">
              <li>氏名・会社名・役職</li>
              <li>メールアドレス・電話番号</li>
              <li>お問い合わせ内容</li>
              <li>当社サービスのご利用に伴い生じる情報（アクセスログ、Cookie情報等）</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-black text-brand-navy mb-3">第3条（利用目的）</h2>
            <p>取得した個人情報は、以下の目的のためにのみ利用します。</p>
            <ul className="list-disc pl-6 mt-3 space-y-1 text-sm">
              <li>お問い合わせ・ご相談への回答</li>
              <li>当社サービスの提供・運営</li>
              <li>サービスに関する情報のご案内（メールマガジン等）</li>
              <li>サービスの改善・新機能開発のための分析</li>
              <li>法令に基づく対応</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-black text-brand-navy mb-3">第4条（第三者提供）</h2>
            <p>
              当社は、以下の場合を除き、お客様の同意なく個人情報を第三者に提供しません。
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1 text-sm">
              <li>法令に基づく場合</li>
              <li>人の生命・身体・財産の保護のために必要で、お客様の同意取得が困難な場合</li>
              <li>公衆衛生の向上または児童の健全育成のために特に必要で、同意取得が困難な場合</li>
              <li>国の機関等が法令の定める事務を遂行することに協力する必要がある場合</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-black text-brand-navy mb-3">第5条（委託）</h2>
            <p>
              当社は、利用目的の達成に必要な範囲で、個人情報の取り扱いを外部に委託することがあります。
              その際は、委託先との間で適切な契約を締結し、適切な監督を行います。
            </p>
          </div>

          <div>
            <h2 className="text-lg font-black text-brand-navy mb-3">第6条（Cookie・アクセス解析）</h2>
            <p>
              当社ウェブサイトでは、サービスの利便性向上・利用状況把握のためCookieおよびアクセス解析ツール（Google Analytics等）を使用することがあります。
              これらのツールはCookieを使用してお客様の情報を収集しますが、個人を特定するものではありません。
              ブラウザの設定によりCookieを無効にすることができますが、一部の機能が利用できなくなる場合があります。
            </p>
          </div>

          <div>
            <h2 className="text-lg font-black text-brand-navy mb-3">第7条（開示・訂正・削除）</h2>
            <p>
              お客様は、当社が保有するご自身の個人情報について、開示・訂正・削除・利用停止を請求することができます。
              請求の際は下記お問い合わせ先までご連絡ください。本人確認の上、合理的な期間内に対応いたします。
            </p>
          </div>

          <div>
            <h2 className="text-lg font-black text-brand-navy mb-3">第8条（安全管理措置）</h2>
            <p>
              当社は、個人情報の漏えい・滅失・毀損の防止のため、適切な安全管理措置を講じます。
              また、個人情報を取り扱う従業員に対して必要な教育・監督を行います。
            </p>
          </div>

          <div>
            <h2 className="text-lg font-black text-brand-navy mb-3">第9条（本ポリシーの変更）</h2>
            <p>
              当社は、必要に応じて本ポリシーを変更することがあります。
              変更後のポリシーは当ウェブサイト上に掲示した時点から効力を生じるものとします。
            </p>
          </div>

          <div>
            <h2 className="text-lg font-black text-brand-navy mb-3">第10条（お問い合わせ）</h2>
            <p>個人情報の取り扱いに関するお問い合わせは、以下までご連絡ください。</p>
            <div className="mt-3 text-sm space-y-1">
              <p><span className="font-bold">会社名</span>：株式会社ZEST</p>
              <p><span className="font-bold">所在地</span>：〒107-0061 東京都港区北青山3-6-7</p>
              <p><span className="font-bold">お問い合わせ</span>：<a href="/contact" className="text-brand-orange hover:underline">お問い合わせフォーム</a></p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
