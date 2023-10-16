const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        Bg: {
          DEFAULT: "#FFFFFF",
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#FFFFFF",
          300: "#FFFFFF",
          400: "#FFFFFF",
          500: "#FFFFFF",
          600: "#FFFFFF",
          700: "#FFFFFF",
          800: "#FFFFFF",
          900: "#FFFFFF",
        },
      },
      fontFamily: {
        zenDots: ['Zen Dots', 'sans-serif'],
        bebasNeue: ['Bebas Neue', 'sans-serif'],
        monserrat: ['Monserrat', 'sans-serif'],
      },
      screens: {
        '3xl': '1922px',
      },

    },
  }
}
