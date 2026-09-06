import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight, Clock, MessagesSquare, Users, Shield,
  CheckCircle, XCircle, MessageSquare, Bell, Briefcase, TrendingUp,
  Mail,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'AIチャットアシスタント｜Webサイトの離脱を商談機会に変えるAI接客',
  description: 'Webサイトに眠る「見えない機会損失」を確実な「商談機会」へ。フォーム入力の手間や営業への警戒感から離脱していた訪問者へ、AIが自然な会話の中でリードを獲得し売上機会を最大化。初期費用50万円・月額5万円のフルマネージド。',
};

// ── データ定義 ────────────────────────────────────────

const FEATURES = [
  {
    icon: <Clock size={22} className="text-brand-orange" />,
    num: 'Benefit 01',
    title: '即時対応で「ホットリード」を競合に渡さない',
    desc: '夜間・休日・繁忙期を問わず、訪問者の問い合わせに即座に対応。人手不足による機会損失をゼロにし、競合他社に顧客を奪われるリスクを排除します。問い合わせへの初動速度が商談化率に直結します。',
    items: ['サービス概要・料金プランへの質問対応', '資料請求・デモ申し込みの受け付け', '担当者への引き継ぎ・アポ日程の調整'],
  },
  {
    icon: <MessageSquare size={22} className="text-brand-orange" />,
    num: 'Benefit 02',
    title: '御社の商品だけを正確に語る「専属のトップセールス」',
    desc: '御社サービスの知識のみを搭載した特化型AI設計。競合他社情報の漏洩・無関係な長時間会話を防止し、ブランドトーンに合わせた応答スタイルを実現します。',
    items: ['御社サービスの知識のみを搭載して設計', '対象外の質問はやんわりと丁寧に断る', 'ブランドトーンに合わせた応答スタイルを実現'],
  },
  {
    icon: <MessagesSquare size={22} className="text-brand-orange" />,
    num: 'Benefit 03',
    title: '現場の負担ゼロ。「いつものSlack」が最強の営業ツールに',
    desc: 'AIが対応しきれない問い合わせは即座に担当者へ。連絡先収集 → Slack通知 → 担当者返信 → 商談化の4ステップが全自動で回り、チャンスを逃しません。',
    items: ['Slack以外にもTeams・メール等、既存ツールに合わせた連携が可能', '外出中でもスマートフォンで即座に確認・対応', '担当者が返信すると訪問者のメールへ自動通知'],
  },
  {
    icon: <Users size={22} className="text-brand-orange" />,
    num: 'Benefit 04',
    title: 'フォーム離脱をゼロにする「見えないリード獲得術」',
    desc: '自然な会話の中で企業名・氏名・メールアドレスを取得。フォームへの誘導なしでリード情報を収集し、バウンスしたページからも問い合わせを取りこぼしません。',
    items: ['取得情報はSlack通知・メール通知に自動連携', '会話履歴・連絡先情報をクラウドDBにセキュアに蓄積', '将来的にCRMへの連携拡張にも対応可能'],
  },
];

const FLOW = [
  { icon: <Users size={20} className="text-brand-orange" />, step: '01', title: '訪問者', sub: 'サイトを訪問' },
  { icon: <MessageSquare size={20} className="text-brand-orange" />, step: '02', title: 'AI自動応答', sub: '24時間対応' },
  { icon: <Bell size={20} className="text-brand-orange" />, step: '03', title: 'エスカレーション', sub: 'Slack通知' },
  { icon: <Briefcase size={20} className="text-brand-orange" />, step: '04', title: '担当者対応', sub: '商談化' },
  { icon: <Mail size={20} className="text-brand-orange" />, step: '05', title: 'フォローメール', sub: '自動送信' },
];

