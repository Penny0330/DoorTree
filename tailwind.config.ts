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
        'around-light-025': '0 0 8px 0 rgba(0,0,0,0.25)',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-show': {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0px)', opacity: '1' },
        },
        'slide-left': {
          '0%': { transform: 'translateX(350px)', opacity: '0' },
          '100%': { transform: 'translateX(0px)', opacity: '1' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-show': 'slide-show 0.3s ease-out',
        'slide-left': 'slide-left 0.5s ease-out',
      },
    },
  },
  plugins: [],
}
