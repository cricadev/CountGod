// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "nuxt-vitest"],
  /*
    googleFonts: {
      families: {
        "Zen Dots": [400],
        "Bebas Neue": [400],
        "Monserrat": true,
  
      },
      display: 'swap',
      prefetch: false,
      preconnect: false,
      preload: false,
      download: true,
      base64: false,
    },
    */
  colorMode: {
    preference: 'light'
  }
})