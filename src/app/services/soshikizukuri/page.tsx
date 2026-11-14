import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Compass, Users, Shield } from 'lucide-react';
import {
  ShudanToSoshikiFigure,
  SeikaCycleFigure,
  KouzouFigure,
  ManagementCycleFigure,
  InsightProcessFigure,
} from '@/components/graphics/soshikizukuri-art';

export const metadata: Metadata = {
  title: '組織づくり支援｜集団から、組織へ',
  description:
    '成果が出るから、仕事は楽しくなる。型で成果を出し、成果でやる気を生む組織づくり。道しるべ・人とチーム・規律と仕組みの3つで、自走する組織をつくります。入口は30万円（税別）のインサイトレポート。',
  openGraph: {
    images: [{ url: '/og/soshikizukuri.png', width: 1200, height: 630, alt: '組織づくり支援｜集団から、組織へ' }],
  },
  twitter: {
    images: ['/og/soshikizukuri.png'],
  },
};

// ── ② 根本の考え方：ブロック1〜3 ──
const BELIEFS = [
  {
    title: '人は、やるべきことと、その意味が分かれば、能力を発揮する。',
    body: '人の能力は、やるべきことが明確になり、なぜそれをやるのかが分かり、そこに共感したときに発揮されます。戦略は、人が成果を発揮するための道しるべです。中期経営計画は、銀行に出すためではなく、社員が日々の判断と行動の拠り所にするためにつくります。',
  },
  {
    title: '最も恐ろしいのは、マネジメントの属人化。',
    body: 'マネジメントとは何かと問われて、明確に答えられるマネージャーは多くありません。基準がなければ、振り返ることもできません。上司によってやり方が違えば、部下は迷い、育ち方も上司次第になります。1on1のような関わりも大切ですが、基本の型がなければ、やり方が属人的になるのは避けられません。強い社長の会社ほど、「社長＝経営」から、「考え・決め・動く」経営チームへの転換が次の成長の鍵になります。',
  },
  {
    title: '型と評価があるから、人は伸び伸びと伸びる。',
    body: '組織運営で最も重要なのは、型化と評価制度です。型は「何を、どうやるか」の基準、評価は「その基準に照らして振り返り、成長を認める仕組み」です。型は人を縛るものではありません。基準があるから迷わず、振り返れて、伸びていきます。',
  },
];

// ── ② ブロック5：集団と組織の対比 ──
const SHUDAN_SOSHIKI = [
  { axis: '目的', shudan: 'ない、または社長の頭の中だけにある', soshiki: '明確で、全員に共有されている' },
  { axis: '規律', shudan: 'ない。やり方は人それぞれ', soshiki: 'レギュレーションがはっきりしている' },
  { axis: '結果', shudan: '個人の頑張りに頼る', soshiki: '再現性の高い型を設定し、それを反復するから、成果が出る' },
];

// ── ③ 組織づくりの構造 ──
const KOUZOU = [
  {
    Icon: Compass,
    area: '道しるべ（戦略・戦術）',
    line: '人が迷わず動ける方向を示す',
    company: '社長の頭の中にある将来像が、社員に伝わっていない会社',
  },
  {
    Icon: Users,
    area: '人とチーム（中心：評価）',
    line: '人が生き生きと働き、育つ',
    company: '社長が強く、幹部が指示待ちになっている会社',
  },
  {
    Icon: Shield,
    area: '規律と仕組み（中心：型）',
    line: '決めたことをやり切る',
    company: '計画は立てるが、やり切る前に立ち消えになる会社',
  },
];

