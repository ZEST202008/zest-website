/**
 * インサイドセールス内製化支援：入口診断の設問定義
 *
 * 【このファイルの位置づけ】
 * 設問の文言・選択肢・配点はここだけで完結している。判定ロジック（scoring.ts）は
 * この定義を読むだけなので、文言や点数の調整でコードを触る必要はない。
 *
 * 設計書に「境目の点数は仮置き。実際の導入企業の感覚に合わせて調整します」とあるため、
 * 調整が前提の構造にしている。
 *
 * ⚠️ 設問の文言は草案。丹澤直紀さんのレビューで確定させること。
 *
 * 【文言の根拠】
 * 11問の逐語テキストは、設計書（診断書）にも9月版の設問ファイルにも存在しない。
 * そこで以下を突き合わせて起こしている。
 *   - 設計書の「質問項目と、聞く理由」「判定と目盛りの作り方」（配点・判定の構造はこれに準拠）
 *   - 9月版の12問（`wiki/sources/zest-2026-09-inside-sales-diagnosis-12q.md`）
 *     設計書に「9月Q1〜4→今回Q9／9月Q5→今回Q4・Q5／9月Q8→今回Q7／
 *     9月Q10→今回Q10／9月Q12→今回Q11」という対応が明記されており、
 *     引き継がれた設問は9月版の文体・選択肢に合わせてある。
 *
 * 文体は9月版に合わせて問いかけ（「〜ますか？」）で統一している。
 */

export type QuestionId = 'q1' | 'q2' | 'q3' | 'q4' | 'q5' | 'q6' | 'q7' | 'q8' | 'q9' | 'q10' | 'q11';

export interface Choice {
  value: string;
  label: string;
  /** 加点（単一選択の設問のみ） */
  score?: number;
}

export interface Question {
  id: QuestionId;
  /** 設問の並び順でのブロック。休眠顧客の話は最後に置く（設計方針） */
  block: '売上への意識' | '方法論' | '実績' | 'お取引先';
  text: string;
  /** 補足。空なら表示しない */
  note?: string;
  type: 'single' | 'multiple';
  choices: Choice[];
}

