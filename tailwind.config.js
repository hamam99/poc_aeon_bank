/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0091EA',
          soft: '#E6F5FE',
        },
        sun: '#FFD84D',
        leaf: '#7ED957',
        surface: '#F4F5F7',
      },
    },
  },
};
