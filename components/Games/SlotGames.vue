<template>
  <div class="bg-dark">
    <div class="w-full box-border relative container mx-auto">
      <div class="grid grid-cols-2 py-6">
        <div class="flex justify-start items-center mr-auto ml-2">
          <h1 class="text-white text-base lg:text-3xl md:text-3xl flex text-center font-bold  ml-2 mr-2">SLOT</h1>
          <span
            class="lg:text-3xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#CAAB72] to-[#D7C095]">GAMES</span>
        </div>
        <div class="flex justify-end items-center ml-auto z-10">
          <NuxtLink to="/slot" class="flex items-center">
            <span
              class="text-lightwhite cursor-pointer font-bold text-sm uppercase mr-2 hover:text-gray-400 transition-colors duration-300 hover:underline">Lihat
              Semua Produk</span>
            <nuxt-icon name="icon-arrow-right" class="text-coco" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-darklight">
    <div class="container mx-auto ">
      <div class="py-6">
        <!---TOP GAMES-->
        <swiper :modules="[SwiperAutoplay]" :rewind="true" :autoplay="{ delay: 5000, pauseOnMouseEnter: true }"
          :slides-per-view="1" :space-between="10" :breakpoints="{
            '600': {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            '800': {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            '1000': {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            '1280': {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }">
          <swiper-slide class="py-3 px-2" v-for="(slide, index) in contentStore.featuredProviders.slot.hot" :key="index">
            <div class="popular-slider h-60 w-auto p-10" :style="{ backgroundImage: `url(${slide.image})` }">
              <div class="popular-slider__tmb">
                <div class="tmb-lobby__wrap">
                  <div class="tmb-lobby__img-bg">
                    <img :src="slide.image" class="tmb-lobby__img" :placeholder="[100, 50, 10]" loading="lazy" />
                    <div
                      class="flex items-center bottom-8 md:bottom-16 lg:bottom-16 rounded-tr-xl h-9 justify-center left-0 opacity-100 absolute w-28 bg-dark bg-opacity-70 transition-opacity backdrop-blur-md bg-blur z-10">
                      <img :src="slide.logo" :alt="slide.alt" class="w-16 object-contain" loading="lazy">
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-white pointer-events-none absolute font-bold left-72 popular-index z-10">{{ index + 1 }}
              </div>
              <div class="popular-slider__info z-10">
                <img src="https://kgaming.b-cdn.net/kr/icons/popular-games.svg" loading="lazy">
                <span class=" text-white block font-bold mt-3 text-right">{{ slide.alt }}</span>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <div class="py4">
        <swiper :modules="[SwiperAutoplay]" :rewind="true" :autoplay="{ delay: 7000, pauseOnMouseEnter: true }"
          :slides-per-view="2" :space-between="10" :breakpoints="{
            '600': {
              slidesPerView: 6,
              spaceBetween: 10,
            },
            '800': {
              slidesPerView: 6,
              spaceBetween: 10,
            },
            '1000': {
              slidesPerView: 6,
              spaceBetween: 10,
            },
            '1280': {
              slidesPerView: 6,
              spaceBetween: 10,
            },
          }">
          <swiper-slide class="py-3 px-2" v-for="(slide, index) in contentStore.featuredProviders.slot.new" :key="index">
            <div class="max-w-sm shadow dark:bg-gray-800 dark:border-gray-700 relative overflow-hidden">
              <div class="block unset">
                <div class="brightness-90">
                  <img :src="slide.image" :alt="slide.alt" class="rounded-lg w-full" :placeholder="[100, 50, 10]" loading="lazy" />
                  <div
                    class="flex items-center bottom-0 rounded-tr-xl h-12 justify-center left-0 opacity-100 absolute w-28 z-10 transition-opacity backdrop-blur-md bg-blur">
                    <img :src="slide.logo" :alt="slide.alt" class="w-full object-contain" loading="lazy">
                  </div>
                </div>
                <div
                  class="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-all duration-300 hover:opacity-100 hover:scale-110 transform origin-center bg-black bg-opacity-60">
                  <button class="signup">
                    <NuxtLink to="/slot">PLAY NOW</NuxtLink>
                  </button>
                  <span class="mt-2 text-white text-sm"></span>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useContentStore } from '@/store/ContentStore';

// Assign Variabel to store
const contentStore = useContentStore();
</script>

<style scoped>
.swiper-slide {
  position: relative;
}

:deep(.nuxt-icon svg) {
  width: 1.5em;
  height: 1.5em;
}</style>