// ── ④ マネジメントの4つの箱 ──
const MANAGEMENT = [
  {
    num: '01',
    name: '計画と調整',
    heading: '道しるべを示す',
    body: '道しるべを持ち場の目標と段取りに落とし、「なぜ」を全員と共有する。部署や資源の食い違いを解く',
  },
  {
    num: '02',
    name: '組織化と統率',
    heading: '人とチームを率いる',
    body: 'チームをつくり、人の前に立って、方向への共感と役割をそろえる',
  },
  {
    num: '03',
    name: '委任と検証',
    heading: '規律でやり切る',
    body: '「誰が・何を・いつまでに・どのくらい」の順で任せ、その基準でやり切ったかを確かめる。届かないときは、どこで止まったかをマネージャー自らが察知し、最後の一歩まで自ら成果を取りにいく',
    emphasis: ['誰が', '何を', 'いつまでに', 'どのくらい'],
  },
  {
    num: '04',
    name: '承認と型化',
    heading: '成果を返し、型にする',
    body: '出た成果を、基準に照らして本人に気づかせる。届かなかった理由も含め、うまくいったやり方を、誰でも再現できる型にする',
  },
];

// ── ⑤ 得られる成果 ──
const RESULTS = [
  {
    group: '規律と仕組みから生まれる成果',
    items: [
      { title: '決めたことを、やり切る会社になる。', body: '計画が立ち消えにならず、決めた基準まで結果を出し切ります。' },
      { title: 'うまくいったやり方が、型として残る。', body: '一度の成功で終わらず、やり方が磨かれ、誰でも再現できる仕組みになります。' },
    ],
  },
  {
    group: '人とチームから生まれる成果',
    items: [
      { title: '部署を越えて、チームで動けるようになる。', body: '同じ方向に共感した一人ひとりの頑張りが、組織としての力に変わります。' },
      { title: '人が育ち、次を任せられる人が生まれる。', body: '社長や一部の幹部に頼らず、任せられる人が育っていきます。' },
    ],
  },
];

// ── ⑧ 支援実績 ──
const INDUSTRIES = ['食品製造', '流通', '建設', '住宅', '人材サービス', 'ビルメンテナンス'];

const TRACK_RECORD = [
  {
    area: '道しるべ',
    items: [
      '中期経営計画の策定（ビジョン・グランドデザインマップ・5か年売上計画・アクションプラン）',
      '経営者の構想の整理（インサイトレポート）',
      '事業戦略・新規事業の構想整理',
      '事業ポートフォリオの見直しと組織再編',
      'M&A後の統合計画の検証',
    ],
  },
  {
    area: '人とチーム',
    items: [
      '経営幹部研修・マネジメント研修（テキストとワークシートを提供）',
      '経営基礎メソッドによる幹部教育',
      '次世代経営人材の育成',
      '評価制度の設計と見直し',
      'キャリアパスの整備',
      '採用戦略・採用ペルソナの設計',
      'ミッション・ドリブン型の組織づくり',
      '雇用形態を問わない戦力化の仕組みづくり（パート・アルバイト・契約社員を含む）',
    ],
  },
  {
    area: '規律と仕組み',
    items: [
      '中計実行会議の構築と運営（KPI・報告書・議事録のテンプレート）',
      '目標管理（MBO）の運用',
      '組織図の設計と運用（線引きで終わらせず、役割・責任・指示の流れを明確にする）',
      '職務分掌・役職定義の整備',
      '営業プロセスの標準化とセールスプレイブック',
      'インサイドセールスの立ち上げ（ガイドライン・トークスクリプト）',
      'マーケティングチームの組成と運用ガイド',
      '業務マニュアル・ナレッジ整備',
      'コミュニケーションフローの設計',
    ],
  },
];

