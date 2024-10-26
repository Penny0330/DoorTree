/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        'main-blue': '#002F7B',
        'main-red': '#ED1F1D',
        'main-overlay': 'rgba(0, 0, 0, 60%)',
      },
    },
  },
  plugins: [],
  darkMode: false,
}
