import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/kv';

/**
 * 営業入口（着地ページ）の問い合わせ受け口。
 *
 * 資料請求・オンライン打ち合わせの申込・診断からのホット案件を1本で受け、Slackへ通知する。
 * 設計書では「『担当者と話したい』の押下と、診断を経ないオンライン申込を
 * ホット案件の合図にする」とされているため、どちらの経路かを必ず通知に含める。
 *
 * パスに is が残っているのは、インサイドセールス向けに先に作ったため。
 * いまは AIチャットアシスタントの着地ページからも同じ口に送っており、
 * どちらの案件かは service フィールドで区別する。
 */

const SLACK_WEBHOOK_URL = process.env.SLACK_IS_WEBHOOK_URL ?? process.env.SLACK_WEBHOOK_URL ?? '';

type LeadType = 'document' | 'meeting';
type ServiceId = 'inside-sales' | 'ai-chat';

const SERVICE_LABEL: Record<ServiceId, string> = {
  'inside-sales': 'インサイドセールス内製化',
  'ai-chat': 'AIチャットアシスタント',
};

interface LeadPayload {
  type: LeadType;
  /** どちらの案件か。未指定なら先に作ったインサイドセールスとみなす */
  service?: ServiceId;
  company?: string;
  name?: string;
  email?: string;
  /** 診断を経由したか。設計書で区別が求められている */
  viaDiagnosis?: boolean;
  /** 診断の判定（経由した場合） */
  verdict?: string;
  /** 予約時に聞く項目。設問はサービスごとに違うため、ラベルと回答の組で受ける */
  answers?: { label: string; value: string }[];
  note?: string;
}

const TYPE_LABEL: Record<LeadType, string> = {
  document: '📄 サービス概要の資料請求',
  meeting: '📅 オンライン打ち合わせの申込',
};

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  if (await checkRateLimit(ip, 'rl:is-lead', 5, 60)) {
    return NextResponse.json(
      { error: 'リクエストが多すぎます。少し時間をおいてお試しください。' },
      { status: 429 }
    );
  }

  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: '不正なリクエストです。' }, { status: 400 });
  }

  if (body.type !== 'document' && body.type !== 'meeting') {
    return NextResponse.json({ error: '不正なリクエストです。' }, { status: 400 });
  }
  if (!body.company?.trim() || !body.email?.trim()) {
    return NextResponse.json({ error: '会社名とメールアドレスをご入力ください。' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json({ error: 'メールアドレスの形式をご確認ください。' }, { status: 400 });
  }

  const service: ServiceId = body.service === 'ai-chat' ? 'ai-chat' : 'inside-sales';
  const hot = body.type === 'meeting';
  const route = body.viaDiagnosis
    ? `診断経由${body.verdict ? `（判定${body.verdict}）` : ''}`
    : '診断を経ずに直接';

  const fields = [
    `*案件:*\n${SERVICE_LABEL[service]}`,
    `*種別:*\n${TYPE_LABEL[body.type]}`,
    `*経路:*\n${route}`,
    `*会社名:*\n${body.company}`,
    `*メールアドレス:*\n${body.email}`,
    body.name ? `*お名前:*\n${body.name}` : null,
    ...(body.answers ?? []).map((a) => `*${a.label}:*\n${a.value}`),
  ].filter(Boolean) as string[];

  if (SLACK_WEBHOOK_URL) {
    try {
      await fetch(SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `${hot ? '🔥 ' : ''}${SERVICE_LABEL[service]}：${TYPE_LABEL[body.type]}`,
          blocks: [
            {
              type: 'header',
              text: {
                type: 'plain_text',
                text: `${hot ? '🔥 打ち合わせの申込' : '📄 資料請求'}（${SERVICE_LABEL[service]}）`,
                emoji: true,
              },
            },
            { type: 'section', fields: fields.map((text) => ({ type: 'mrkdwn', text })) },
            ...(body.note
              ? [{ type: 'section', text: { type: 'mrkdwn', text: `*ご記入内容:*\n${body.note}` } }]
              : []),
          ],
        }),
      });
    } catch (err) {
      // 通知に失敗しても申込自体は成立させる（取りこぼしを避ける）
      console.error('[is-lead] Slack通知に失敗:', err);
    }
  } else {
    console.warn('[is-lead] SLACK_IS_WEBHOOK_URL / SLACK_WEBHOOK_URL が未設定のため通知をスキップしました');
  }

  return NextResponse.json({ ok: true });
}
