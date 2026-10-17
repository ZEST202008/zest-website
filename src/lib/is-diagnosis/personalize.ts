/**
 * 着地ページへの企業名・社歴の差し込み。
 *
 * 設計書では gBizINFO から社名と設立年を差し込む想定だが、
 * 実測では gBizINFO の設立年の充足率は7%（企業サイトからでも29%）しかない。
 * 差し込めないほうが多数派なので、無い場合に自然に読める文面へ倒す。
 */

export interface Personalization {
  company: string | null;
  /** 創業からの年数。設立年が取れた場合のみ */
  years: number | null;
}

export function readPersonalization(params: URLSearchParams): Personalization {
  const company = params.get('company')?.trim() || null;
  const estRaw = params.get('est')?.trim();
  let years: number | null = null;
  if (estRaw) {
    const year = Number(estRaw.slice(0, 4));
    const now = new Date().getFullYear();
    // 明らかに不正な値は差し込まない
    if (Number.isFinite(year) && year >= 1800 && year <= now) years = now - year;
  }
  return { company, years };
}

/** 書き出しの一文。差し込める情報の量に応じて3段階 */
export function buildIntro(p: Personalization): string {
  if (p.company && p.years !== null) {
    return `${p.company}様は、創業${p.years}年。その年月の分だけ、お取引先との関係が積み重なっています。`;
  }
  if (p.company) {
    return `${p.company}様がこれまで積み重ねてこられた、お取引先との関係についてお聞きします。`;
  }
  return 'これまで積み重ねてこられた、お取引先との関係についてお聞きします。';
}
