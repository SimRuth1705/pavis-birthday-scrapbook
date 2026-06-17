/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: '#fed6e3',
          blue: '#a8c1ef',
          yellow: '#fef3c7',
          mint: '#d1fae5',
          lavender: '#e0e7ff',
        }
      },
      fontFamily: {
        rounded: ['"Outfit"', '"Quicksand"', '"Nunito"', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-hover': '0 12px 40px 0 rgba(31, 38, 135, 0.12)',
        'clay': 'inset 0 -4px 8px rgba(0, 0, 0, 0.1), inset 0 4px 8px rgba(255, 255, 255, 0.6), 0 8px 16px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
