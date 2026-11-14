import type { ReactNode } from 'react';

// 組織づくり支援ページの図版。色はブランドの2色（オレンジ／ネイビー）に限定し、
// 文字は短く保って、詳しい説明は図の外のテキストに置いている。
const ORANGE = '#e04102';
const NAVY = '#1a2744';
const LINE = '#cbd5e1';
const TEXT = '#334155';
const MUTED = '#64748b';

function Figure({
  label,
  caption,
  viewBox = '0 0 900 340',
  minW = 'min-w-[680px]',
  children,
}: {
  label: string;
  caption?: string;
  viewBox?: string;
  minW?: string;
  children: ReactNode;
}) {
  return (
    <figure className="my-8 first:mt-0 last:mb-0">
      <div className="overflow-x-auto">
        <svg
          role="img"
          aria-label={label}
          viewBox={viewBox}
          className={`h-auto w-full ${minW}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <marker id="sz-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={ORANGE} />
            </marker>
            <marker id="sz-arrow-navy" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={NAVY} />
            </marker>
          </defs>
          {children}
        </svg>
      </div>
      {caption && <figcaption className="mt-3 text-center text-sm text-slate-500">{caption}</figcaption>}
    </figure>
  );
}

function Box({
  x, y, w, h, title, sub, accent = false, num,
}: { x: number; y: number; w: number; h: number; title: string; sub?: string; accent?: boolean; num?: string }) {
  return (
    <g>
      <rect
        x={x} y={y} width={w} height={h} rx="12"
        fill="#ffffff" stroke={accent ? ORANGE : LINE} strokeWidth={accent ? 2.5 : 1.5}
      />
      {num && (
        <>
          <circle cx={x + 24} cy={y + 24} r="13" fill={accent ? ORANGE : NAVY} />
          <text x={x + 24} y={y + 29} textAnchor="middle" fontSize="13" fontWeight="700" fill="#ffffff">{num}</text>
        </>
      )}
      <text x={x + w / 2} y={sub ? y + h / 2 + 2 : y + h / 2 + 5} textAnchor="middle" fontSize="15" fontWeight="700" fill={NAVY}>
        {title}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 24} textAnchor="middle" fontSize="12" fill={MUTED}>
          {sub}
        </text>
      )}
    </g>
  );
}

/** 集団から、組織へ。ばらばらに向く人と、同じ方向に揃った人の対比。 */
export function ShudanToSoshikiFigure() {
  // ばらばらの向き（集団）と、揃った向き（組織）
  const loose = [
    [78, 150, 28], [132, 118, -40], [186, 162, 74], [240, 124, 160],
    [96, 208, -15], [152, 196, 120], [212, 214, -70], [268, 178, 40],
  ];
  const tidy = [
    [600, 128], [664, 128], [728, 128], [792, 128],
    [600, 198], [664, 198], [728, 198], [792, 198],
  ];
  return (
    <Figure
      label="左は向きのばらばらな人の集まり（集団）、右は同じ方向に揃った人の集まり（組織）。目的と規律が共有されると向きが揃うことを示した図。"
      caption="図: 人が集まっているだけの集団と、目的と規律が共有された組織のちがい。"
      viewBox="0 0 900 280"
    >
      <rect x="40" y="40" width="300" height="212" rx="14" fill="#ffffff" stroke={LINE} strokeWidth="1.5" />
      <text x="190" y="74" textAnchor="middle" fontSize="15" fontWeight="700" fill={MUTED}>集団</text>
      <text x="190" y="95" textAnchor="middle" fontSize="12" fill={MUTED}>人の集まり</text>
      {loose.map(([x, y, deg]) => (
        <g key={`l-${x}-${y}`} transform={`rotate(${deg} ${x} ${y})`}>
          <circle cx={x} cy={y} r="7" fill={LINE} />
          <path d={`M ${x + 10} ${y} L ${x + 22} ${y}`} stroke={LINE} strokeWidth="2" markerEnd="url(#sz-arrow-navy)" opacity="0.35" />
        </g>
      ))}

      <path d="M 364 146 L 536 146" fill="none" stroke={ORANGE} strokeWidth="2.5" markerEnd="url(#sz-arrow)" />
      <text x="450" y="130" textAnchor="middle" fontSize="12" fontWeight="700" fill={TEXT}>目的と規律が</text>
      <text x="450" y="178" textAnchor="middle" fontSize="12" fontWeight="700" fill={TEXT}>共有・共感される</text>

      <rect x="560" y="40" width="300" height="212" rx="14" fill="#ffffff" stroke={ORANGE} strokeWidth="2.5" />
      <text x="710" y="74" textAnchor="middle" fontSize="15" fontWeight="700" fill={ORANGE}>組織</text>
      <text x="710" y="95" textAnchor="middle" fontSize="12" fill={MUTED}>目的と規律が明確で、全員に共有されている</text>
      {tidy.map(([x, y]) => (
        <g key={`t-${x}-${y}`}>
          <circle cx={x} cy={y} r="7" fill={ORANGE} opacity="0.85" />
          <path d={`M ${x + 10} ${y} L ${x + 24} ${y}`} stroke={ORANGE} strokeWidth="2" markerEnd="url(#sz-arrow)" />
        </g>
      ))}
    </Figure>
  );
}

/** 成果が、やる気を生む循環。 */
export function SeikaCycleFigure() {
  return (
    <Figure
      label="型の反復から成果が出て、成果がやりがいを生み、やりがいが創意工夫を生み、良い工夫が次の型になる循環。中心に組織が活性化すると置いた図。"
      caption="図: やる気を待つのではなく、型の反復で成果を出し、その成果が次のやる気を生む。"
      viewBox="0 0 900 360"
    >
      <Box x={355} y={19} w={190} h={62} title="型を反復する" accent />
      <Box x={675} y={149} w={190} h={62} title="成果が出る" />
      <Box x={355} y={279} w={190} h={62} title="創意工夫が生まれる" />
      <Box x={35} y={149} w={190} h={62} title="やりがいが生まれる" />

      {/* 4本とも同じ曲がり方になるよう、制御点を左右上下で鏡写しにしている */}
      <g fill="none" stroke={ORANGE} strokeWidth="2.5" markerEnd="url(#sz-arrow)">
        <path d="M 551 62 C 662 62, 764 92, 764 142" />
        <path d="M 764 218 C 764 268, 662 298, 551 298" />
        <path d="M 349 298 C 238 298, 136 268, 136 218" />
        <path d="M 136 142 C 136 92, 238 62, 349 62" />
      </g>

      <text x="656" y="112" textAnchor="middle" fontSize="12" fontWeight="600" fill={TEXT}>反復するから出る</text>
      <text x="656" y="254" textAnchor="middle" fontSize="12" fontWeight="600" fill={TEXT}>成果がやる気を生む</text>
      <text x="244" y="254" textAnchor="middle" fontSize="12" fontWeight="600" fill={TEXT}>型に工夫を盛り込む</text>
      <text x="244" y="112" textAnchor="middle" fontSize="12" fontWeight="600" fill={TEXT}>良い工夫が次の型に</text>

      <circle cx="450" cy="180" r="74" fill={ORANGE} opacity="0.08" />
      <text x="450" y="174" textAnchor="middle" fontSize="15" fontWeight="700" fill={NAVY}>組織が</text>
      <text x="450" y="196" textAnchor="middle" fontSize="15" fontWeight="700" fill={NAVY}>活性化する</text>
    </Figure>
  );
}

/** 組織づくりの構造。道しるべを屋根に、2本の柱が一つの出口につながる。 */
export function KouzouFigure() {
  return (
    <Figure
      label="道しるべを屋根に、人とチームと規律と仕組みの2本の柱が立ち、成果が出てやる気が生まれる一つの出口につながる構造図。"
      caption="図: 道しるべが方向を示し、人と規律の2本の柱が、成果とやる気という一つの出口につながる。"
      viewBox="0 0 900 340"
    >
      <rect x="140" y="20" width="620" height="76" rx="12" fill="#ffffff" stroke={ORANGE} strokeWidth="2.5" />
      <text x="450" y="52" textAnchor="middle" fontSize="16" fontWeight="700" fill={NAVY}>道しるべ（戦略・戦術）</text>
      <text x="450" y="76" textAnchor="middle" fontSize="12" fill={MUTED}>人が迷わず動ける方向を示す</text>

      <g fill="none" stroke={ORANGE} strokeWidth="2" markerEnd="url(#sz-arrow)">
        <path d="M 290 96 L 290 136" />
        <path d="M 610 96 L 610 136" />
      </g>

      <rect x="140" y="140" width="300" height="96" rx="12" fill="#ffffff" stroke={NAVY} strokeWidth="2" />
      <text x="290" y="174" textAnchor="middle" fontSize="15" fontWeight="700" fill={NAVY}>人とチーム</text>
      <text x="290" y="196" textAnchor="middle" fontSize="12" fontWeight="700" fill={ORANGE}>中心：評価</text>
      <text x="290" y="218" textAnchor="middle" fontSize="12" fill={MUTED}>人が生き生きと働き、育つ</text>

      <rect x="460" y="140" width="300" height="96" rx="12" fill="#ffffff" stroke={NAVY} strokeWidth="2" />
      <text x="610" y="174" textAnchor="middle" fontSize="15" fontWeight="700" fill={NAVY}>規律と仕組み</text>
      <text x="610" y="196" textAnchor="middle" fontSize="12" fontWeight="700" fill={ORANGE}>中心：型</text>
      <text x="610" y="218" textAnchor="middle" fontSize="12" fill={MUTED}>決めたことをやり切る</text>

      {/* 2本の柱は、どちらも真下の出口へ向ける */}
      <g fill="none" stroke={ORANGE} strokeWidth="2" markerEnd="url(#sz-arrow)">
        <path d="M 290 236 L 290 272" />
        <path d="M 610 236 L 610 272" />
      </g>

      <rect x="150" y="278" width="600" height="56" rx="12" fill={ORANGE} />
      <text x="450" y="302" textAnchor="middle" fontSize="15" fontWeight="700" fill="#ffffff">成果が出て、やる気が生まれる</text>
      <text x="450" y="323" textAnchor="middle" fontSize="12" fill="#ffffff" opacity="0.9">一人ひとりが自らを律して動く組織になる</text>
    </Figure>
  );
}

/** ZESTのマネジメント観。①→②→③→④→①の循環。 */
export function ManagementCycleFigure() {
  return (
    <Figure
      label="計画と調整、組織化と統率、委任と検証、承認と型化の4つが順にめぐり、4から1へ戻る循環。中心に一周ごとに型が残ると置いた図。"
      caption="図: 4つを一周するごとに、うまくいったやり方が型として残る。次の一周は、その型の上から始まる。"
      viewBox="0 0 900 360"
    >
      <Box x={350} y={16} w={200} h={70} title="計画と調整" sub="道しるべを示す" num="1" accent />
      <Box x={670} y={146} w={200} h={70} title="組織化と統率" sub="人とチームを率いる" num="2" />
      <Box x={350} y={276} w={200} h={70} title="委任と検証" sub="規律でやり切る" num="3" />
      <Box x={30} y={146} w={200} h={70} title="承認と型化" sub="成果を返し、型にする" num="4" />

      <g fill="none" stroke={ORANGE} strokeWidth="2.5" markerEnd="url(#sz-arrow)">
        <path d="M 556 60 C 666 60, 760 90, 760 140" />
        <path d="M 760 222 C 760 272, 666 302, 556 302" />
        <path d="M 344 302 C 234 302, 140 272, 140 222" />
      </g>
      {/* ④ → ① は太く描いて、一周して戻ることをはっきり見せる */}
      <path d="M 140 140 C 140 90, 234 60, 344 60" fill="none" stroke={ORANGE} strokeWidth="4" markerEnd="url(#sz-arrow)" />
      <text x="246" y="112" textAnchor="middle" fontSize="12" fontWeight="700" fill={NAVY}>型の上から、次の一周</text>

      <circle cx="450" cy="181" r="78" fill={ORANGE} opacity="0.08" />
      <text x="450" y="175" textAnchor="middle" fontSize="15" fontWeight="700" fill={NAVY}>一周ごとに</text>
      <text x="450" y="197" textAnchor="middle" fontSize="15" fontWeight="700" fill={NAVY}>型が残る</text>
    </Figure>
  );
}

/** インサイトレポートの5つの工程。 */
export function InsightProcessFigure() {
  const steps = [
    { x: 24, title: '事前シート', sub: 'テーマを決める' },
    { x: 196, title: 'ヒアリング', sub: '1時間×2〜3回' },
    { x: 368, title: '壁打ち', sub: 'テーマごとに重ねる', accent: true },
    { x: 540, title: '整理・提出', sub: '約1か月で提出' },
    { x: 712, title: 'フィックス', sub: '確認して納品' },
  ];
  return (
    <Figure
      label="事前シート、ヒアリング、テーマごとの壁打ち、整理と提出、フィックスの5つの工程が左から右へ進む図。中心の壁打ちを強調している。"
      caption="図: 答えを渡すのではなく、問いで構想を引き出し、対話のなかで発展させる5工程。"
      viewBox="0 0 900 160"
    >
      {steps.map((s, i) => (
        <g key={s.title}>
          <rect
            x={s.x} y={s.accent ? 44 : 56} width="164" height={s.accent ? 92 : 68} rx="12"
            fill="#ffffff" stroke={s.accent ? ORANGE : LINE} strokeWidth={s.accent ? 2.5 : 1.5}
          />
          <text x={s.x + 82} y={s.accent ? 82 : 86} textAnchor="middle" fontSize="15" fontWeight="700" fill={s.accent ? ORANGE : NAVY}>
            {s.title}
          </text>
          <text x={s.x + 82} y={s.accent ? 104 : 108} textAnchor="middle" fontSize="12" fill={MUTED}>{s.sub}</text>
          {s.accent && (
            <text x={s.x + 82} y={126} textAnchor="middle" fontSize="11" fontWeight="700" fill={ORANGE}>ここが中心</text>
          )}
          {i < steps.length - 1 && (
            <path d={`M ${s.x + 168} 90 L ${s.x + 190} 90`} fill="none" stroke={ORANGE} strokeWidth="2" markerEnd="url(#sz-arrow)" />
          )}
        </g>
      ))}
    </Figure>
  );
}
