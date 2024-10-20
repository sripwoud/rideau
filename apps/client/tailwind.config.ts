import { createColorSet, withAccountKitUi } from '@account-kit/react/tailwind'
import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
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
      fontFamily: {
        mono: ['var(--font-fira-mono)'],
        sans: ['var(--font-teko)'],
      },
    },
  },
  plugins: [],
}
export default withAccountKitUi(config, {
  colors: {
    'btn-primary': createColorSet('#f7567c', '#ff66cc'),
    'fg-accent-brand': createColorSet('#f7567c', '#ff66cc'),
  },
})
