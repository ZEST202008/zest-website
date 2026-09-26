import { redirect } from 'next/navigation';
import { buildTrackedUrl } from '../destinations';

/**
 * 企業ごとの追跡コード付き短縮リンク（例: /r/ai/e7k2m）。
 *
 * コードは営業リスト側で採番した不透明な文字列で、サーバーは中身を解釈しない。
 * そのままGA4の utm_content として渡し、どの企業がLPに到達したかは
 * 手元の営業リストと突き合わせて判断する。
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ campaign: string; code: string }> }
) {
  const { campaign, code } = await params;
  redirect(buildTrackedUrl(campaign, code));
}
