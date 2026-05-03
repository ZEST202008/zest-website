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
        sans: [
          '"MS PGothic"', '"MS Pゴシック"',
          '"Hiragino Kaku Gothic Pro"', '"ヒラギノ角ゴ Pro W3"',
          'Osaka', 'sans-serif'
        ],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
