// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head :{
      htmlAttrs:{class:'scroll-smooth'},
      bodyAttrs: { class: 'text-cyan-50'  },
      title: 'NEW THEME',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no' },
  
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: 'Meta description' }
      ]
    },
    
  },
  css: ['~/assets/css/main.css', 'swiper/css', 'swiper/css/navigation', 'swiper/css/pagination', 'swiper/css/scrollbar', 'swiper/css/autoplay'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    'nuxt-swiper',
    'nuxt-icons',
    '@jpcreativemedia/nuxt-animate.css',
    '@nuxt/image',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  plugins: [
    '~/plugins/Vue3Marquee.ts',
  ],
  // components: true,
})