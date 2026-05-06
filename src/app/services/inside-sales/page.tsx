import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight, Target, Clock, Archive, TrendingUp,
  CheckCircle, AlertTriangle, PhoneOff, Repeat, Package,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'インサイドセールス内製化プログラム | 株式会社ZEST',
  description: '眠っている既存休眠顧客を確実な商談機会へ。月額6万円〜の圧倒的ローコストで、持続可能なIS組織を90日で社内に完全内製化するプログラム。',
};

// ── データ定義 ────────────────────────────────────────

const DEFECTS = [
  {
    icon: <AlertTriangle size={20} className="text-red-400" />,
    title: 'アポ数管理の限界',
    desc: '「アポを○件取れ」のプレッシャーが、見込みのない顧客への無理なアプローチを生む。顧客の約7割が、自社を理解していない無作為な営業電話に不信感を抱いている。（HubSpot調査）',
  },
  {
    icon: <PhoneOff size={20} className="text-red-400" />,
    title: 'フルタイムによるメンタル崩壊',
    desc: '断られることが前提の業務をフルタイムで行うことは人間の精神構造に反し、離職を招きコストが流出する。IS導入企業の半数以上が「担当者の定着」に頭を抱えている。（スマートキャンプ調査）',
  },
  {
    icon: <Repeat size={20} className="text-red-400" />,
    title: '代行依存のブラックボックス',
    desc: '外部代行に高額な固定費を払っても、契約終了と同時にノウハウも人材もすべて失われる「永遠のレンタルモデル」。自社に何も資産が残らない。',
  },
];

const CONCEPTS = [
  {
    icon: <Target size={22} className="text-brand-orange" />,
    num: 'Concept 01',
    title: 'プロセスKPI — 行動のみを管理する',
    desc: 'アポ獲得数や「とにかく○件かけろ」という量の押し付けを完全に排除。評価するのは「ベストタイム架電・翌日準備・システム主導の追客・CRM完全入力」という型の反復のみ。正しいプロセスの先に、アポという成果は必然としてこぼれ落ちてくる。',
  },
  {
    icon: <Clock size={22} className="text-brand-orange" />,
    num: 'Concept 02',
    title: '週2〜3日・1日5時間の超高効率モデル',
    desc: 'フルタイムで精神をすり減らすのではなく、集中した短時間で最大の成果を出す。「週2〜3日・1日5時間・高時給」という条件が、能力は高いがフルタイムでは働けない優秀な潜在層（主婦層など）を独占的に獲得する戦略的な採用優位にもなる。',
  },
  {
    icon: <Archive size={22} className="text-brand-orange" />,
    num: 'Concept 03',
    title: '定期接触による「タイミングキャッチ」',
    desc: '多忙な外勤営業が追いきれない休眠顧客に、CRMと型化されたオペレーションで継続的なタッチポイントを構築。ニーズが再燃する絶好のタイミングを逃さず検知し、最も熱量の高い状態でフィールド営業へトスアップする「最強のレーダー」として機能する。',
  },
  {
    icon: <TrendingUp size={22} className="text-brand-orange" />,
    num: 'Concept 04',
    title: 'あえての「高時給設定」— プレミアムポジション化とロイヤリティの極大化',
    desc: '市場相場より明確に高い時給（例：1,500〜2,000円）を意図的に設定。「短時間・ストレスフリー・高時給」という条件が「この仕事は手放したくない」という強烈なロイヤリティを生み出し、離職率が限界まで下がる。さらに「決められたプロセスへの厳格な遵守」という経営にとって最高の見返りを得られる、極めて合理的な先行投資。',
  },
];

