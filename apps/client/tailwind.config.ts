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
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        white: '#fcfcfc',
        cornsilk: '#fffae3',
        crayola: '#f7567c',
        blue: '#99e1d9',
        wenge: '#5d576b',
      },
    },
  },
  plugins: [],
}
export default config