export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    block: '売上への意識',
    text: '今後1年、売上を上げることは経営の優先事項ですか？',
    type: 'single',
    choices: [
      { value: 'top', label: '最優先の課題です', score: 3 },
      { value: 'high', label: '重要な課題のひとつです', score: 2 },
      { value: 'mid', label: '余力があれば取り組みたい', score: 1 },
      { value: 'low', label: 'いまは他に優先することがあります', score: 0 },
    ],
  },
  {
    id: 'q2',
    block: '売上への意識',
    text: 'この1年で、売上を上げるために時間や費用を実際に使いましたか？',
    note: '「上げたい」と考えているかではなく、実際に動かしたかをお聞きしています。',
    type: 'single',
    choices: [
      { value: 'continuous', label: '継続的に使っています', score: 3 },
      { value: 'several', label: '何度か使いました', score: 2 },
      { value: 'little', label: '少しだけ使いました', score: 1 },
      { value: 'none', label: 'ほとんど使っていません', score: 0 },
    ],
  },
  {
    id: 'q3',
    block: '方法論',
    text: '売上を上げるために、いま取り組んでいることはどれですか？',
    type: 'multiple',
    choices: [
      { value: 'new_sales', label: '新規開拓の営業' },
      { value: 'ads', label: '広告・集客' },
      { value: 'existing', label: '既存のお取引先への働きかけ' },
      { value: 'dormant', label: '休眠のお取引先への働きかけ' },
      { value: 'product', label: '商品・サービスの改善' },
      { value: 'none', label: '特に取り組めていません' },
    ],
  },
  {
    id: 'q4',
    block: '方法論',
    text: 'その取り組みは、誰が・いつまでに・何をするかが決まっていますか？',
    type: 'single',
    choices: [
      { value: 'all', label: '担当・期限・やることが決まっています', score: 3 },
      { value: 'owner', label: '担当は決まっていますが、期限までは決めていません', score: 2 },
      { value: 'talked', label: '話は出ていますが、決まってはいません', score: 1 },
      { value: 'none', label: '決まっていません', score: 0 },
    ],
  },
  {
    id: 'q5',
    block: '方法論',
    text: 'その取り組みは、実際に動いていますか？',
    type: 'single',
    choices: [
      { value: 'on_track', label: '計画どおり動いています', score: 3 },
      { value: 'delayed', label: '動いていますが、遅れています', score: 2 },
      { value: 'stalled', label: '着手しましたが、止まっています', score: 1 },
      { value: 'not_started', label: '動いていません', score: 0 },
    ],
  },
  {
    id: 'q6',
    block: '実績',
    text: 'ここ3〜5年の売上は、どのように推移していますか？',
    type: 'single',
    choices: [
      { value: 'up', label: '増加しています' },
      { value: 'flat', label: 'ほぼ横ばいです' },
      { value: 'volatile', label: '増減が大きいです' },
      { value: 'down', label: '減少しています' },
    ],
  },
  {
    id: 'q7',
    block: '実績',
    text: '直近1年間の売上のうち、既存のお取引先からの売上はおおよそ何割だと思いますか？',
    type: 'single',
    // 選択肢の刻みは9月版Q8に準拠。「わからない」を残しているのは、
    // 答えられない人に無理な自己申告をさせないため（9月版の設計）
    choices: [
      { value: 'over70', label: '7割以上' },
      { value: '50to70', label: '5割〜7割' },
      { value: 'under50', label: '5割未満' },
      { value: 'unknown', label: 'わからない' },
    ],
  },
  {
    id: 'q8',
    block: '実績',
    text: '売上の伸び悩みを感じるのは、どのような場面ですか？',
    type: 'multiple',
    choices: [
      { value: 'no_new', label: '新規のお取引先が増えない' },
      { value: 'no_growth', label: '既存のお取引先の取引額が伸びない' },
      { value: 'no_hands', label: '営業に人手が足りない' },
      { value: 'no_target', label: '誰に何を提案すればよいか分からない' },
      { value: 'no_reason', label: '失注や取引が止まった理由が分からない' },
      { value: 'none', label: '特に伸び悩みは感じていません' },
    ],
  },
  {
    id: 'q9',
    block: 'お取引先',
    text: '取引が止まっているお取引先へ、連絡・フォローはされていますか？',
    note: '以前は取引があり、いまは止まっているお取引先のことです。',
    type: 'single',
    choices: [
      { value: 'regular', label: '決まった担当者が、定期的に連絡しています（月1回以上）' },
      { value: 'occasional', label: 'たまに連絡しています（数ヶ月に1回程度）' },
      { value: 'rare', label: 'ほとんど連絡していません' },
      { value: 'unknown', label: 'どこが止まっているか、把握できていません' },
    ],
  },
  {
    id: 'q10',
    block: 'お取引先',
    text: 'お取引先の情報は、誰が見ても分かるリストや台帳になっていますか？',
    type: 'single',
    choices: [
      { value: 'system', label: 'システムで一元管理しています' },
      { value: 'spreadsheet', label: 'ExcelやGoogleスプレッドシートで管理しています' },
      { value: 'scattered', label: '担当者ごとにバラバラに持っています' },
      { value: 'none', label: 'まとまった記録は残っていません' },
    ],
  },
  {
    id: 'q11',
    block: 'お取引先',
    text: 'お取引先へ継続的に連絡する役割は、どなたが担う想定ですか？',
    type: 'single',
    choices: [
      { value: 'dedicated', label: '専任を置く想定です' },
      { value: 'undecided', label: 'まだ決めていません' },
      { value: 'concurrent', label: '既存の社員が兼任する想定です' },
      { value: 'outsource', label: '外部に任せたいと考えています' },
    ],
  },
];

/** 回答の型。single は選択値、multiple は選択値の配列 */
export type Answers = Partial<Record<QuestionId, string | string[]>>;
