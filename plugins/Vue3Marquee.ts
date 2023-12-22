import Vue3Marquee from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Marquee, { name: 'Vue3Marquee' })
})