export default function SoshikizukuriPage() {
  return (
    <>
      {/* ── ① 見出しとリード ── */}
      <section className="surface-grid bg-brand-bg border-b border-slate-200 py-20">
        <div className="container-inner" data-reveal>
          <span className="section-label">Service</span>
          <h1 className="text-4xl md:text-5xl font-black text-brand-navy leading-tight mb-4">
            成果が出るから、<br />
            <span className="text-brand-orange">仕事は楽しくなる。</span>
          </h1>
          <p className="text-xl text-brand-orange font-bold mb-8">
            型で成果を出し、成果でやる気を生む。強い会社を、より強くする組織づくりです。
          </p>
          <div className="max-w-3xl space-y-4 text-slate-600 leading-relaxed">
            <p>
              目指すのは、ミッションを全員で共有し、共感でつながり、一人ひとりが自らを律して、自走する組織です。
              人が生き生きと働き、成果を発揮し続ける組織です。
            </p>
            <p>
              そのために必要なのは、特別なやる気や、一部の人の頑張りに頼ることではありません。
              向かう方向に共感し、マネジメントの型に沿って動けば、誰もが成果を出せる。成果が出るから、人は次も動く。
            </p>
            <p>
              マネジメントとは何か。マネージャーに何が求められるのか。
              その答えが型として明確になっていて、どのマネージャーも同じ言葉で答えられる。
              属人性ではなく、<strong className="text-brand-navy">再現性のある型</strong>で成果を出し続ける組織。それが、ZESTの考えるあるべき組織です。
            </p>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed mt-6 max-w-3xl">
            あるべき組織を、戦略から一緒につくります。立て直しや再生ではなく、伸びている会社の次の成長を加速させることに力を発揮します。
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link href="/contact" className="btn-primary">
              <ArrowRight size={18} /> インサイトレポートについて相談する
            </Link>
          </div>
        </div>
      </section>

      {/* ── ② この柱の根本の考え方 ── */}
      <section className="py-20">
        <div className="container-inner max-w-4xl" data-reveal>
          <span className="section-label">考え方</span>
          <h2 className="section-title">なぜ、組織づくりなのか。</h2>
          <div className="space-y-6 mt-10">
            {BELIEFS.map((b) => (
              <div key={b.title} className="card" data-reveal>
                <h3 className="font-black text-brand-navy text-lg mb-3 leading-snug">{b.title}</h3>
                <p className="text-slate-600 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ブロック4：成果が、やる気を生む */}
        <div className="container-inner max-w-4xl mt-16" data-reveal>
          <h3 className="font-black text-brand-navy text-2xl mb-4 leading-snug">成果が、やる気を生む。</h3>
          <p className="text-slate-600 leading-relaxed">
            成果の出せる型を反復すれば、正社員かパート・アルバイトかといった雇用形態にかかわらず、新しく入った人も早く戦力になります。
            成果が出ると、仕事にやりがいが生まれ、モチベーションが上がります。
            そのうえで、一人ひとりが型に自分の創意工夫を盛り込む。良い工夫は、次の型に取り込まれていきます。
            やる気に頼って成果を待つのではなく、成果がやる気を生む。
            やる気を前提にせず、マネジメントの型に沿って動くことで、小さな成功体験が組織の中に生まれ続けます。
            その循環が、組織を活性化させます。
          </p>
          <SeikaCycleFigure />
        </div>

        {/* ブロック5：集団から、組織へ */}
        <div className="container-inner max-w-4xl mt-16" data-reveal>
          <h3 className="font-black text-brand-navy text-2xl mb-4 leading-snug">集団から、組織へ。</h3>
          <p className="text-slate-600 leading-relaxed">
            集団は、人の集まりです。組織は、目的と規律が明確で、それが全員に共有され、共感されているから、強みを発揮します。
          </p>
          <ShudanToSoshikiFigure />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="w-20 border-b border-slate-200 px-3 py-3 text-left text-xs font-bold text-slate-500" />
                  <th className="border-b border-slate-200 px-3 py-3 text-left text-xs font-bold text-slate-500">集団</th>
                  <th className="border-b-2 border-brand-orange px-3 py-3 text-left text-xs font-bold text-brand-orange">組織</th>
                </tr>
              </thead>
              <tbody>
                {SHUDAN_SOSHIKI.map((r) => (
                  <tr key={r.axis}>
                    <th className="border-b border-slate-100 px-3 py-4 text-left align-top font-bold text-brand-navy">{r.axis}</th>
                    <td className="border-b border-slate-100 px-3 py-4 align-top text-slate-500">{r.shudan}</td>
                    <td className="border-b border-slate-100 bg-orange-50/40 px-3 py-4 align-top font-semibold text-brand-navy">
                      {r.soshiki}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── ③ 組織づくりの構造 ── */}
      <section className="bg-brand-bg py-20">
        <div className="container-inner max-w-4xl" data-reveal>
          <span className="section-label">構造</span>
          <h2 className="section-title">道しるべ・人・規律の3つで、組織は動く。</h2>
          <p className="section-sub mt-3">
            方向を示し、人が育ち、決めたことをやり切る。この3つがそろうと、成果が出て、やる気が生まれ、一人ひとりが自らを律して動く組織になります。
          </p>
          <KouzouFigure />
          <div className="grid gap-4 md:grid-cols-3 mt-4">
            {KOUZOU.map((k, i) => (
              <div key={k.area} className="card" data-reveal style={{ ['--reveal-delay']: `${i * 110}ms` } as React.CSSProperties}>
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50">
                  <k.Icon size={18} className="text-brand-orange" />
                </div>
                <p className="font-black text-brand-navy mb-2">{k.area}</p>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">{k.line}</p>
                <p className="text-xs font-bold text-slate-400 mb-1">こんな会社に</p>
                <p className="text-sm text-slate-500 leading-relaxed">{k.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ④ ZESTのマネジメント観 ── */}
      <section className="py-20">
        <div className="container-inner max-w-4xl" data-reveal>
          <span className="section-label">マネジメント観</span>
          <h2 className="section-title">マネジメントは、属人性ではなく、再現性のある型である。</h2>
          <p className="text-lg font-bold text-brand-orange mt-3">型に沿った活動が、成果を生み続ける。</p>
          <p className="text-slate-600 leading-relaxed mt-6">
            この働きを、ZESTは<strong className="text-brand-navy">「成果創出機能」</strong>と呼びます。
            マネジメントは、部下の管理や指示出しではありません。組織として成果を最大化するための、仕組みづくりと環境整備を担う機能です。
            上司の腕や勘に頼る属人的なものではなく、誰が担っても同じように成果が出る、再現性のある型です。
            組織づくりの構造を、この型に沿った日々のマネジメントで動かします。
            ①から④の4つを一周するごとに、うまくいったやり方を型として残していきます。次の一周は、その型の上から始まります。
          </p>
          <ManagementCycleFigure />
          <p className="text-sm font-bold text-brand-navy mb-4">
            型の中身：道しるべを示し、人を率い、規律でやり切り、型にする。
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {MANAGEMENT.map((m, i) => (
              <div key={m.num} className="card" data-reveal style={{ ['--reveal-delay']: `${(i % 2) * 110}ms` } as React.CSSProperties}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-orange text-xs font-black text-white">
                    {m.num}
                  </span>
                  <span className="font-black text-brand-navy">{m.name}</span>
                </div>
                <p className="text-xs font-bold text-brand-orange mb-2">{m.heading}</p>
                {m.emphasis ? (
                  <>
                    <p className="mb-3 flex flex-wrap items-center gap-1.5 text-sm font-black text-brand-navy">
                      {m.emphasis.map((e, j) => (
                        <span key={e} className="flex items-center gap-1.5">
                          {j > 0 && <ArrowRight size={12} className="text-brand-orange" />}
                          <span className="rounded-md bg-orange-50 px-2 py-0.5">{e}</span>
                        </span>
                      ))}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed">{m.body}</p>
                  </>
                ) : (
                  <p className="text-sm text-slate-600 leading-relaxed">{m.body}</p>
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 space-y-3">
            <p className="text-sm text-slate-600 leading-relaxed">
              「なぜ」は、①計画と調整の中で、道しるべとして全員と共有します。任せ方が曖昧だと「やれた／やれなかった」が曖昧になり、仕事はやり切れません。
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              検証と承認は、任せたときに決めた「どのくらい」を物差しにしたフィードバックです。褒めることではなく、出た成果を、最初に合意した基準に照らして本人に気づかせることです。印象ではなく基準で返すから、言われた側も納得できます。
            </p>
          </div>
          <div className="card mt-8 border-l-4 border-brand-orange" data-reveal>
            <p className="text-slate-600 leading-relaxed">
              この型を実行するマネージャーに求められるスキルも、型にします。察知する、成果に気づかせる、最後の一歩まで自ら成果を取りにいく。
              個人の頑張りに頼らず、成果を出せるマネージャーを、再現性をもって育てます。
            </p>
          </div>
        </div>
      </section>

      {/* ── ⑤ ZESTのマネジメントで得られる成果 ── */}
      <section className="bg-brand-bg py-20">
        <div className="container-inner max-w-4xl" data-reveal>
          <span className="section-label">得られる成果</span>
          <h2 className="section-title">成果が出るから、仕事は楽しくなる。</h2>
          <p className="section-sub mt-3">
            マネジメントが成果創出機能として働くと、会社には次の変化が起きます。
            組織づくりの構造の2本の柱、規律と仕組み、人とチームのそれぞれから生まれる成果です。
          </p>
          <div className="grid gap-6 md:grid-cols-2 mt-10">
            {RESULTS.map((g, i) => (
              <div key={g.group} data-reveal style={{ ['--reveal-delay']: `${i * 130}ms` } as React.CSSProperties}>
                <p className="mb-4 text-xs font-bold tracking-wider text-brand-orange">{g.group}</p>
                <div className="space-y-4">
                  {g.items.map((item) => (
                    <div key={item.title} className="card">
                      <p className="font-black text-brand-navy mb-2 leading-snug">{item.title}</p>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-slate-600 leading-relaxed mt-10" data-reveal>
            そして、成果がやる気を生みます。やる気に頼って成果を待つのではなく、成果が次のやる気を生む。
            この循環が、伸びている会社の次の成長を加速させます。
          </p>
        </div>
      </section>

      {/* ── ⑥ 入口：インサイトレポート ── */}
      <section className="py-20">
        <div className="container-inner max-w-4xl" data-reveal>
          <span className="section-label">入口</span>
          <h2 className="section-title">社長の頭の中には、必ず構想がある。</h2>
          <p className="text-slate-600 leading-relaxed mt-6">
            その構想を、ZESTのヒアリング項目に沿って話していただき、テーマごとに壁打ちを重ね、社長自身の言葉で整理します。
            構想を整理するだけでなく、対話を通じて発展させる。それがインサイトレポートです。
            提案や見積もりは含まない、社長の考えを整理することだけに特化したサービスです。
          </p>
          <div className="card mt-8 border-2 border-brand-orange" data-reveal>
            <dl className="divide-y divide-slate-100 border-b border-slate-100 pb-4 mb-5">
              <div className="flex items-baseline justify-between gap-4 py-3 first:pt-0">
                <dt className="text-xs font-bold text-slate-500">インサイトレポート</dt>
                <dd className="text-3xl font-black text-brand-orange leading-none">
                  30<span className="text-lg">万円</span>
                  <span className="text-sm font-normal text-slate-500">（税別）</span>
                </dd>
              </div>
            </dl>
            <p className="font-bold text-brand-navy mb-3">進め方</p>
            <p className="text-sm text-slate-600 leading-relaxed">
              1回1時間ほどのヒアリングを2〜3回行い、その中でテーマごとに壁打ちを重ねます。
              ヒアリングを終えてから約1か月で、社長の言葉でまとめたドキュメントを提出します。
              そのドキュメントをもとに確認のミーティングを行い、内容を確定して納品します。
            </p>
            <InsightProcessFigure />
            <Link href="/contact" className="btn-primary">
              <ArrowRight size={18} /> インサイトレポートについて相談する
            </Link>
          </div>
        </div>
      </section>

      {/* ── ⑦ 担当するのは：統括パートナー ── */}
      <section className="bg-brand-bg py-20">
        <div className="container-inner max-w-4xl" data-reveal>
          <span className="section-label">担当するのは</span>
          <h2 className="section-title">社員ゼロから数百名まで、組織を自らつくってきた経営者が、直接担当します。</h2>
          <div className="card mt-8 space-y-4 text-slate-600 leading-relaxed" data-reveal>
            <p>20歳で最初の会社を創業し、経営歴は30年以上。4つの会社を創業し、業種の異なる事業やサービスを立ち上げてきました。</p>
            <p>
              自ら創業した会社では、社員ゼロ・売上ゼロから、10人、30人、50人、100人と、段階ごとに現れる組織の壁を越えながら、
              年商10億円規模、従業員数百名の組織をつくり上げました。部署や事業、サービスが増えるたびに、その役割に合ったチームを一から立ち上げてきました。
              目指してきたのは、一人ひとりが生き生きと働き、自らを律して動ける、自律した組織です。
            </p>
            <p>
              その成功も、それを失う大きな挫折も、経営者として経験しています。組織が伸びるときに何が効き、何が崩れる原因になるのか。
              その両方を知っていることが、ZESTの組織づくりの土台です。
            </p>
            <p>
              これまで、年商数億円〜100億円規模の会社の組織づくりを直接支援しています。
              インサイトレポートのヒアリングと壁打ちも、統括パートナー自身が行います。
            </p>
          </div>
        </div>
      </section>

      {/* ── ⑧ 支援実績 ── */}
      <section className="py-20">
        <div className="container-inner max-w-4xl" data-reveal>
          <span className="section-label">支援実績</span>
          <h2 className="section-title">これまでの支援実績</h2>
          <p className="section-sub mt-3">
            食品製造、流通、建設、住宅、人材サービス、ビルメンテナンスなど、年商数億円から100億円規模まで、
            さまざまな業種の組織づくりを支援してきました。
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {INDUSTRIES.map((t) => (
              <span key={t} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
                {t}
              </span>
            ))}
          </div>
          <p className="font-bold text-brand-navy mt-10 mb-4">これまでの支援内容</p>
          <div className="space-y-3">
            {TRACK_RECORD.map((g) => (
              <details key={g.area} className="card group" data-reveal>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="font-black text-brand-navy">{g.area}</span>
                  <span className="text-xs font-bold text-brand-orange">
                    <span className="group-open:hidden">開く</span>
                    <span className="hidden group-open:inline">閉じる</span>
                  </span>
                </summary>
                <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                  {g.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-slate-600 leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── ⑨ データ活用への橋渡し ── */}
      <section className="bg-brand-bg py-20">
        <div className="container-inner max-w-3xl" data-reveal>
          <span className="section-label">2本柱の関係</span>
          <h2 className="section-title">データで、型を磨き続ける。</h2>
          <p className="text-slate-600 leading-relaxed mt-6">
            組織づくりで設定した、成果を左右する重要な要因（KFS）は、ZESTが自ら持つデータ活用の仕組みで、常にデータに基づいて更新し続けます。
            必要に応じて、会社ごとにデータ基盤を一から設計します。
          </p>
          <Link href="/#data" className="btn-secondary mt-8">
            データ活用のサービスを見る
          </Link>
        </div>
      </section>

      {/* ── ⑩ 料金 ── */}
      <section className="py-20">
        <div className="container-inner max-w-3xl text-center" data-reveal>
          <span className="section-label">料金</span>
          <h2 className="section-title">組織づくりの支援の料金</h2>
          <p className="text-slate-600 leading-relaxed mt-6">
            インサイトレポートは30万円（税別）の固定料金です。その先の組織づくりの支援は、会社ごとに中身が異なるため、一社ごとにお見積もりします。
            支援の期間、関わる範囲、研修や会議体の回数をもとに、経営者の方と議論して決めます。
          </p>
          <div className="mt-10">
            <Link href="/contact" className="btn-primary text-base px-8 py-4">
              <ArrowRight size={18} /> インサイトレポートについて相談する
            </Link>
          </div>
          <p className="mt-4">
            <Link href="/contact" className="text-sm text-slate-500 underline underline-offset-4 hover:text-brand-orange">
              まずは無料で相談する
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
