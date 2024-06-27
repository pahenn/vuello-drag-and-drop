// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: ["~/assets/css/vello.css"],
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxt/ui",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  extends: ["@nuxt/ui-pro"],
  colorMode: {
    preference: "light",
  },
})
