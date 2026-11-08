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
      label="3つのアプリが1つのGoogle Sheetsを共通データソースとして読み書きし、二重入力が起きない構成を示した図。"
      caption="図: 役割ごとに画面は分かれるが、データは1つ。どこで入力しても全員に反映される。"
    >
      {apps.map((a) => (
        <Box key={a.x} x={a.x} y={34} w={200} h={74} title={a.title} sub={a.sub} />
      ))}

      <g fill="none" stroke={ORANGE} strokeWidth="2">
        <path d="M 140 108 L 140 160 Q 140 176 156 176 L 450 176" />
        <path d="M 450 108 L 450 176" />
        <path d="M 760 108 L 760 160 Q 760 176 744 176 L 450 176" />
        <path d="M 450 180 L 450 218" markerEnd="url(#dg-arrow)" markerStart="url(#dg-arrow)" />
      </g>
      <EdgeLabel x={290} y={160} text="入力も閲覧も、同じ1枚を見る" />

      <rect x="290" y="222" width="320" height="86" rx="12" fill="#ffffff" stroke={NAVY} strokeWidth="2.5" />
      <text x="450" y="254" textAnchor="middle" fontSize="15" fontWeight="700" fill={NAVY}>共通データソース</text>
      <text x="450" y="276" textAnchor="middle" fontSize="12" fill={MUTED}>1つのGoogle Sheets</text>
      <g stroke={LINE} strokeWidth="1.2">
        <line x1="330" y1="288" x2="570" y2="288" />
        <line x1="370" y1="282" x2="370" y2="300" />
        <line x1="450" y1="282" x2="450" y2="300" />
        <line x1="530" y1="282" x2="530" y2="300" />
      </g>
    </Figure>
  );
}

/** インサイドセールス内製化: 90日で主導権が移る */
export function InsideSales90Diagram() {
  const phases = [
    { x: 40, title: 'Day 0–30', sub: '設計・リスト整備' },
    { x: 350, title: 'Day 31–60', sub: 'ZESTが実行、社内が並走' },
    { x: 660, title: 'Day 61–90', sub: '社内へ完全移譲' },
  ];
  return (
    <Figure
      label="90日かけてZESTの関与が減り、社内の実行比率が増えていく内製化の進み方を示した図。"
      caption="図: 外注のままにしない。90日で実行の主導権が社内へ移る。"
    >
      {phases.map((p) => (
        <Box key={p.x} x={p.x} y={34} w={200} h={74} title={p.title} sub={p.sub} accent={p.x === 660} />
      ))}

      <g fill="none" stroke={LINE} strokeWidth="2" markerEnd="url(#dg-arrow-navy)">
        <path d="M 244 71 L 344 71" />
        <path d="M 554 71 L 654 71" />
      </g>

      <line x1="40" y1="250" x2="860" y2="250" stroke={LINE} strokeWidth="1.5" />

      {/* ZESTの関与は減り、社内の実行は増える */}
      <path d="M 40 160 L 860 244 L 40 244 Z" fill={ORANGE} opacity="0.22" />
      <path d="M 860 160 L 40 244 L 860 244 Z" fill={NAVY} opacity="0.18" />
      <path d="M 40 160 L 860 244" fill="none" stroke={ORANGE} strokeWidth="2.5" />
      <path d="M 40 244 L 860 160" fill="none" stroke={NAVY} strokeWidth="2.5" />

      <text x="96" y="152" fontSize="12" fontWeight="700" fill={ORANGE}>ZESTの関与</text>
      <text x="716" y="152" fontSize="12" fontWeight="700" fill={NAVY}>社内の実行</text>
      <text x="40" y="276" fontSize="12" fill={MUTED}>開始</text>
      <text x="828" y="276" fontSize="12" fill={MUTED}>自走</text>
      <text x="450" y="300" textAnchor="middle" fontSize="12" fontWeight="600" fill={TEXT}>
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

      <Box x={670} y={33} w={200} h={74} title="その場で自己解決" sub="問い合わせ数を抑える" />
      <Box x={670} y={227} w={200} h={74} title="担当者へエスカレーション" sub="Slackへ即時通知" accent />

      <EdgeLabel x={582} y={56} text="よくある質問" />
      <EdgeLabel x={582} y={250} text="検討度が高い相談" />

      <path d="M 770 301 L 770 324" fill="none" stroke={ORANGE} strokeWidth="2" markerEnd="url(#dg-arrow)" />
      <text x="790" y="322" fontSize="13" fontWeight="700" fill={ORANGE}>商談へ</text>
    </Figure>
  );
}