const PHASES = [
  {
    phase: 'PHASE 1',
    period: 'Week 1',
    title: 'ヒアリング & 要件定義',
    items: ['サービス内容の整理', 'AI知識設計・確認', '連携ツールの確認', 'ゴール・KPIの定義'],
  },
  {
    phase: 'PHASE 2',
    period: 'Week 1-2',
    title: 'AI設計 & 実装',
    items: ['プロンプト設計', 'チャットUI組み込み', 'Slack連携設定', 'テスト環境での動作確認'],
  },
  {
    phase: 'PHASE 3',
    period: 'Week 2',
    title: 'テスト & 調整',
    items: ['動作確認・品質検証', '応答精度の調整', '担当者へのレクチャー', 'レクチャー資料作成'],
  },
  {
    phase: 'PHASE 4',
    period: 'Week 2以降',
    title: '本番稼働 & 改善',
    items: ['ウェブサイトへ公開', 'データ蓄積開始', '定期的なAI改善対応', '月次レポート・改善提案'],
  },
];

const AI_COMPARE = [
  { problem: '数学や天気など無関係な質問に答えてしまう', solution: '御社サービスの知識のみを搭載して設計' },
  { problem: '競合他社の情報を教えてしまうリスクがある', solution: '対象外の質問はやんわりと丁寧に断る' },
  { problem: 'ブランドイメージの毀損につながりかねない', solution: 'ブランドトーンに合わせた応答スタイルを実現' },
  { problem: '個人情報を意図せず聞き出してしまうことも', solution: '個人情報の取得・管理ガイドラインに準拠' },
];

const FAQS = [
  {
    q: 'うちの商材は複雑で、AIには説明しきれないと思うのですが…',
    a: 'AIの目的は「クロージング」ではなく「リード獲得（トス上げ）」です。複雑な部分は「より詳しい担当者からご案内しますね、メールアドレスを教えていただけますか？」と自然にパスアップさせる設定が可能です。',
  },
  {
    q: 'AIが誤った情報を答えてしまうリスクはありませんか？',
    a: '御社サービスの知識のみを搭載するため、範囲外の質問は「担当者にお繋ぎします」と回答します。月次のプロンプト品質チェックで精度を継続維持します。',
  },
  {
    q: '顧客の個人情報（名前・メールアドレス等）は安全ですか？',
    a: '会話履歴・連絡先情報は暗号化されたクラウドDBに保存し、アクセス制御を設けています。個人情報取得・管理ガイドラインに準拠した設計です。',
  },
  {
    q: 'サービス内容が変わったとき、情報の更新は手間がかかりますか？',
    a: '月額費用内にプロンプト改善・情報更新対応が含まれます。変更内容をご連絡いただければZESTが対応します。自社でのメンテナンス作業は不要です。',
  },
];

// ── ページ本体 ────────────────────────────────────────

