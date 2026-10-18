/**
 * 入口診断の判定分布をシミュレーションする。
 *
 * 閾値や判定ルールを変えたとき、A/B/Cがどう出るかを勘ではなく数字で確かめるための道具。
 * 設計書に「境目の点数は仮置き。実際の導入企業の感覚に合わせて調整する」とあるため、
 * 調整のたびにこれを回して影響を見る。
 *
 * 使い方:
 *   npm run simulate:diagnosis
 *
 * 出力は2種類。
 *   1. 全数列挙  … 全選択肢が等確率という仮定。ルールの感度を見る
 *   2. 加重      … ICPに沿った現実的な回答分布。実際に近い分布を見る
 */

import { evaluate } from '../src/lib/is-diagnosis/scoring.ts';

const FIXED = { q7: 'over70', q8: ['no_new'] };

const OPTIONS = {
  q1: ['top', 'high', 'mid', 'low'],
  q2: ['continuous', 'several', 'little', 'none'],
  q3: [['existing'], ['new_sales']],
  q4: ['all', 'owner', 'talked', 'none'],
  q5: ['on_track', 'delayed', 'stalled', 'not_started'],
  q6: ['up', 'flat', 'volatile', 'down'],
  q9: ['regular', 'occasional', 'rare', 'unknown'],
  q10: ['system', 'spreadsheet', 'scattered', 'none'],
  q11: ['dedicated', 'undecided', 'concurrent', 'outsource'],
};

/**
 * ICP（休眠取引先が豊富で、専任を置けていない売上5〜10億のBtoB）に沿った
 * 回答分布の仮定。実データが集まったら実測値へ差し替えること。
 */
const WEIGHTS = {
  q1: { top: 0.3, high: 0.4, mid: 0.2, low: 0.1 },
  q2: { continuous: 0.15, several: 0.35, little: 0.35, none: 0.15 },
  q3: { existing: 0.35, new_sales: 0.65 },
  q4: { all: 0.15, owner: 0.25, talked: 0.35, none: 0.25 },
  q5: { on_track: 0.1, delayed: 0.3, stalled: 0.35, not_started: 0.25 },
  q6: { up: 0.25, flat: 0.4, volatile: 0.2, down: 0.15 },
  q9: { regular: 0.05, occasional: 0.25, rare: 0.45, unknown: 0.25 },
  q10: { system: 0.2, spreadsheet: 0.4, scattered: 0.3, none: 0.1 },
  q11: { dedicated: 0.15, undecided: 0.45, concurrent: 0.3, outsource: 0.1 },
};

function report(title, acc, reasons) {
  console.log(`\n── ${title} ──`);
  for (const v of ['A', 'B', 'C']) {
    const pct = acc[v] * 100;
    console.log(`  ${v}: ${pct.toFixed(1).padStart(5)}%  ${'#'.repeat(Math.round(pct / 2))}`);
  }
  if (reasons && Object.keys(reasons).length > 0) {
    console.log('  C判定の理由（重複あり・全体に対する割合）');
    for (const [r, w] of Object.entries(reasons).sort((a, b) => b[1] - a[1])) {
      console.log(`    ${(w * 100).toFixed(1).padStart(5)}%  ${r}`);
    }
  }
}

function run(weighted) {
  const keys = Object.keys(OPTIONS);
  const acc = { A: 0, B: 0, C: 0 };
  const reasons = {};

  (function walk(i, answers, weight) {
    if (i === keys.length) {
      const r = evaluate({ ...answers, ...FIXED });
      acc[r.verdict] += weight;
      if (r.verdict === 'C') for (const x of r.rationale) reasons[x] = (reasons[x] ?? 0) + weight;
      return;
    }
    const key = keys[i];
    for (const value of OPTIONS[key]) {
      const plain = Array.isArray(value) ? value[0] : value;
      const p = weighted ? WEIGHTS[key][plain] : 1 / OPTIONS[key].length;
      walk(i + 1, { ...answers, [key]: value }, weight * p);
    }
  })(0, {}, 1);

  return { acc, reasons };
}

const uniform = run(false);
report('全数列挙（全選択肢が等確率・ルールの感度を見る）', uniform.acc, uniform.reasons);

const realistic = run(true);
report('ICPに沿った回答分布（実態に近い）', realistic.acc, realistic.reasons);

console.log('\n目安: Cが多すぎると入口施策が機能せず、少なすぎると');
console.log('「必ず有効と出す作り」になって信頼を失う。2〜3割が健全。');
