<template>
  <div class="text-white pb-5 px-5 relative grid pt-0 gap-5 bg-gray-800">
    <div class="overflow-hidden">
      <div class="mb-6">
        <div class="items-center justify-between flex mb-3">
          <div class="flex-col flex">
            <h3 class="text-xl font-bold">Jackpot Games</h3>
          </div>
          <div class="items-center flex">
            <div class="text-yl cursor-pointer text-base inline-block">Show All</div>
            <div class="items-center flex ml-4" id="div-5">
              <button @click="goPrev"
                class="text-black items-center cursor-pointer justify-center flex w-7 h-7 overflow-visible m-1 rotate-180">
                <img src="https://kgaming.b-cdn.net/kr/icons/slide-arrow.svg" />
              </button>
              <button @click="goNext"
                class="text-black items-center cursor-pointer justify-center flex w-7 h-7 overflow-visible m-1">
                <img src="https://kgaming.b-cdn.net/kr/icons/slide-arrow.svg" />
              </button>
            </div>
          </div>
        </div>
        <div class="relative flex overflow-visible">
          <div class="relative w-full overflow-visible m-auto">
            <div class="relative flex w-full h-full">
              <swiper :onSwiper="onSwiper" :modules="[SwiperAutoplay]" :rewind="true" :free-mode="true"
                :autoplay="{ delay: 70000, pauseOnMouseEnter: true }" :slides-per-view="2" :space-between="10"
                :breakpoints="{
                  '600': {
                    slidesPerView: 8,
                    spaceBetween: 10,
                  },
                  '800': {
                    slidesPerView: 8,
                    spaceBetween: 10,
                  },
                  '1000': {
                    slidesPerView: 8,
                    spaceBetween: 10,
                  },
                  '1280': {
                    slidesPerView: 8,
                    spaceBetween: 10,
                  },
                }">
                <swiper-slide class="py-3" v-for="(slide, index) in contentStore.featuredProviders.slot.new" :key="index">
                  <div class="flex-col relative flex w-full h-full mx-auto">
                    <div class="relative w-full rounded-2xl overflow-hidden">
                      <img :src="slide.image" :alt="slide.alt"
                        class="rounded-lg w-full transform transition duration-300 ease-in-out" loading="lazy" />
                      <div
                        class="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-all duration-300 hover:opacity-100 bg-black bg-opacity-60">
                        <button
                          class="absolute top-2 right-2 flex items-center w-9 h-9 border-none rounded-full outline-none cursor-pointer bg-lightgray justify-center transition-colors">
                          <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M9 1.00116L11.3175 5.44438L16.5 6.16125L12.75 9.61788L13.635 14.5012L9 12.1944L4.365 14.5012L5.25 9.61788L1.5 6.16125L6.6825 5.44438L9 1.00116Z"
                              stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
                          </svg>
                        </button>
                        <button
                          class="flex items-center justify-center w-14 h-14 rounded-full border-none bgplay hover:bg-yl">
                          <svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M2.12039 4.92574C2.12039 3.13645 4.09921 2.05519 5.60502 3.02169L18.5677 11.3418C19.9549 12.2321 19.9549 14.2595 18.5677 15.1499L5.60502 23.4699C4.09921 24.4364 2.12039 23.3552 2.12039 21.5659V4.92574Z"
                              stroke="#232939" stroke-width="2.47745" stroke-linecap="round" stroke-linejoin="round">
                            </path>
                          </svg>
                        </button>
                        <div
                          class="w-full my-2.5 px-2.5 font-semibold text-base leading-6 text-white truncate text-center">
                          {{ slide.alt }}
                        </div>
                        <button
                          class="px-7 py-2.5 text-white text-xs rounded-full bg-white/30 border-none cursor-pointer hover:bgbutton">Play
                          for fun</button>
                      </div>
                    </div>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useContentStore } from '@/store/ContentStore';

// Assign Variabel to store
const contentStore = useContentStore();

//Swiper Navigation
const swiperInstance = ref(null);

const onSwiper = (instance) => {
  swiperInstance.value = instance;
};

const goNext = () => {
  swiperInstance.value?.slideNext();
};

const goPrev = () => {
  swiperInstance.value?.slidePrev();
};
</script>