export default function AiChatAssistantPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-brand-bg border-b border-slate-200 py-20">
        <div className="container-inner">
          <span className="section-label">Service</span>
          <h1 className="text-4xl md:text-5xl font-black text-brand-navy leading-tight mb-4">
            AIチャットアシスタント
          </h1>
          <p className="text-xl text-brand-orange font-bold mb-6">
            Webサイトに眠る「見えない機会損失」を確実な「商談機会」へ。
          </p>
          <p className="text-slate-600 leading-relaxed max-w-2xl mb-8">
            フォーム入力の手間や営業への警戒感から離脱していた訪問者へ、
            AIが自然な会話の中でリードを獲得し、御社の売上機会を最大化します。
            <strong className="text-slate-800">最短2週間で稼働開始</strong>、フルマネージドで運用負荷ゼロ。
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              { icon: <Clock size={14} />, label: '24時間対応' },
              { icon: <MessagesSquare size={14} />, label: 'Slack連携' },
              { icon: <Users size={14} />, label: 'リード収集' },
              { icon: <Shield size={14} />, label: 'セキュア蓄積' },
            ].map(({ icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-600 text-sm font-medium px-3 py-1.5 rounded-full">
                <span className="text-brand-orange">{icon}</span>
                {label}
              </span>
            ))}
          </div>
          <Link href="/contact" className="btn-primary">
            <ArrowRight size={18} /> 無料デモを申し込む
          </Link>
        </div>
      </section>

      {/* ── 機会損失セクション ── */}
      <section className="py-20">
        <div className="container-inner max-w-4xl">
          <span className="section-label">Problem</span>
          <h2 className="section-title">御社のWebサイト、「見えない機会損失」が発生していませんか？</h2>
          <p className="section-sub mb-10">
            月に1万人が広告経由でサイトに来ても、問い合わせに至るのはわずか約2%（200人）。
            残りの9,800人の中には「ちょっと聞きたいだけ」の超有望な見込み客が確実に混ざっています。
            これをフォームの壁で逃しているのが<strong className="text-slate-800">「見えない機会損失」</strong>です。
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card border-l-4 border-l-brand-orange">
              <div className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-2">Web広告あり企業向け</div>
              <h3 className="font-black text-brand-navy text-lg mb-2">98%の訪問者を逃していませんか？</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                広告費をかけて集客した1万人のうち9,800人が「営業時間外だから」「フォームが面倒だから」「営業電話が嫌だから」で離脱。このチャンスをAIが確実にキャッチします。
              </p>
            </div>
            <div className="card border-l-4 border-l-slate-300">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">自然流入・紹介メイン企業向け</div>
              <h3 className="font-black text-brand-navy text-lg mb-2">熱量の高い見込み客を門前払いしていませんか？</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                わざわざ検索したり名刺を見て訪れた「非常に熱量の高い見込み客」を、フォームの面倒さで逃すのは、お店に来たお客様を無視して帰らせるのと同じくらいもったいないことです。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── サービスフロー ── */}
      <section className="bg-brand-bg py-20">
        <div className="container-inner">
          <span className="section-label">How It Works</span>
          <h2 className="section-title">訪問者が商談になるまで、すべて自動で回る仕組み</h2>
          <p className="section-sub mb-12 max-w-2xl">
            自社サービスに特化したAI知識を設計・実装。既存ウェブサイトへのスクリプト1行で組み込み対応します。
          </p>
          {/* フロー */}
          <div className="flex flex-col md:flex-row items-stretch gap-0 mb-12 overflow-x-auto">
            {FLOW.map((f, i) => (
              <div key={f.step} className="flex md:flex-col items-center md:items-center flex-1 min-w-0">
                <div className="flex flex-col items-center flex-1 w-full">
                  <div className="w-14 h-14 bg-white rounded-2xl border-2 border-orange-100 flex items-center justify-center mb-3 shadow-sm">
                    {f.icon}
                  </div>
                  <div className="text-xs font-bold text-brand-orange mb-1">{f.step}</div>
                  <div className="font-black text-brand-navy text-sm text-center">{f.title}</div>
                  <div className="text-xs text-slate-400 text-center">{f.sub}</div>
                </div>
                {i < FLOW.length - 1 && (
                  <ArrowRight size={20} className="text-slate-300 mx-2 shrink-0 hidden md:block" />
                )}
              </div>
            ))}
          </div>
          {/* 特徴グリッド */}
          <div className="grid md:grid-cols-3 gap-4">
            {[
              '自社サービスに特化したAI知識を設計・実装',
              'Slack / Teams / メールと既存ツールに自動連携',
              '問い合わせデータをセキュアなクラウドDBに蓄積・分析',
              '既存ウェブサイトへのスクリプト1行で組み込み対応',
              '会話ログをリアルタイム記録、営業改善サイクルを回す',
              '担当者不在時も顧客体験を途切れさせない設計',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2.5 bg-white rounded-xl p-4 border border-slate-100">
                <CheckCircle size={16} className="text-brand-orange mt-0.5 shrink-0" />
                <span className="text-slate-700 text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4 Benefits ── */}
      <section className="py-20">
        <div className="container-inner">
          <span className="section-label">4 Benefits</span>
          <h2 className="section-title">機能ではなく、ビジネス成果で選ぶ理由</h2>
          <p className="section-sub mb-12 max-w-2xl">
            「何ができるか」ではなく「御社の売上がどう上がるか」を4つのベネフィットでご説明します。
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {FEATURES.map((f) => (
              <div key={f.num} className="card flex gap-5 items-start">
                <div className="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                  {f.icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-1">{f.num}</div>
                  <h3 className="font-black text-brand-navy text-lg mb-2">{f.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-3">{f.desc}</p>
                  <ul className="space-y-1">
                    {f.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-500">
                        <CheckCircle size={13} className="text-brand-orange mt-0.5 shrink-0" />
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

      {/* ── 一般AIとの比較 ── */}
      <section className="bg-brand-bg py-20">
        <div className="container-inner max-w-4xl">
          <span className="section-label">ZEST Design</span>
          <h2 className="section-title">「御社のAI」として動く。関係のない質問には答えない。</h2>
          <p className="section-sub mb-10">
            汎用AIをそのまま設置すると、思わぬリスクが生まれます。ZESTは御社専用に設計します。
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">一般的なAIの問題点</div>
              {AI_COMPARE.map(({ problem }) => (
                <div key={problem} className="flex items-start gap-3 bg-red-50 rounded-xl p-4 border border-red-100">
                  <XCircle size={16} className="text-red-400 mt-0.5 shrink-0" />
                  <span className="text-slate-600 text-sm">{problem}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-4">ZESTのAI設計</div>
              {AI_COMPARE.map(({ solution }) => (
                <div key={solution} className="flex items-start gap-3 bg-orange-50 rounded-xl p-4 border border-orange-100">
                  <CheckCircle size={16} className="text-brand-orange mt-0.5 shrink-0" />
                  <span className="text-slate-700 text-sm font-medium">{solution}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ROIロジック ── */}
      <section className="py-20">
        <div className="container-inner max-w-4xl">
          <span className="section-label">ROI</span>
          <h2 className="section-title">「月額5万円」は圧倒的なコストパフォーマンス</h2>
          <p className="section-sub mb-10">
            インサイドセールスを1名採用したり、コールセンターに外注すれば月額40〜50万円は下りません。
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="card border border-slate-200 opacity-75">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">従来の選択肢</div>
              <div className="text-3xl font-black text-slate-500 mb-2">月額 40〜50万円〜</div>
              <ul className="space-y-1.5">
                {['インサイドセールス採用', 'コールセンター外注'].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-sm text-red-400">
                    <XCircle size={13} className="shrink-0" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card border-2 border-brand-orange bg-orange-50/30">
              <div className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-3">ZEST AIアシスタント</div>
              <div className="text-3xl font-black text-brand-orange mb-2">月額 5万円</div>
              <p className="text-slate-500 text-xs mb-3">インフラ費用込み・フルマネージド提供</p>
              <ul className="space-y-1.5">
                {['人間の約1/8のコストで全自動対応', '24時間365日・即時応答', '深夜追加費用ゼロ'].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle size={13} className="text-brand-orange shrink-0" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="card bg-orange-50 border border-orange-200">
            <div className="flex items-start gap-3">
              <TrendingUp size={20} className="text-brand-orange mt-0.5 shrink-0" />
              <p className="text-slate-700 text-sm leading-relaxed">
                <strong className="text-brand-orange">＋αの純利益：</strong>
                月額5万円は「すべての訪問者に完璧な1次対応を行う専属スタッフの人件費」として確実にペイします。
                その上で、AIが自然な会話から拾い上げたフォーム離脱層のリードは、
                すべて御社の<strong className="text-slate-800">純利益（UPSIDE）</strong>になります。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 導入フロー ── */}
      <section className="bg-brand-bg py-20">
        <div className="container-inner max-w-4xl">
          <span className="section-label">Onboarding</span>
          <h2 className="section-title">最短2週間で稼働開始</h2>
          <p className="section-sub mb-12">
            ヒアリングから本番公開まで、ZESTがすべてリードします。
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PHASES.map((p, i) => (
              <div key={p.phase} className="card">
                <div className="w-10 h-10 bg-brand-orange rounded-xl flex items-center justify-center text-white font-black text-sm mb-3">
                  {i + 1}
                </div>
                <div className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-0.5">{p.phase}</div>
                <div className="text-xs text-slate-400 mb-2">{p.period}</div>
                <h3 className="font-black text-brand-navy text-base mb-3">{p.title}</h3>
                <ul className="space-y-1.5">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-start gap-1.5 text-xs text-slate-500">
                      <CheckCircle size={11} className="text-brand-orange mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 料金 ── */}
      <section className="py-20">
        <div className="container-inner max-w-3xl">
          <span className="section-label">Pricing</span>
          <h2 className="section-title">シンプルな2段階構成</h2>
          <p className="section-sub mb-8">インフラ費用込みのフルマネージド提供。隠れたコストはありません。</p>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="card border border-slate-200">
              <div className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-2">初期費用</div>
              <div className="text-4xl font-black text-brand-navy mb-1">
                50万円 <span className="text-sm font-bold text-slate-400">（税別）</span>
              </div>
              <p className="text-slate-400 text-xs mb-4">カスタマイズ内容により変動</p>
              <ul className="space-y-1.5">
                {['システムプロンプト設計・チューニング', 'UIブランドカラー適用・組み込み', 'Slack連携・本番環境構築', '動作確認・スタッフレクチャー'].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle size={13} className="text-brand-orange shrink-0" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card border-2 border-brand-orange">
              <div className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-2">月額費用</div>
              <div className="text-4xl font-black text-brand-navy mb-1">
                50,000円 <span className="text-sm font-bold text-slate-400">/ 月（税別）</span>
              </div>
              <p className="text-slate-400 text-xs mb-4">インフラ費用込み・フルマネージド提供</p>
              <ul className="space-y-1.5">
                {['稼働監視・障害対応', 'プロンプト改善・品質チェック', '月次レポート提供', '最新AIアップデート対応'].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle size={13} className="text-brand-orange shrink-0" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-xs text-slate-400 text-center">
            ※ インフラ費用（AI・クラウドDB等）含むフルマネージド提供。非Next.jsサイト対応はオプション（+5万円）。
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-brand-bg py-20">
        <div className="container-inner max-w-3xl">
          <span className="section-label">FAQ</span>
          <h2 className="section-title">よくある懸念にお答えします</h2>
          <div className="space-y-4 mt-10">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="card">
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center text-white font-black text-sm shrink-0">Q</span>
                  <div>
                    <p className="font-bold text-brand-navy text-base mb-2">{q}</p>
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-orange-100 rounded-md flex items-center justify-center text-brand-orange font-black text-xs shrink-0 mt-0.5">A</span>
                      <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 次のステップ ── */}
      <section className="bg-brand-navy py-16">
        <div className="container-inner max-w-3xl text-center">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Next Step</div>
          <h2 className="text-2xl font-black text-white mb-4 leading-tight">
            まずは、御社のサービス・課題に合わせた<br />
            <span className="text-brand-orange">デモをご覧ください。</span>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            貴社のWebサイトを使ったデモ環境をご用意します。
            実際にAIと会話していただき、導入後のイメージを具体的にお持ちいただけます。
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Link href="/services/kachikata" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors text-white text-sm font-bold px-4 py-2.5 rounded-xl">
              カチカタについて詳しく <ArrowRight size={15} />
            </Link>
            <Link href="/services/inside-sales" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors text-white text-sm font-bold px-4 py-2.5 rounded-xl">
              インサイドセールス内製化 <ArrowRight size={15} />
            </Link>
          </div>
          <Link href="/contact" className="btn-primary">
            <ArrowRight size={18} /> 無料デモを申し込む
          </Link>
        </div>
      </section>
    </>
  );
}
