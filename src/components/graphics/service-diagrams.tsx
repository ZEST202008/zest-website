import type { ReactNode } from 'react';

// 各サービスの仕組みを1枚で見せる図。装飾ではなく本文の理解を助けるためのもの。
// 幅があるので、狭い画面では横スクロールさせる（リボン図と同じ扱い）。
const ORANGE = '#e04102';
const NAVY = '#1a2744';
const LINE = '#cbd5e1';
const TEXT = '#334155';
const MUTED = '#64748b';

function Figure({ label, caption, children }: { label: string; caption: string; children: ReactNode }) {
  return (
    <figure className="my-10">
      <div className="overflow-x-auto">
        <svg
          role="img"
          aria-label={label}
          viewBox="0 0 900 340"
          className="h-auto w-full min-w-[680px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <marker id="dg-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={ORANGE} />
            </marker>
            <marker id="dg-arrow-navy" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={NAVY} />
            </marker>
          </defs>
          {children}
        </svg>
      </div>
      <figcaption className="mt-3 text-center text-sm text-slate-500">{caption}</figcaption>
    </figure>
  );
}

function Box({
  x, y, w = 200, h = 74, title, sub, accent = false,
}: { x: number; y: number; w?: number; h?: number; title: string; sub?: string; accent?: boolean }) {
  return (
    <g>
      <rect
        x={x} y={y} width={w} height={h} rx="12"
        fill="#ffffff" stroke={accent ? ORANGE : LINE} strokeWidth={accent ? 2.5 : 1.5}
      />
      <text x={x + w / 2} y={sub ? y + h / 2 - 4 : y + h / 2 + 5} textAnchor="middle" fontSize="15" fontWeight="700" fill={NAVY}>
        {title}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 18} textAnchor="middle" fontSize="12" fill={MUTED}>
          {sub}
        </text>
      )}
    </g>
  );
}

function EdgeLabel({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontSize="12" fontWeight="600" fill={TEXT}>
      {text}
    </text>
  );
}

/** カチカタ × SheetViz の循環 */
export function KachikataCycleDiagram() {
  return (
    <Figure
      label="現場の記録がデータになり、勝ち筋の特定を経て型になり、現場に戻って成果が上がる。その成果がまた記録として積み上がる循環を示した図。"
      caption="図: 記録 → 特定 → 型 → 成果。回るほどデータが増え、型の精度が上がる。"
    >
      <Box x={40} y={40} title="現場の行動を記録する" sub="SheetViz" />
      <Box x={650} y={40} title="勝ち筋を特定する" sub="カチカタ" accent />
      <Box x={650} y={226} title="成果が上がる" sub="受注・商談数" />
      <Box x={40} y={226} title="型として全員に配る" sub="行動の言葉で定義" />

      <g fill="none" stroke={ORANGE} strokeWidth="2" markerEnd="url(#dg-arrow)">
        <path d="M 240 77 L 644 77" />
        <path d="M 750 114 L 750 220" />
        <path d="M 650 263 L 246 263" />
        <path d="M 140 220 L 140 120" />
      </g>

      <EdgeLabel x={442} y={64} text="行動データが貯まる" />
      <EdgeLabel x={442} y={288} text="誰でも再現できる形にする" />
      <text x="786" y="172" textAnchor="middle" fontSize="12" fontWeight="600" fill={TEXT}>KFSを</text>
      <text x="786" y="188" textAnchor="middle" fontSize="12" fontWeight="600" fill={TEXT}>絞り込む</text>
      <text x="104" y="172" textAnchor="middle" fontSize="12" fontWeight="600" fill={TEXT}>成果が</text>
      <text x="104" y="188" textAnchor="middle" fontSize="12" fontWeight="600" fill={TEXT}>次の記録に</text>

      <circle cx="450" cy="170" r="52" fill={ORANGE} opacity="0.07" />
      <text x="450" y="166" textAnchor="middle" fontSize="14" fontWeight="700" fill={NAVY}>成長の</text>
      <text x="450" y="186" textAnchor="middle" fontSize="14" fontWeight="700" fill={NAVY}>循環</text>
    </Figure>
  );
}

/** SheetViz: 1つのデータソースを3つの役割で使う */
export function SheetVizStructureDiagram() {
  const apps = [
    { x: 40, title: 'SheetViz CRM', sub: 'フィールドセールス' },
    { x: 350, title: 'SheetViz IS', sub: 'インサイドセールス' },
    { x: 660, title: 'SheetViz Daily', sub: '管理職' },
  ];
  return (
    <Figure
      label="1つのGoogle Sheetsを共通データソースとして、3つのアプリが読み書きし、二重入力が起きない構成を示した図。"
      caption="図: データは1枚、画面は役割ごと。どこで入力しても全員に反映される。"
    >
      <rect x="290" y="34" width="320" height="86" rx="12" fill="#ffffff" stroke={NAVY} strokeWidth="2.5" />
      <text x="450" y="66" textAnchor="middle" fontSize="15" fontWeight="700" fill={NAVY}>共通データソース</text>
      <text x="450" y="88" textAnchor="middle" fontSize="12" fill={MUTED}>1つのGoogle Sheets</text>

      <path
        d="M 450 124 L 450 166" fill="none" stroke={ORANGE} strokeWidth="2"
        markerEnd="url(#dg-arrow)" markerStart="url(#dg-arrow)"
      />
      <g fill="none" stroke={ORANGE} strokeWidth="2">
        <path d="M 450 170 L 156 170 Q 140 170 140 186 L 140 222" />
        <path d="M 450 170 L 450 222" />
        <path d="M 450 170 L 744 170 Q 760 170 760 186 L 760 222" />
      </g>
      <EdgeLabel x={290} y={158} text="入力も閲覧も、同じ1枚を見る" />

      {apps.map((a) => (
        <Box key={a.x} x={a.x} y={226} w={200} h={74} title={a.title} sub={a.sub} />
      ))}
    </Figure>
  );
}

