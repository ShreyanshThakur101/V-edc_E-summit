/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#c9a84c',
          light:   '#f0d080',
          dark:    '#8b6914',
        },
        crimson: {
          DEFAULT: '#8b1a1a',
          bright:  '#c0392b',
        },
        dark: {
          DEFAULT: '#050507',
          mid:     '#0d0d14',
          surface: '#10101a',
          card:    '#16161f',
          hover:   '#1e1e2e',
        },
      },
      fontFamily: {
        cinzel:  ['"Cinzel"', 'serif'],
        display: ['"Cinzel Decorative"', 'serif'],
        body:    ['"Raleway"', 'sans-serif'],
      },
      animation: {
        'shaft-pulse': 'shaftPulse 6s ease-in-out infinite',
        'spotlight':   'spotPulse 4s ease-in-out infinite',
      },
      keyframes: {
        shaftPulse: { '0%,100%': { opacity: '0.4' }, '50%': { opacity: '1' } },
        spotPulse:  { '0%,100%': { opacity: '0.5' }, '50%': { opacity: '1' } },
      },
    },
  },
  plugins: [],
}
