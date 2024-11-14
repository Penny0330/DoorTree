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
        'main-overlay': 'rgba(0, 0, 0, 45%)',
      },
      boxShadow: {
        'around-light': '0 0 8px 0 rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
}
