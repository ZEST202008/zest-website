import Anthropic from '@anthropic-ai/sdk';

// 将来 Managed Agents へ移行する際もこのツール定義はそのまま再利用できる
export const TOOLS: Anthropic.Tool[] = [
  {
    name: 'escalate_to_slack',
    description:
      '担当者への引き継ぎが必要な場合にSlackへ通知する。お客様が担当者との対話を希望する場合、詳細な見積もり・導入相談、苦情、3往復以上解決できない場合などに使用する。',
    input_schema: {
      type: 'object' as const,
      properties: {
        reason: {
          type: 'string',
          description:
            'エスカレーションの理由（例：「お客様がカチカタの詳細な料金見積もりを希望しています」）',
        },
      },
      required: ['reason'],
    },
  },
];
