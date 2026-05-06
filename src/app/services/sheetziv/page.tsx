import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BarChart2, Users, FileText, RefreshCw, Bell } from 'lucide-react';

export const metadata: Metadata = {
  title: 'SheetViz | Google Sheetsベース営業支援プラットフォーム',
  description: 'Google Sheetsを基盤にした営業支援プラットフォーム。フィールドセールス・インサイドセールス・管理職の3役割に最適化された3アプリ構成で、営業組織全体の生産性を向上します。',
};

const APPS = [
  {
    id: 'crm',
    label: 'SheetViz CRM',
    target: 'フィールドセールス向け',
    color: 'bg-orange-50 border-brand-orange/20',
    labelColor: 'text-brand-orange',
    features: [
      { title: '商談管理', desc: 'ステータス管理・取引先紐づけ・期待クローズ日で商談を一元管理' },
      { title: 'KPI管理', desc: '見積依頼から提案提出までの営業日数を自動計算。3点セット提出状況も追跡' },
      { title: '品質チェック', desc: '9項目チェックリスト＋奨励行動2項目で提案品質を標準化' },
      { title: 'ダッシュボード', desc: '達成率・担当者別・営業所別一覧、未達商談を可視化' },
    ],
  },
  {
    id: 'is',
    label: 'SheetViz IS',
    target: 'インサイドセールス向け',
    color: 'bg-blue-50 border-blue-200',
    labelColor: 'text-blue-600',
    features: [
      { title: 'リード管理', desc: '未対応→架電中→アポ獲得→失注のステータスで進捗を管理' },
      { title: '引き継ぎ自動化', desc: 'アポ獲得時にCRMへ引き継ぎ商談を自動作成。手入力ゼロ' },
      { title: '休眠顧客管理', desc: '最終商談から180日以上経過した顧客を自動表示' },
      { title: '目標管理', desc: 'コンタクト件数・アポ獲得件数の実績/目標/達成率をリアルタイム表示' },
    ],
  },
  {
    id: 'daily',
    label: 'SheetViz Daily',
    target: '全営業・管理職向け',
    color: 'bg-green-50 border-green-200',
    labelColor: 'text-green-600',
    features: [
      { title: 'PDCA日報', desc: '最重要目標から翌日の改善アクションまで、型化された日報フォーマット' },
      { title: '管理職フィードバック', desc: 'FBコメント送信でステータスが自動更新。抜け漏れ防止' },
      { title: 'ノウハウ管理', desc: '優れた日報にフラグを立てカテゴリ分類。組織の知恵を蓄積' },
      { title: 'メンバー管理', desc: '提出数・連続提出日数・FB待ち件数を管理職が一覧で把握' },
    ],
  },
];

const AUTOMATIONS = [
  { icon: <RefreshCw size={18} className="text-brand-orange" />, title: '引き継ぎ商談の自動作成', desc: 'ISでアポ獲得→CRMに「引き継ぎ待ち」商談を自動作成' },
  { icon: <Bell size={18} className="text-brand-orange" />, title: '担当者への自動通知', desc: '管理職がアサイン完了→新担当者へ商談リンク付きメール自動送信' },
  { icon: <FileText size={18} className="text-brand-orange" />, title: '日報FB通知', desc: '日報提出→管理職へFBリクエストメールを自動送信（重複防止あり）' },
  { icon: <Users size={18} className="text-brand-orange" />, title: '連続提出日数の更新', desc: '毎朝6時に全担当者の連続提出日数を自動更新（土日祝除外）' },
];

