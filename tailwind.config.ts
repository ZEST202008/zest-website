import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#e04102',
          'orange-dark': '#c93800',
          navy: '#1a2744',
          bg: '#f7f7f5',
        },
      },
      fontFamily: {
        // next/font で読み込んだ Noto Sans JP を使う。
        // 変数が無い環境（フォント読み込み前）でも崩れないよう和文の実在フォントを並べる。
        sans: [
          'var(--font-noto-sans-jp)',
          '"Hiragino Kaku Gothic ProN"', '"Hiragino Sans"',
          '"Yu Gothic Medium"', '"Yu Gothic"', 'Meiryo',
          'system-ui', 'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 1px 2px rgba(26,39,68,0.04), 0 10px 28px -16px rgba(26,39,68,0.16)',
        'card-hover': '0 2px 6px rgba(26,39,68,0.06), 0 22px 44px -20px rgba(224,65,2,0.28)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
