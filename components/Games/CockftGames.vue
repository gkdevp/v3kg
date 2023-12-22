<template>
  <Animate animation="animate__fadeIn" delay="" duration="animate__slow" repeat="" :scroll="true">
    <div class="bg-dark">
      <div class="w-full box-border relative container mx-auto">
        <div class="grid grid-cols-2 py-6">
          <div class="flex justify-start items-center mr-auto ml-2">
            <!-- <nuxt-icon name="cockft" class="text-coco" /> -->
            <span
              class="lg:text-3xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#CAAB72] to-[#D7C095] ml-2 mr-2">COCKFT</span>
            <h1 class="text-white text-base lg:text-3xl md:text-3xl flex text-center font-bold mr-2">GAMES</h1>
          </div>
          <div class="flex justify-end items-center ml-auto z-10">
            <NuxtLink to="/cockft" class="flex items-center">
              <span class="text-lightwhite cursor-pointer font-bold text-sm uppercase mr-2 hover:text-gray-400 transition-colors duration-300 hover:underline">Lihat Semua Produk</span>
              <nuxt-icon name="icon-arrow-right" class="text-coco" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-darklight">
      <div class="flex flex-col md:flex-row container mx-auto">
        <div class="hidden md:block lg:block w-full h-auto py-2">
          <div class="flex justify-center items-center">
            <div class="card">
              <div class="bg-model_cf">

              </div>
            </div>
          </div>
          <svg>
            <filter id="wavy2">
              <feTurbulence x="0" y="0" baseFrequency="0.02" numOctaves="5" seed="1"></feTurbulence>
              <feDisplacementMap in="SourceGraphic" scale="20" />
            </filter>
          </svg>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 px-2 py-2 justify-center items-center">
          <div class="max-h-72 p-2 rounded-lg shadow bg-gray-800 border border-gray-700 z-10" v-for="games in cockft"
            key="games">
            <img :src="games.images" class="h-16" />
            <p class="mb-3 font-normal text-gray-400">{{ games.desc }}</p>
            <NuxtLink to="/" class="button-primary">
              <h5>PLAY NOW</h5>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </Animate>
</template>
<script lang="ts" setup>
const cockft = ref([
  {
    images: 'https://kgaming.b-cdn.net/digmaan.webp',
    desc: 'Here are the biggest enterprise technology acquisitions of 2021 so far,in reverse chronological order',
  },
  {
    images: 'https://kgaming.b-cdn.net/logo-sv.webp',
    desc: 'Here are the biggest enterprise technology acquisitions of 2021 so far,in reverse chronological order',
  },
  {
    images: 'https://kgaming.b-cdn.net/logo-sv.webp',
    desc: 'Here are the biggest enterprise technology acquisitions of 2021 so far,in reverse chronological order',
  }
])
</script>>

<style scoped>
:deep(.nuxt-icon svg) {
  width: 1.5em;
  height: 1.5em;
}
</style>