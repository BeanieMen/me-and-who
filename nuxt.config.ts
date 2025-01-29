// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/icon', 'nuxt-swiper', '@nuxtjs/google-fonts'],
  googleFonts: {
    base64: true,

    families: {
      'Caveat': {
        weight: [400, 700],
      },
    },
    display: 'swap',
    preload: true,
  }
})