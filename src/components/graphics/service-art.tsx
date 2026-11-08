import type { CSSProperties } from 'react';

// サービスページのヒーロー横に置く装飾ビジュアル。
// 情報は本文側にあるため aria-hidden。中身は rb-part で順に出す（リボン図と同じ仕組み）。
const ORANGE = '#e04102';
const NAVY = '#1a2744';
const LINE = '#cbd5e1';
const FAINT = '#e2e8f0';

const part = (ms: number) => ({ '--rb': `${ms}ms` }) as CSSProperties;

const svgProps = {
  'aria-hidden': true as const,
  className: 'w-full h-auto',
  xmlns: 'http://www.w3.org/2000/svg',
};

/** カチカタ: 散らばった行動 → センターピン → 揃った型 */
export function KachikataArt() {
  const cloud = [
    [34, 92], [72, 64], [26, 148], [66, 124], [40, 200],
    [84, 176], [104, 108], [58, 238], [100, 214], [20, 118],
  ];
  return (
    <svg {...svgProps} viewBox="0 0 420 300">
      <defs>
        <marker id="ka-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={ORANGE} />
        </marker>
      </defs>

      <g className="rb-part" style={part(0)}>
        {cloud.map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5.5" fill={LINE} />
        ))}
      </g>

      <g className="rb-part" style={part(160)} stroke={LINE} strokeWidth="1" opacity="0.7">
        {cloud.slice(0, 6).map(([cx, cy]) => (
          <line key={`l-${cx}-${cy}`} x1={cx} y1={cy} x2="168" y2="150" />
        ))}
      </g>

      <g className="rb-part" style={part(340)}>
        <circle cx="196" cy="150" r="52" fill={ORANGE} opacity="0.1" />
        <circle cx="196" cy="150" r="34" fill="#ffffff" stroke={ORANGE} strokeWidth="2.5" />
        <circle cx="196" cy="150" r="12" fill={ORANGE} />
      </g>

      <line
        className="rb-part" style={part(500)}
        x1="240" y1="150" x2="276" y2="150"
        stroke={ORANGE} strokeWidth="2" markerEnd="url(#ka-arrow)"
      />

      <g className="rb-part" style={part(620)}>
        {[96, 132, 168, 204].map((y) => (
          <rect key={y} x="296" y={y} width="104" height="18" rx="9" fill={NAVY} />
        ))}
      </g>
    </svg>
  );
}

/** SheetViz: 1つのシートを3つの役割で使う */
export function SheetVizArt() {
  const cards = [14, 157, 300];
  return (
    <svg {...svgProps} viewBox="0 0 420 300">
      <g className="rb-part" style={part(0)}>
        <rect x="108" y="20" width="204" height="82" rx="12" fill="#ffffff" stroke={NAVY} strokeWidth="2" />
        <rect x="108" y="20" width="204" height="24" rx="12" fill={NAVY} opacity="0.08" />
        <line x1="108" y1="62" x2="312" y2="62" stroke={FAINT} strokeWidth="1.5" />
        <line x1="108" y1="82" x2="312" y2="82" stroke={FAINT} strokeWidth="1.5" />
        <line x1="159" y1="44" x2="159" y2="102" stroke={FAINT} strokeWidth="1.5" />
        <line x1="210" y1="44" x2="210" y2="102" stroke={FAINT} strokeWidth="1.5" />
        <line x1="261" y1="44" x2="261" y2="102" stroke={FAINT} strokeWidth="1.5" />
        <circle cx="128" cy="32" r="5" fill={ORANGE} />
      </g>

      <g className="rb-part" style={part(200)} stroke={ORANGE} strokeWidth="1.8" fill="none" opacity="0.85">
        <path d="M 210 102 L 210 146" />
        <path d="M 67 186 L 67 162 Q 67 146 83 146 L 337 146 Q 353 146 353 162 L 353 186" />
      </g>

      <g className="rb-part" style={part(400)}>
        {cards.map((x) => (
          <g key={x}>
            <rect x={x} y="190" width="106" height="82" rx="12" fill="#ffffff" stroke={LINE} strokeWidth="1.5" />
            <rect x={x + 16} y="208" width="34" height="7" rx="3.5" fill={ORANGE} />
            <rect x={x + 16} y="226" width="74" height="6" rx="3" fill={FAINT} />
            <rect x={x + 16} y="240" width="58" height="6" rx="3" fill={FAINT} />
            <rect x={x + 16} y="254" width="66" height="6" rx="3" fill={FAINT} />
          </g>
        ))}
      </g>
    </svg>
  );
}

