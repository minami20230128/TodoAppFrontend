// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false, // ← SSRをオフにしてSPAモードにする
  nitro: {
    preset: 'static', // ← 静的ファイルを出力
  },
  app: {
    baseURL: '/', // ← Spring Bootのルート直下で配信する場合
  }
})
