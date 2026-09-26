import { redirect } from 'next/navigation';
import { buildTrackedUrl } from './destinations';

/** 個別コードなしの短縮リンク（例: /r/ai） */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ campaign: string }> }
) {
  const { campaign } = await params;
  redirect(buildTrackedUrl(campaign, null));
}