/** インサイドセールス内製化: 眠っている顧客を引き上げて商談にする */
export function InsideSalesArt() {
  const pool = [
    [34, 246], [60, 258], [86, 248], [112, 260], [138, 250],
    [46, 272], [72, 280], [98, 272], [124, 280],
  ];
  return (
    <svg {...svgProps} viewBox="0 0 420 300">
      <defs>
        <marker id="is-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={ORANGE} />
        </marker>
      </defs>

      <g className="rb-part" style={part(0)}>
        {pool.map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="7" fill={LINE} />
        ))}
      </g>

      <path
        className="rb-part" style={part(220)}
        d="M 56 236 Q 170 44 290 110"
        fill="none" stroke={ORANGE} strokeWidth="2.5" markerEnd="url(#is-arrow)"
      />

      <g className="rb-part" style={part(420)}>
        {[[118, 142], [182, 92], [246, 86]].map(([cx, cy]) => (
          <circle key={cx} cx={cx} cy={cy} r="6" fill="#ffffff" stroke={ORANGE} strokeWidth="2.5" />
        ))}
      </g>

      <g className="rb-part" style={part(580)}>
        <rect x="300" y="78" width="100" height="72" rx="12" fill="#ffffff" stroke={ORANGE} strokeWidth="2.5" />
        <circle cx="350" cy="106" r="14" fill={ORANGE} />
        <path d="M 344 106 L 349 111 L 357 101" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="322" y="128" width="56" height="7" rx="3.5" fill={FAINT} />
      </g>
    </svg>
  );
}

/** AIチャットアシスタント: 離脱していた訪問者を会話で商談につなぐ */
export function AiChatArt() {
  return (
    <svg {...svgProps} viewBox="0 0 420 300">
      <defs>
        <marker id="ac-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={ORANGE} />
        </marker>
        <marker id="ac-arrow-grey" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={LINE} />
        </marker>
      </defs>

      <g className="rb-part" style={part(0)}>
        <rect x="18" y="56" width="236" height="162" rx="12" fill="#ffffff" stroke={LINE} strokeWidth="1.5" />
        <line x1="18" y1="84" x2="254" y2="84" stroke={FAINT} strokeWidth="1.5" />
        {[34, 50, 66].map((cx) => (
          <circle key={cx} cx={cx} cy="70" r="4" fill={LINE} />
        ))}
        <rect x="40" y="106" width="118" height="9" rx="4.5" fill={FAINT} />
        <rect x="40" y="126" width="168" height="7" rx="3.5" fill={FAINT} />
        <rect x="40" y="142" width="142" height="7" rx="3.5" fill={FAINT} />
      </g>

      <path
        className="rb-part" style={part(200)}
        d="M 150 100 Q 260 48 384 36"
        fill="none" stroke={LINE} strokeWidth="2" strokeDasharray="6 6" markerEnd="url(#ac-arrow-grey)"
      />

      <g className="rb-part" style={part(380)}>
        <rect x="150" y="160" width="104" height="58" rx="14" fill={ORANGE} />
        <path d="M 170 218 L 168 236 L 190 218 Z" fill={ORANGE} />
        <rect x="166" y="180" width="60" height="7" rx="3.5" fill="#ffffff" opacity="0.95" />
        <rect x="166" y="195" width="44" height="7" rx="3.5" fill="#ffffff" opacity="0.6" />
      </g>

      <path
        className="rb-part" style={part(540)}
        d="M 254 196 Q 292 212 304 232"
        fill="none" stroke={ORANGE} strokeWidth="2.5" markerEnd="url(#ac-arrow)"
      />

      <g className="rb-part" style={part(680)}>
        <rect x="298" y="196" width="104" height="72" rx="12" fill="#ffffff" stroke={ORANGE} strokeWidth="2.5" />
        <circle cx="324" cy="222" r="11" fill={ORANGE} opacity="0.18" />
        <circle cx="324" cy="222" r="5" fill={ORANGE} />
        <rect x="344" y="217" width="40" height="7" rx="3.5" fill={FAINT} />
        <rect x="318" y="244" width="66" height="7" rx="3.5" fill={FAINT} />
      </g>
    </svg>
  );
}
