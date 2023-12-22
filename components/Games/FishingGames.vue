<template>
  <div class="bg-[#383e4d]">
      <div class="w-full box-border relative container mx-auto">
        <div class="grid grid-cols-2 py-6">
          <div class="flex justify-start items-center mr-auto ml-2">
            <!-- <nuxt-icon name="fishing" class="text-[#caab72]" /> -->
            <span
              class="lg:text-3xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#CAAB72] to-[#D7C095] ml-2 mr-2">FISHING</span>
            <h1 class="text-white text-base lg:text-3xl md:text-3xl flex text-center font-bold mr-2">GAMES</h1>
          </div>
          <div class="flex justify-end items-center ml-auto z-10">
            <NuxtLink to="/fishing" class="flex items-center">
              <span class="text-lightwhite cursor-pointer font-bold text-sm uppercase mr-2 hover:text-gray-400 transition-colors duration-300 hover:underline">Lihat Semua Produk</span>
              <nuxt-icon name="icon-arrow-right" class="text-coco" />
            </NuxtLink>
            <!-- <NuxtLink to="/fishing" class="button-primary ">
              <h5>SHOW ALL</h5>
            </NuxtLink> -->
          </div>
        </div>
      </div>
  </div>
  <div class="bg-[#2d3443]">
    <div class="container mx-auto">
      <div class="flex flex-col md:flex-row py-6">
    <div class="w-full md:w-1/3 px-2 py-2 hidden lg:block md:block">
      <swiper :modules="[SwiperAutoplay]" :rewind="true" :autoplay="{ delay: 1500, pauseOnMouseEnter: true }"
        :slides-per-view="1" :space-between="10" :breakpoints="{
          '600': { slidesPerView: 4, spaceBetween: 10 },
          '800': { slidesPerView: 1, spaceBetween: 10 },
          '1000': { slidesPerView: 1, spaceBetween: 10 },
          '1280': { slidesPerView: 1, spaceBetween: 10 }
        }">
        <swiper-slide v-for="(slide, index) in fishslide" :key="index">
          <div class="shadow relative overflow-hidden">
            <img :src="slide.image" :alt="slide.alt" class="brightness-75" />
            <div
              class="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-all duration-300 hover:opacity-100 hover:scale-110 transform origin-center bg-black bg-opacity-60">
              <button class="signup">
                <NuxtLink to="/slot">PLAY NOW</NuxtLink>
              </button>
              <span class="mt-2 text-white text-sm">{{ slide.alt }}</span>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="flex-1 grid grid-cols-2 2xl:grid gap-2 pl-2 pr-1 py-2">
      <div v-for="image in filteredImages.slice(0, 4)" :key="image.alt" class="relative">
        <div class="group">
          <img :src="image.image" :alt="image.alt"
            class="object-cover rounded-lg brightness-90 group-hover:brightness-50 2xl:w-full" />
          <div
            class="flex items-center bottom-0 rounded-tr-xl h-9 justify-center left-0 opacity-100 absolute w-28 2xl:w-40 z-10 transition-opacity backdrop-blur-md bg-blur">
            <img src="https://ice-casino34.com/file/media:47affdccadb117a72ab4b8aba2e08fb712c7568c1a"
              class=" w-full object-contain 2xl:w-full" />
          </div>
          <div
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 transition-all duration-300 group-hover:opacity-100 origin-center bg-black bg-opacity-60">
            <button class="signup">
              <NuxtLink to="/slot">PLAY NOW</NuxtLink>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-1 grid grid-cols-2 gap-2 pr-2 pl-1 py-2">
      <div v-for="image in filteredImages.slice(4, 8)" :key="image.alt" class="relative">
        <div class="group">
          <img :src="image.image" :alt="image.alt"
            class="object-cover rounded-lg brightness-90 group-hover:brightness-50" />
          <div
            class="flex items-center bottom-0 rounded-tr-xl h-9 justify-center left-0 opacity-100 absolute w-28 2xl:w-40 z-10 transition-opacity backdrop-blur-md bg-blur">
            <img src="https://ice-casino34.com/file/media:47affdccadb117a72ab4b8aba2e08fb712c7568c1a"
              class=" w-full object-contain" />
          </div>
          <div
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 transition-all duration-300 group-hover:opacity-100 origin-center bg-black bg-opacity-60">
            <button class="signup">
              <NuxtLink to="/slot">PLAY NOW</NuxtLink>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
  </div>

</template>
<script lang="ts" setup>
import { ref } from 'vue';

const fishslide = ref([
  { image: '/images/slot/crystopia.webp', alt: 'JDB FISHING' },
  { image: '/images/slot/koi-gate.webp', alt: 'YESBINGO FISHING' },
]);

const images = ref([
  { image: '/images/fish/FishHuntingGoldenToad.webp', alt: 'Fish Hunting Golden Toad' },
  { image: '/images/fish/FishingGod.webp', alt: 'Fishing God' },
  { image: '/images/fish/CaiShenFishing.webp', alt: 'Cai Shen Fishing' },
  { image: '/images/fish/OceanPhoenix.webp', alt: 'Ocean Phoenix' },
  { image: '/images/fish/JackpotFishing.webp', alt: 'Jackpot Fishing' },
  { image: '/images/fish/MonkeyKingFishing.webp', alt: 'Monkey King Fishing' },
  { image: '/images/fish/MonkeyKingFishing.webp', alt: 'Monkey King Fishing' },
  { image: '/images/fish/SharkHunter.webp', alt: 'Shark Hunter' },
]);

const filteredImages = computed(() => {
  if (typeof window !== 'undefined' && window.innerWidth < 450) {
    // Show only the first 4 games on mobile devices
    return images.value.slice(0, 4);
  }
  // Show all games on larger screens and during client-side rendering
  return images.value;
});
</script>

<style scoped>
:deep(.nuxt-icon svg) {
    width: 1.5em;
    height: 1.5em;
}
</style>