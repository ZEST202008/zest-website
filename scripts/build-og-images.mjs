// OGP画像（1200x630）をSVGから書き出す。
// 生成物 public/og/*.png はコミット済みなので、文言やデザインを変えたいときだけ
// `node scripts/build-og-images.mjs` を実行する。
// 日本語の字形はローカルの Hiragino Sans を使って描画するため、macOS 上で実行すること。
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const W = 1200;
const H = 630;
const NAVY = '#1a2744';
const ORANGE = '#e04102';
const FONT = 'Hiragino Sans, Noto Sans JP, sans-serif';

const CARDS = [
  {
    file: 'default',
    title: ['経営コンサルティング', '× データ活用'],
    sub: '中小企業の稼ぐ力そのものをつくる。',
  },
  {
    file: 'about',
    title: ['「勝ち」と「価値」を、', '組織の力に変える'],
    sub: '株式会社ZEST 会社概要',
  },
  {
    file: 'soshikizukuri',
    title: ['集団から、', '組織へ。'],
    sub: '組織づくり支援｜成果が出るから、仕事は楽しくなる。',
  },
  {
    file: 'kachikata',
    title: ['属人性を排し、', '再現性を極める。'],
    sub: 'カチカタ｜KFS特定・営業の型化サービス',
  },
  {
    file: 'sheetviz',
    title: ['1つのデータ、', '3つの役割に最適化。'],
    sub: 'SheetViz｜Google Sheetsベース営業支援プラットフォーム',
  },
  {
    file: 'inside-sales',
    title: ['休眠顧客を、', '確実な商談機会に。'],
    sub: 'インサイドセールス内製化プログラム',
  },
  {
    file: 'ai-chat-assistant',
    title: ['見えない機会損失を、', '商談機会へ。'],
    sub: 'AIチャットアシスタント',
  },
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function background() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="${ORANGE}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="${ORANGE}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#3b5fa4" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#3b5fa4" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${NAVY}"/>
  <circle cx="1120" cy="560" r="420" fill="url(#glow)"/>
  <circle cx="140" cy="60" r="320" fill="url(#glow2)"/>
  <rect x="0" y="${H - 10}" width="${W}" height="10" fill="${ORANGE}"/>
</svg>`;
}

function textLayer({ title, sub }) {
  const titleLines = title
    .map((line, i) => `<text x="80" y="${300 + i * 86}" font-family="${FONT}" font-size="68" font-weight="700" fill="#ffffff">${esc(line)}</text>`)
    .join('\n  ');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect x="80" y="196" width="72" height="6" rx="3" fill="${ORANGE}"/>
  ${titleLines}
  <text x="80" y="${300 + title.length * 86 + 20}" font-family="${FONT}" font-size="30" font-weight="500" fill="#9fb0c9">${esc(sub)}</text>
  <text x="80" y="${H - 54}" font-family="${FONT}" font-size="26" font-weight="500" fill="#7f90aa">www.zest2020.com</text>
</svg>`;
}

// ロゴはアルファチャンネルを抜き型にして白一色のシルエットにする（フッターの白ロゴと同じ見え方）。
async function whiteLogo(width) {
  const resized = sharp('public/zest-logo.png').resize({ width });
  const { data, info } = await resized
    .clone()
    .ensureAlpha()
    .extractChannel('alpha')
    .raw()
    .toBuffer({ resolveWithObject: true });
  return sharp({
    create: { width: info.width, height: info.height, channels: 3, background: '#ffffff' },
  })
    .joinChannel(data, { raw: { width: info.width, height: info.height, channels: 1 } })
    .png()
    .toBuffer();
}

await mkdir('public/og', { recursive: true });
const logo = await whiteLogo(200);
const logoMeta = await sharp(logo).metadata();

for (const card of CARDS) {
  const out = `public/og/${card.file}.png`;
  await sharp(Buffer.from(background()))
    .composite([
      { input: logo, left: 80, top: 80 },
      { input: Buffer.from(textLayer(card)), left: 0, top: 0 },
    ])
    .png()
    .toFile(out);
  console.log('wrote', out);
}
console.log('logo size', logoMeta.width, 'x', logoMeta.height);
