// @ts-expect-error no types
import scrollbarHidePlugin from 'tailwind-scrollbar-hide';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    screens: {
      sm: '540px',
      md: '1060px',
      lg: '1260px',
    },
  },
  plugins: [scrollbarHidePlugin],
};