const PACKAGES = [
  {
    icon: <Package size={20} className="text-brand-orange" />,
    title: 'インサイドセールス・ガイドライン',
    label: '組織運営の憲法',
    desc: 'チーム内の業務フローだけでなく、フィールドセールスや他部門との連携条件（どんな案件をどうトスアップするか）までを明文化。IS部隊を孤島にせず、組織全体に分業戦略の意義を浸透させる「憲法」として機能する。',
  },
  {
    icon: <Package size={20} className="text-brand-orange" />,
    title: 'セールスプレイブック',
    label: '必勝の羅針盤（スクリプト内包）',
    desc: '「私たちの使命」というマインドセットから始まり、ターゲット理解・事前準備・実践スクリプトとFAQ・CRM入力ルールにわたり「確実にアポを獲るプロセス」を体系化した最強の営業バイブル。',
  },
  {
    icon: <Package size={20} className="text-brand-orange" />,
    title: 'インサイドセールス専用CRM（SheetViz）& 活用ガイド',
    label: '実行基盤',
    desc: 'プレイブックの「型」をシステム上で迷いなく実行し、「タイミングキャッチ」と「ネクストアクション（後追い）」を自動化するための専用システム環境と運用手順書。',
  },
  {
    icon: <Package size={20} className="text-brand-orange" />,
    title: '採用・オンボーディングパッケージ',
    label: '組織拡張の鍵',
    desc: '採用思想を具現化する「求人票・面接評価シート（採用プレイブック）」の実務ツール一式と、未経験者を最短4日間で戦力化するための初期研修・90日間ローンチ伴走支援。',
  },
];

const ROADMAP = [
  {
    month: '第1ヶ月',
    period: '1〜30日目',
    title: '基盤構築・戦略策定',
    items: [
      '既存休眠リストの精査・優先順位付け',
      'システム環境（SheetViz IS）のセットアップ',
      '初期プレイブック・スクリプトの完成',
      'プロセスKPIの設計',
    ],
  },
  {
    month: '第2ヶ月',
    period: '31〜60日目',
    title: '採用・オンボーディング',
    items: [
      'プレミアム条件での人材採用（求人票・面接サポート）',
      'システムとプレイブックのトレーニング（最短4日で戦力化）',
      'ロールプレイ・フィードバックセッション',
      '日報運用開始（SheetViz Daily）',
    ],
  },
  {
    month: '第3ヶ月',
    period: '61〜90日目',
    title: '実稼働・初期チューニング',
    items: [
      '架電スタート・データ収集',
      'データ分析でスクリプト・KPIを改善',
      'チームリーダーへのコーチング移管',
      '自走できる運用フローの確立・効果測定レポート',
    ],
  },
];

// ── ページ本体 ────────────────────────────────────────

