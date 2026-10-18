/**
 * 入口診断の採点と判定。
 *
 * 設計書の「判定と目盛りの作り方」をそのまま実装している。
 * 閾値は THRESHOLDS に集約してあり、実際の導入企業の感覚に合わせて調整できる。
 *
 * 【設計上の原則】
 * - 金額は出さない。「眠っている売上◯円」のような数字は返さない
 *   （単価が業界・会社で大きく違い、根拠のない数字になるため）
 * - 必ず「有効」と出す作りにしない。該当すればCを理由付きで返す
 */

import { QUESTIONS, type Answers, type QuestionId } from './questions';

/** 調整しやすいように閾値を1か所へ集約（設計書では「仮置き」とされている） */
export const THRESHOLDS = {
  /** 意識・方法論の3段階（この値以上で高／中） */
  high: 5,
  mid: 3,
  /** 判定Aに必要な伸びしろの点数 */
  upsideForA: 3,
} as const;

export type Level = '高' | '中' | '低';
export type DormantCare = '十分' | '部分的' | 'ほぼなし';
export type Verdict = 'A' | 'B' | 'C';

export interface DiagnosisResult {
  verdict: Verdict;
  /** 4つの目盛り */
  awareness: { score: number; max: number; level: Level };
  method: { score: number; max: number; level: Level };
  momentum: { level: Level; label: string };
  dormantCare: DormantCare;
  /** 伸びしろの点数（0〜5）と、その内訳 */
  upside: { score: number; max: number; reasons: string[] };
  /** 判定の根拠。結果画面に出して納得感を担保する */
  rationale: string[];
}

function single(answers: Answers, id: QuestionId): string | null {
  const v = answers[id];
  return typeof v === 'string' ? v : null;
}

function multiple(answers: Answers, id: QuestionId): string[] {
  const v = answers[id];
  return Array.isArray(v) ? v : [];
}

/** 単一選択の設問から配点を引く */
function scoreOf(answers: Answers, id: QuestionId): number {
  const value = single(answers, id);
  if (!value) return 0;
  const q = QUESTIONS.find((x) => x.id === id);
  return q?.choices.find((c) => c.value === value)?.score ?? 0;
}

function toLevel(score: number): Level {
  if (score >= THRESHOLDS.high) return '高';
  if (score >= THRESHOLDS.mid) return '中';
  return '低';
}

/** 全問に回答済みか */
export function isComplete(answers: Answers): boolean {
  return QUESTIONS.every((q) => {
    const v = answers[q.id];
    return q.type === 'multiple' ? Array.isArray(v) && v.length > 0 : typeof v === 'string' && v !== '';
  });
}

