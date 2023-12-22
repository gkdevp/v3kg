<template>
  <Animate animation="animate__fadeIn" delay="" duration="animate__slow" repeat="" :scroll="true">
    <div class="bg-[#222939]">
      <div class="w-full box-border relative container mx-auto">
        <div class="grid grid-cols-2 py-6">
          <div class="flex justify-start items-center mr-auto ml-2">
            <h1 class="text-white text-base lg:text-3xl md:text-3xl flex text-center font-bold mr-2 ml-2">CASINO</h1>
            <span
              class="lg:text-3xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#CAAB72] to-[#D7C095] ml-auto">GAMES</span>
          </div>
          <div class="flex justify-end items-center ml-auto z-10">
            <NuxtLink to="/casino" class="flex items-center">
              <span
                class="text-lightwhite cursor-pointer font-bold text-sm uppercase mr-2 hover:text-gray-400 transition-colors duration-300 hover:underline">Lihat
                Semua Produk</span>
              <nuxt-icon name="icon-arrow-right" class="text-coco" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-[#2d3443] py-2">
      <div class="hidden lg:block md:block 2xl:block container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center gap-6 justify-center">
          <div class="flex relative cursor-pointer w-full max-w-xs md:max-w-full">
            <img src="https://onyx2myr.com/web/images/common_new/casino/lc-sb_h.jpg"
              class="w-full h-auto cursor-pointer rounded-lg overflow-clip" />
            <NuxtLink
              class="absolute bottom-4 left-4 hover:bg-gray-700 hover:cursor-pointer flex text-sm font-black justify-center py-1 px-4 uppercase conicyellow rounded-3xl"
              to="/casino">
              <span>PLAY NOW</span>
            </NuxtLink>
          </div>
          <div class="flex relative cursor-pointer w-full max-w-xs md:max-w-full">
            <img src="https://onyx2myr.com/web/images/common_new/casino/lc-sb_h.jpg"
              class="w-full h-auto cursor-pointer rounded-xl overflow-clip" />
            <NuxtLink
              class="absolute bottom-4 left-4 hover:bg-gray-700 hover:cursor-pointer flex text-sm font-black justify-center py-1 px-4 uppercase conicyellow rounded-3xl"
              to="/casino">
              <span>PLAY NOW</span>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="container mx-auto py-3">
        <swiper :modules="[SwiperAutoplay]" :rewind="true" :autoplay="{ delay: 3000, pauseOnMouseEnter: true }"
          :slides-per-view="2" :space-between="10" :breakpoints="{
            '600': {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            '800': {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            '1000': {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            '1280': {
              slidesPerView: 5,
              spaceBetween: 10,
            },
          }">
          <swiper-slide class="py-3 px-2" v-for="(slide, index) in contentStore.featuredProviders.live" :key="index">
              <div class="max-w-sm shadow dark:bg-gray-800 dark:border-gray-700 relative overflow-hidden group">
                  <div class="block unset">
                      <div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity"></div>
                      <div class="absolute animate-blinker blinkers w-14 px-2 py-6">
                          <div
                              class="items-center bg-white rounded-full flex text-xss font-bold h-5 justify-center px-3 uppercase whitespace-nowrap text-rose-600 live">
                              LIVE
                          </div>
                      </div>
                      <img :src="slide.image" :alt="slide.alt" class="rounded-lg w-full" />
                      <NuxtLink to="/casino"
                          class="opacity-0 group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:bg-gray-700 hover:cursor-pointer flex text-xs font-black justify-center py-2 px-6 uppercase conicyellow rounded-3xl">
                          <span>PLAY NOW</span>
                      </NuxtLink>
                  </div>
              </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </Animate>
</template>

<script setup>
import { useContentStore } from '@/store/ContentStore';

const contentStore = useContentStore();
</script>

<style scoped>
:deep(.nuxt-icon svg) {
  width: 1.5em;
  height: 1.5em;
}
</style>