export default function InsideSalesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-brand-bg border-b border-slate-200 py-20">
        <div className="container-inner">
          <span className="section-label">Service</span>
          <h1 className="text-4xl md:text-5xl font-black text-brand-navy leading-tight mb-4">
            インサイドセールス<br />
            <span className="text-brand-orange">内製化プログラム</span>
          </h1>
          <p className="text-xl text-brand-orange font-bold mb-6">
            〜自社に眠る「既存休眠顧客」を、確実な商談機会に変える〜
          </p>
          <p className="text-slate-600 leading-relaxed max-w-2xl mb-8">
            企業が持続的にトップラインを拡大するための最適解は、疲弊を伴う焼き畑の新規営業ではなく、
            すでに保有している顧客資産の<strong className="text-slate-800">LTV（顧客生涯価値）を最大化すること</strong>。
            本プログラムは、月額6万円〜の圧倒的ローコストで、その仕組みを貴社社内に完全移譲します。
          </p>
          <Link href="/contact" className="btn-primary">
            <ArrowRight size={18} /> 無料相談を予約する
          </Link>
        </div>
      </section>

      {/* ── 休眠顧客という資産 ── */}
      <section className="py-20">
        <div className="container-inner max-w-4xl">
          <span className="section-label">Problem</span>
          <h2 className="section-title">放置した休眠顧客は、静かに競合へ流出する</h2>
          <p className="section-sub mb-10">
            多忙な外勤営業は「今すぐ売れない」既存・休眠顧客のフォローを構造的に後回しにします。
            これは単なる売上の機会損失にとどまらず、長期間放置された顧客が静かに競合へ流出する
            <strong className="text-slate-800">「サイレント・ネガティブ（ブランド毀損）」</strong>を生みます。
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card border-l-4 border-l-red-400">
              <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">放置した場合</div>
              <h3 className="font-black text-brand-navy text-lg mb-2">サイレント・ネガティブ</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                連絡が途絶えた顧客は、貴社を「忘れた」のではなく「見捨てられた」と感じている。
                ニーズが再燃したとき、最初に頭に浮かぶのは競合他社の名前になる。
              </p>
            </div>
            <div className="card border-l-4 border-l-brand-orange">
              <div className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-2">定期接触した場合</div>
              <h3 className="font-black text-brand-navy text-lg mb-2">第一想起のポジション</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                すぐに受注に繋がらなくとも、定期的に「関係を温め続ける」ことは、
                ニーズが再燃した瞬間に真っ先に相談される存在となるための
                最強のポジティブ・ブランディングになる。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 従来型ISの3つの欠陥 ── */}
      <section className="bg-brand-bg py-20">
        <div className="container-inner max-w-4xl">
          <span className="section-label">Structural Defects</span>
          <h2 className="section-title">従来のIS・外部代行に潜む「3つの構造的欠陥」</h2>
          <p className="section-sub mb-10">
            必要性を理解し、代行依頼をした企業の多くが失敗（撤退）しています。その理由は明確です。
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {DEFECTS.map((d) => (
              <div key={d.title} className="card">
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                  {d.icon}
                </div>
                <h3 className="font-black text-brand-navy text-lg mb-3">{d.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4つのコアコンセプト ── */}
      <section className="py-20">
        <div className="container-inner">
          <span className="section-label">4 Core Concepts</span>
          <h2 className="section-title">欠陥を排除した「究極にシンプル」な4つのコア・コンセプト</h2>
          <p className="section-sub mb-12 max-w-2xl">
            精神論・根性論・アポ数ノルマを完全排除。気合や高度なスキルに依存せず、
            システムと「型」に沿ってルーティンを回すだけで成果が出る仕組みを構築します。
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {CONCEPTS.map((c) => (
              <div key={c.num} className="card flex gap-5 items-start">
                <div className="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                  {c.icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-1">{c.num}</div>
                  <h3 className="font-black text-brand-navy text-lg mb-2">{c.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── コスト比較 ── */}
      <section className="bg-brand-bg py-20">
        <div className="container-inner max-w-4xl">
          <span className="section-label">Cost Comparison</span>
          <h2 className="section-title">残酷なランニングコスト比較</h2>
          <p className="section-sub mb-10">
            一度構築すれば、コストはパートスタッフの人件費のみ。
            蓄積された顧客データとノウハウは、すべて自社の永続的な資産になります。
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card opacity-70 border border-red-200">
              <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-3">IS代行・外注の場合</div>
              <div className="text-3xl font-black text-brand-navy mb-2">月額 40〜80万円</div>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">
                毎月高額なフィーが流出し続ける。契約終了と同時にノウハウも人材もすべて消える
                「永遠のレンタルモデル」。自社に何も残らない。
              </p>
              <ul className="space-y-1.5">
                {['自社にノウハウが残らない', '契約期間中もコストが増え続ける', 'ブランドを毀損するリスク'].map(t => (
                  <li key={t} className="flex items-center gap-2 text-sm text-red-400">
                    <span className="text-red-400">✗</span> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card border-2 border-brand-orange">
              <div className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-3">本プログラム（内製化後）</div>
              <div className="text-3xl font-black text-brand-navy mb-1">月額 6万円〜</div>
              <p className="text-xs text-slate-400 mb-4">
                時給1,500円 × 1日5時間 × 月8日（週2日）= 60,000円 / 1名<br />
                ※ SheetViz CRM 月額30,000円が別途かかります
              </p>
              <ul className="space-y-1.5">
                {['顧客データ・ノウハウはすべて自社資産', '人員を増やすだけで売上が純増', 'AI時代に備えた独自データが蓄積される'].map(t => (
                  <li key={t} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle size={14} className="text-brand-orange shrink-0" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4つの納品物 ── */}
      <section className="py-20">
        <div className="container-inner">
          <span className="section-label">Deliverables</span>
          <h2 className="section-title">貴社に完全移譲する「4つの営業資産」</h2>
          <p className="section-sub mb-12 max-w-2xl">
            一過性のコンサルではなく、プログラム終了後も自走し続ける資産を丸ごとお渡しします。
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {PACKAGES.map((p) => (
              <div key={p.title} className="card flex gap-5 items-start">
                <div className="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                  {p.icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-1">{p.label}</div>
                  <h3 className="font-black text-brand-navy text-base mb-2">{p.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 90日ロードマップ ── */}
      <section className="bg-brand-bg py-20">
        <div className="container-inner max-w-4xl">
          <span className="section-label">Roadmap</span>
          <h2 className="section-title">最短90日（＋30日バッファ）ローンチ・ロードマップ</h2>
          <p className="section-sub mb-12">
            非現実的なスケジュールは約束しません。貴社内の意思決定リソースを吸収する
            ＋1ヶ月のバッファを設けた合計4ヶ月体制を推奨しています。
          </p>
          <div className="space-y-6">
            {ROADMAP.map((r, i) => (
              <div key={r.month} className="card flex gap-6 items-start">
                <div className="shrink-0 text-center">
                  <div className="w-12 h-12 bg-brand-orange rounded-xl flex items-center justify-center text-white font-black text-sm mb-1">
                    {i + 1}
                  </div>
                  <div className="text-xs text-slate-400 whitespace-nowrap">{r.period}</div>
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-1">{r.month}</div>
                  <h3 className="font-black text-brand-navy text-lg mb-3">{r.title}</h3>
                  <ul className="space-y-1.5">
                    {r.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle size={14} className="text-brand-orange mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── エビデンス ── */}
      <section className="py-20">
        <div className="container-inner max-w-4xl">
          <span className="section-label">Evidence</span>
          <h2 className="section-title">「アポは必然としてこぼれ落ちてくる」と断言できる根拠</h2>
          <p className="section-sub mb-10">
            机上の空論ではありません。2つの絶対的なエビデンスと最強のシステムがセットになっているからです。
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="card">
              <div className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-3">Evidence 01</div>
              <h3 className="font-black text-brand-navy text-lg mb-3">実現場での「成功実績」という一次情報</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                休眠顧客に対し、どのようなスタンス・言葉でアプローチすればアポイントに繋がるか。
                泥臭い検証と実証を繰り返してきた確固たる成功実績（一次情報）がベースにあります。
                「他社のノウハウ本」ではなく、自社の現場から生まれた知見です。
              </p>
            </div>
            <div className="card">
              <div className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-3">Evidence 02</div>
              <h3 className="font-black text-brand-navy text-lg mb-3">データ分析が導く「統計的裏付け」</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                現場の膨大な架電データ（誰に、いつ、何を話し、どうなったか）をSheetVizで集約・分析。
                「このプロセスを踏めば、一定確率で成約に近づく」という相関関係が、
                数学的なファクトとしてすでに特定されています。
              </p>
            </div>
          </div>
          <h3 className="font-black text-brand-navy text-xl mb-6">これらを実現する「2つの武器」</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card border-l-4 border-l-brand-orange">
              <div className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-2">武器 01</div>
              <h4 className="font-black text-brand-navy mb-2">SheetViz — データ可視化 & 実行基盤</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                「今日、誰に、どうアプローチすべきか」をシステムが自動提示。
                入力データは即座に経営ダッシュボードに反映され、未来の売上予測を可能にします。
                オペレーターの「次の行動」を迷わせない、実行基盤として機能します。
              </p>
            </div>
            <div className="card border-l-4 border-l-brand-orange">
              <div className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-2">武器 02</div>
              <h4 className="font-black text-brand-navy mb-2">カチカタ & プレイブック — 勝ちパターンの科学的再現</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                特定された「成約に直結する行動（センターピン）」を具体的なトークスクリプトに落とし込み。
                オペレーターは「科学的に証明された型」通りに実行するだけで、
                才能や経験に依存せず高い再現性を発揮します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 料金 ── */}
      <section className="bg-brand-bg py-20">
        <div className="container-inner max-w-3xl">
          <span className="section-label">Pricing & ROI</span>
          <h2 className="section-title">料金と投資対効果</h2>
          <p className="section-sub mb-8">
            一過性の代行費用の消費ではなく、貴社内に永続的に利益を生む「資産（仕組み）」を構築するための先行投資です。
          </p>
          <div className="card border-2 border-brand-orange mb-6">
            <div className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-2">
              フルインストール・パッケージ
            </div>
            <div className="text-4xl font-black text-brand-navy mb-1">
              1,500,000 <span className="text-lg font-bold text-slate-400">円（税別）</span>
            </div>
            <p className="text-slate-500 text-sm mb-6">
              初期導入・90日間伴走・4つの資産（ガイドライン / プレイブック / CRM / 採用パッケージ）全納品
            </p>
            <div className="border-t border-slate-100 pt-4">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                SheetViz CRM ランニング費用（別途）
              </div>
              <div className="text-2xl font-black text-brand-navy">
                30,000 <span className="text-sm font-bold text-slate-400">円 / 月（税別）</span>
              </div>
              <p className="text-slate-500 text-xs mt-1">アカウント数1〜5名枠（管理者1名含む）</p>
            </div>
          </div>
          {/* ROI比較 */}
          <div className="space-y-4">
            <h3 className="font-black text-brand-navy text-lg">比較：他モデルとのROI</h3>
            <div className="card border border-red-200 bg-red-50/30">
              <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">
                VS アポイント獲得代行（成果報酬型）— 1アポ 1.5〜3万円
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                「アポの量」で稼ぐモデルのため強引な架電が行われがち。
                貴社の顧客リスト（金脈）と自社ブランドが焼き尽くされ、
                見えないブランド毀損コストが膨らみ続けます。
              </p>
            </div>
            <div className="card border border-red-200 bg-red-50/30">
              <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">
                VS インサイドセールス代行（月額固定型）— 毎月 80〜150万円
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                1年で1,000万円以上のキャッシュが消滅。契約終了と同時にノウハウも人材もすべて失われる
                「永遠のレンタルモデル」。本プログラムなら
                <strong className="text-slate-800">わずか1.5〜2ヶ月で初期投資を完全回収</strong>でき、
                以降は毎月数百万円単位のコスト削減効果が生まれ続けます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 次のステップ（カチカタ・SheetViz連携） ── */}
      <section className="bg-brand-navy py-16">
        <div className="container-inner max-w-3xl text-center">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Next Step</div>
          <h2 className="text-2xl font-black text-white mb-4 leading-tight">
            内製化の先に、<span className="text-brand-orange">カチカタ × SheetViz</span> で<br />さらなる型化・データ活用を
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            インサイドセールスが軌道に乗ったら、蓄積されたデータをカチカタで分析し
            KFS（勝ちパターン）を抽出。SheetVizで組織全体に展開することで、
            営業力が組織の永続的な「資産」になります。
          </p>
          <Link href="/contact" className="btn-primary">
            <ArrowRight size={18} /> まずは無料相談から
          </Link>
        </div>
      </section>
    </>
  );
}
