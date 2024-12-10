// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
  ],
  pinia: {
    autoImports: ['defineStore'], // 全域引入
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      title: 'DoorTree',
      meta: [
        {
          name: 'description',
          content:
            'DoorTree makes room for all of you. Get everything you create, curate and share, wherever it’s scattered online, and put it back together again in one place – your DoorTree – where it can be discovered with ease.',
        },
        {
          name: 'og:title',
          content: 'DoorTree',
        },
        {
          name: 'og:description',
          content:
            'DoorTree makes room for all of you. Get everything you create, curate and share, wherever it’s scattered online, and put it back together again in one place – your DoorTree – where it can be discovered with ease.',
        },
        {
          name: 'og:image',
          content:
            'https://res.cloudinary.com/dc8zkjbya/image/upload/v1733812764/zalcjxvr2frllmp1zh8x.png',
        },
      ],
      link: [{ rel: 'icon', type: 'image/png', href: '/logo.svg' }],
    },
  },
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId:
        process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    },
  },
})