/** インサイドセールス内製化: 90日で主導権が移り、+30日はバッファ */
export function InsideSales90Diagram() {
  // 横軸は120日。30日 = 205px（x=40 が Day0、x=860 が Day120）。
  const phases = [
    { x: 42, title: 'Day 0–30', sub: '設計・リスト整備' },
    { x: 247, title: 'Day 31–60', sub: 'ZESTが実行、社内が並走' },
    { x: 452, title: 'Day 61–90', sub: '社内へ完全移譲' },
  ];
  const CROSS = 655; // Day 90 の位置
  return (
    <Figure
      label="90日かけてZESTの関与が減り社内の実行が増える推移と、その後ろに置いた30日のバッファを示した図。"
      caption="図: 90日で実行の主導権が社内へ移る。その後ろに意思決定用の30日バッファを置き、合計4ヶ月を推奨。"
    >
      {/* バッファ期間の帯 */}
      <rect x={CROSS} y="30" width="205" height="232" fill={NAVY} opacity="0.045" />
      <line x1={CROSS} y1="30" x2={CROSS} y2="262" stroke={LINE} strokeWidth="1.5" strokeDasharray="5 5" />

      {phases.map((p) => (
        <Box key={p.x} x={p.x} y={34} w={195} h={74} title={p.title} sub={p.sub} accent={p.x === 452} />
      ))}

      {/* バッファのボックスだけ破線で区別する */}
      <rect x={CROSS + 2} y="34" width="195" height="74" rx="12" fill="#ffffff" stroke={LINE} strokeWidth="1.5" strokeDasharray="6 5" />
      <text x={CROSS + 100} y="63" textAnchor="middle" fontSize="15" fontWeight="700" fill={MUTED}>＋30日バッファ</text>
      <text x={CROSS + 100} y="85" textAnchor="middle" fontSize="12" fill={MUTED}>意思決定リソースの確保</text>

      {/* ZESTの関与は減り、社内の実行は増える。90日で入れ替わり、以降は横ばい。 */}
      <path d={`M 40 162 L ${CROSS} 240 L 860 240 L 40 240 Z`} fill={ORANGE} opacity="0.16" />
      <path d={`M 40 240 L ${CROSS} 162 L 860 162 L 860 240 Z`} fill={NAVY} opacity="0.12" />
      <path d={`M 40 162 L ${CROSS} 240 L 860 240`} fill="none" stroke={ORANGE} strokeWidth="2.5" />
      <path d={`M 40 240 L ${CROSS} 162 L 860 162`} fill="none" stroke={NAVY} strokeWidth="2.5" />

      <text x="52" y="154" fontSize="12" fontWeight="700" fill={ORANGE}>ZESTの関与</text>
      <text x="760" y="154" fontSize="12" fontWeight="700" fill={NAVY}>社内の実行</text>

      {/* 時間軸 */}
      <line x1="40" y1="262" x2="860" y2="262" stroke={LINE} strokeWidth="1.5" />
      {[['40', 'Day 0'], ['245', '30'], ['450', '60'], ['655', '90'], ['860', '120']].map(([x, label]) => (
        <g key={label}>
          <line x1={x} y1="258" x2={x} y2="266" stroke={LINE} strokeWidth="1.5" />
          <text x={x} y="282" textAnchor="middle" fontSize="11" fill={MUTED}>{label}</text>
        </g>
      ))}
      <text x={CROSS + 100} y="282" textAnchor="middle" fontSize="11" fontWeight="600" fill={MUTED}>バッファ</text>

      <text x="450" y="312" textAnchor="middle" fontSize="12" fontWeight="600" fill={TEXT}>
        ノウハウ・リスト・スクリプト・データはすべて貴社に残る
      </text>
    </Figure>
  );
}

/** AIチャットアシスタント: 訪問者が商談になるまで */
export function AiChatFlowDiagram() {
  return (
    <Figure
      label="サイト訪問者の質問にAIが答え、答えきれないものだけ担当者へ渡り、商談につながるまでの流れを示した図。"
      caption="図: 大半はAIが答え、人が出るのは商談になる会話だけ。取りこぼしが減る。"
    >
      <Box x={30} y={130} w={170} h={74} title="サイト訪問者" sub="フォームは埋めない" />
      <Box x={250} y={130} w={170} h={74} title="AIが応答" sub="24時間・自社の情報で" accent />

      <g fill="none" stroke={ORANGE} strokeWidth="2" markerEnd="url(#dg-arrow)">
        <path d="M 200 167 L 244 167" />
        <path d="M 470 167 L 470 70 L 664 70" />
        <path d="M 470 167 L 470 264 L 664 264" />
      </g>
      <path d="M 420 167 L 466 167" fill="none" stroke={ORANGE} strokeWidth="2" />
      <circle cx="470" cy="167" r="5" fill={ORANGE} />

      <Box x={670} y={33} w={200} h={74} title="その場で自己解決" sub="問い合わせを取りこぼさない" />
      <Box x={670} y={227} w={200} h={74} title="担当者へエスカレーション" sub="Slackへ即時通知" accent />

      <EdgeLabel x={582} y={56} text="よくある質問" />
      <EdgeLabel x={582} y={250} text="検討度が高い相談" />

      <path d="M 770 301 L 770 324" fill="none" stroke={ORANGE} strokeWidth="2" markerEnd="url(#dg-arrow)" />
      <text x="790" y="322" fontSize="13" fontWeight="700" fill={ORANGE}>商談へ</text>
    </Figure>
  );
}