export default function SheetVizPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-bg border-b border-slate-200 py-20">
        <div className="container-inner">
          <span className="section-label">Service</span>
          <div className="flex items-center gap-4 mb-4">
            <Image src="/sheetviz-logo.png" alt="SheetViz" width={160} height={48} className="h-12 w-auto object-contain" />
          </div>
          <p className="text-xl text-brand-orange font-bold mb-6">
            Google Sheetsを基盤にした、営業組織まるごとDXプラットフォーム
          </p>
          <p className="text-slate-600 leading-relaxed max-w-2xl mb-8">
            1つのGoogle Sheetsを共通データソースに、フィールドセールス・インサイドセールス・管理職の
            3役割に最適化した3アプリで構成。導入の重さゼロ、現場の使いやすさ最大限を両立します。
          </p>
          <Link href="/contact" className="btn-primary">
            <ArrowRight size={18} /> 無料相談を予約する
          </Link>
        </div>
      </section>

      {/* 3アプリ構成 */}
      <section className="py-20">
        <div className="container-inner">
          <span className="section-label">3 Apps</span>
          <h2 className="section-title">1つのデータ、3つの役割に最適化</h2>
          <p className="section-sub mb-12 max-w-2xl">
            すべてのアプリが同一のGoogle Sheetsをデータソースとして共有。
            情報の二重入力をなくし、組織全体をリアルタイムで繋ぎます。
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {APPS.map((app) => (
              <div key={app.id} className={`rounded-2xl border-2 p-6 ${app.color}`}>
                <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${app.labelColor}`}>
                  {app.target}
                </div>
                <h3 className="text-xl font-black text-brand-navy mb-5">{app.label}</h3>
                <ul className="space-y-4">
                  {app.features.map((f) => (
                    <li key={f.title}>
                      <div className="font-bold text-brand-navy text-sm mb-1">{f.title}</div>
                      <div className="text-slate-600 text-sm leading-relaxed">{f.desc}</div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 自動化 */}
      <section className="bg-brand-bg py-20">
        <div className="container-inner">
          <span className="section-label">Automation</span>
          <h2 className="section-title">4つの自動化で、手作業をゼロに</h2>
          <p className="section-sub mb-10 max-w-2xl">
            引き継ぎ・通知・集計など、営業組織のルーティン業務を自動化。
            担当者は「売る」ことだけに集中できます。
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {AUTOMATIONS.map((a) => (
              <div key={a.title} className="card flex gap-4 items-start">
                <div className="w-9 h-9 bg-orange-50 rounded-lg flex items-center justify-center shrink-0">
                  {a.icon}
                </div>
                <div>
                  <div className="font-bold text-brand-navy mb-1">{a.title}</div>
                  <div className="text-slate-600 text-sm leading-relaxed">{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* カチカタ連携 */}
      <section className="py-20">
        <div className="container-inner max-w-3xl">
          <span className="section-label">Integration</span>
          <h2 className="section-title">カチカタとの連携で、データが「型」になる</h2>
          <p className="section-sub mb-10">
            SheetVizに蓄積された営業データをカチカタが分析し、
            KFS（勝ちパターン）として抽出。それをSheetVizに書き戻すことで、
            組織全体の営業行動が自動的にアップデートされます。
          </p>
          <div className="bg-brand-navy rounded-2xl p-8 text-white">
            <div className="space-y-4">
              {[
                { step: '01', text: 'SheetVizに商談・活動データが日々蓄積される' },
                { step: '02', text: 'カチカタがトップセールスの行動パターンをAI分析' },
                { step: '03', text: 'KFS（センターピン行動）を特定・確定' },
                { step: '04', text: 'SheetVizのKPIチェックリストに書き戻し、全員が実践' },
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-4">
                  <span className="text-brand-orange font-black text-sm w-8">STEP {item.step}</span>
                  <span className="text-slate-300 text-sm leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* IS内製化連携 */}
      <section className="bg-blue-50 py-20">
        <div className="container-inner max-w-3xl">
          <span className="section-label">関連サービス</span>
          <h2 className="section-title">SheetViz ISは、インサイドセールス内製化の<br />専用CRM基盤です</h2>
          <p className="section-sub mb-8">
            ZESTの<strong className="text-brand-navy">インサイドセールス内製化プログラム</strong>では、SheetViz ISを中核ツールとして活用します。
            休眠顧客リストの管理から架電記録・アポ引き継ぎまで、ISチームの動きをすべて一元管理。
            代行ではなく「自走するIS組織」を90日で立ち上げるためのデータ基盤として機能します。
          </p>
          <div className="bg-white rounded-2xl border border-blue-200 p-6 grid md:grid-cols-3 gap-5 mb-8">
            {[
              { num: '01', title: '休眠顧客を可視化', desc: '最終商談から180日以上経過した顧客を自動抽出。架電リストをSheetViz ISが常に最新化' },
              { num: '02', title: 'KPIをリアルタイム管理', desc: 'コンタクト件数・アポ率・目標達成率を日次で追跡。改善すべきポイントが即わかる' },
              { num: '03', title: 'アポをCRMへ自動引き継ぎ', desc: 'アポ獲得と同時にSheetViz CRMに商談を自動作成。FSとの情報共有がゼロ手間で完結' },
            ].map((item) => (
              <div key={item.num} className="flex flex-col gap-2">
                <span className="text-blue-600 font-black text-xs">{item.num}</span>
                <div className="font-bold text-brand-navy text-sm">{item.title}</div>
                <div className="text-slate-600 text-xs leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
          <Link href="/services/inside-sales" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
            インサイドセールス内製化プログラムの詳細を見る <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-navy py-16">
        <div className="container-inner text-center">
          <h2 className="text-2xl font-black text-white mb-4">
            まずは現状のヒアリングから
          </h2>
          <p className="text-slate-400 mb-6 text-sm">
            既存のCRM・Excelからの移行もサポートします。
          </p>
          <Link href="/contact" className="btn-primary">
            <ArrowRight size={18} /> 無料相談を予約する
          </Link>
        </div>
      </section>
    </>
  );
}
