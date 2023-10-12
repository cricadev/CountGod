// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "nuxt-vitest", "@nuxtjs/google-fonts"],

  googleFonts: {
    families: {
      "Zen Dots": true,
      "Bebas Neue": true,

    },
    display: 'swap',
    prefetch: false,
    preconnect: false,
    preload: false,
    download: true,
    base64: false,
  }
})