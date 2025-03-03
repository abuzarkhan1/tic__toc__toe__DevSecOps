/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionProperty: {
        'width': 'width',
        'height': 'height',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'neon': '0 0 5px theme("colors.purple.400"), 0 0 20px theme("colors.purple.600")',
        'neon-pink': '0 0 5px theme("colors.pink.400"), 0 0 20px theme("colors.pink.600")',
        'neon-cyan': '0 0 5px theme("colors.cyan.400"), 0 0 20px theme("colors.cyan.600")',
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(to right bottom, #0f0a1e, #1a1333, #271a4a, #341f62, #42237b)',
      },
    },
  },
  plugins: [],
};