export function evaluate(answers: Answers): DiagnosisResult {
  // ── 意識：Q1+Q2（0〜6）──
  const awarenessScore = scoreOf(answers, 'q1') + scoreOf(answers, 'q2');

  // ── 方法論：Q4+Q5 に、Q3で手段を1つ以上選んでいれば+1（0〜7）──
  const measures = multiple(answers, 'q3').filter((v) => v !== 'none');
  const methodScore = scoreOf(answers, 'q4') + scoreOf(answers, 'q5') + (measures.length > 0 ? 1 : 0);

  // ── 勢い：Q6 ──
  const q6 = single(answers, 'q6');
  const momentumMap: Record<string, { level: Level; label: string }> = {
    up: { level: '高', label: '増加しています' },
    flat: { level: '中', label: 'ほぼ横ばいです' },
    volatile: { level: '中', label: '増減が大きい状態です' },
    down: { level: '低', label: '減少しています' },
  };
  const momentum = momentumMap[q6 ?? 'flat'] ?? momentumMap.flat;

  // ── 休眠顧客への手当て：Q9 ──
  const q9 = single(answers, 'q9');
  const dormantCare: DormantCare =
    q9 === 'regular' ? '十分' : q9 === 'occasional' ? '部分的' : 'ほぼなし';

  // ── 伸びしろ（0〜5）──
  const upsideReasons: string[] = [];
  if (q6 !== 'up') upsideReasons.push('売上が増加の局面にない');
  if (scoreOf(answers, 'q4') <= 1) upsideReasons.push('誰がいつまでに何をするかが決まっていない');
  if (scoreOf(answers, 'q5') <= 1) upsideReasons.push('決めたことが動いていない');
  if (!measures.includes('existing') && !measures.includes('dormant')) {
    upsideReasons.push('既存・休眠のお取引先への働きかけが手段に入っていない');
  }
  if (dormantCare === 'ほぼなし') upsideReasons.push('取引が止まったお取引先に、ほとんど連絡できていない');

  // ── 取引履歴 ──
  const q10 = single(answers, 'q10');
  const hasLedger = q10 === 'system' || q10 === 'spreadsheet';
  const ledgerScattered = q10 === 'scattered';

  // ── 担い手：Q11 ──
  const q11 = single(answers, 'q11');
  const ownerIsConcurrent = q11 === 'concurrent';
  const ownerOk = q11 === 'dedicated' || q11 === 'undecided';

  const awarenessLevel = toLevel(awarenessScore);
  const methodLevel = toLevel(methodScore);

  // ── 判定 ──
  // Cの条件に1つでも該当すれば、無理に「有効」とは出さない（設計方針）
  const rationale: string[] = [];
  let verdict: Verdict;

  const cReasons: string[] = [];
  if (awarenessLevel === '低') cReasons.push('売上を上げることが、いまの優先事項になっていない');
  if (q10 === 'none') cReasons.push('これまでの取引の記録がまとまって残っていない');
  if (dormantCare === '十分') cReasons.push('取引が止まったお取引先に、決まった担当者が定期的に連絡できている');

  const aConditions =
    awarenessLevel === '高' &&
    upsideReasons.length >= THRESHOLDS.upsideForA &&
    (hasLedger || ledgerScattered) &&
    dormantCare !== '十分' &&
    ownerOk;

  if (cReasons.length > 0) {
    verdict = 'C';
    rationale.push(...cReasons);
  } else if (aConditions) {
    verdict = 'A';
    rationale.push(
      '売上を上げることが優先事項に入っている',
      `手が回っていない領域が${upsideReasons.length}つある`,
      hasLedger ? '取引の記録が残っている' : '取引の記録は担当者ごとに分かれているが残っている',
      '取引が止まったお取引先への定期的な連絡が、まだ仕組みになっていない'
    );
  } else {
    verdict = 'B';
    if (ownerIsConcurrent) {
      rationale.push('継続的に連絡する役割を既存社員が兼任する想定になっている');
    }
    if (awarenessLevel === '中') rationale.push('売上を上げることの優先度が、最上位ではない');
    if (upsideReasons.length < THRESHOLDS.upsideForA) {
      rationale.push('いまの取り組みが一定程度回っている');
    }
    if (q11 === 'outsource') rationale.push('外部に任せる前提になっている');
    if (rationale.length === 0) rationale.push('条件の一部が整っていない');
  }

  return {
    verdict,
    awareness: { score: awarenessScore, max: 6, level: awarenessLevel },
    method: { score: methodScore, max: 7, level: methodLevel },
    momentum,
    dormantCare,
    upside: { score: upsideReasons.length, max: 5, reasons: upsideReasons },
    rationale,
  };
}

/** 判定ごとの見出しと、次に案内する出口（設計書の判定ルールに対応） */
export const VERDICT_PRESENTATION: Record<
  Verdict,
  { heading: string; summary: string; primaryCta: 'meeting' | 'forward'; ctaLabel: string }
> = {
  A: {
    heading: 'インサイドセールスが有効です',
    summary:
      '売上を上げる意思があり、取引の記録も残っている一方で、取引が止まったお取引先へ継続的に連絡する役割が、まだ仕組みになっていません。ここは、社内に仕組みを置くことで動かせる領域です。',
    primaryCta: 'meeting',
    ctaLabel: 'オンラインで担当者と話したい',
  },
  B: {
    heading: '条件を整えることが、成果を出す前提です',
    summary:
      '取り組む意思はありますが、このまま始めても成果が出にくい条件が残っています。とくに、継続的に連絡する役割を既存の社員が兼任する形は、他の業務に押されて続かなくなります。先に整えるべきことがあります。',
    primaryCta: 'meeting',
    ctaLabel: '条件の整え方を、オンラインで相談したい',
  },
  C: {
    heading: '今は導入をおすすめしません',
    summary:
      '現時点では、インサイドセールスの仕組みを入れても効果が出にくい状態です。費用をかける前に、先に取り組んだほうがよいことがあります。',
    primaryCta: 'forward',
    ctaLabel: 'この結果を社内で共有する',
  },
};
