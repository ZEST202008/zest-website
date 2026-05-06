import Anthropic from '@anthropic-ai/sdk';

// 将来 Managed Agents へ移行する際もこのツール定義はそのまま再利用できる
export const TOOLS: Anthropic.Tool[] = [
  {
    name: 'escalate_to_slack',
    description:
      '担当者への引き継ぎが必要な場合にSlackへ通知する。お客様が担当者との対話を希望する場合、詳細な見積もり・導入相談、苦情、3往復以上解決できない場合などに使用する。このツールを呼び出す前に、必ずお客様の名前・メールアドレスを会話で収集すること。',
    input_schema: {
      type: 'object' as const,
      properties: {
        reason: {
          type: 'string',
          description:
            'エスカレーションの理由（例：「お客様がカチカタの詳細な料金見積もりを希望しています」）',
        },
        name: {
          type: 'string',
          description: 'お客様の名前（会話中に収集した値）',
        },
        email: {
          type: 'string',
          description: 'お客様のメールアドレス（会話中に収集した値）',
        },
        company: {
          type: 'string',
          description: 'お客様の会社名（会話中に収集した場合）',
        },
      },
      required: ['reason'],
    },
  },
];
