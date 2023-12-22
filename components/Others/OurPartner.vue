<template>
  <div class="text-white md:pb-5 lg:pb-5 px-5 relative grid pt-0 gap-5 bg-custom-gray w-full">
    <div class="overflow-hidden">
      <div class="flex justify-between items-center mb-10">
        <div class="block w-full text-center">
          <h3 class="font-bold text-xl leading-6 text-white">Play with popular game providers</h3>
        </div>
      </div>
      <div class="py-2 md:mb-6 lg:mb-6">
        <div class="w-full h-auto flex boxshadow">
          <swiper :modules="[SwiperAutoplay]" :rewind="true" :autoplay="{ delay: 1500, pauseOnMouseEnter: true }"
            :slides-per-view="3" :space-between="10" :breakpoints="{
              '600': {
                slidesPerView: 10,
                spaceBetween: 10,
              },
              '800': {
                slidesPerView: 10,
                spaceBetween: 10,
              },
              '1000': {
                slidesPerView: 10,
                spaceBetween: 10,
              },
              '1280': {
                slidesPerView: 10,
                spaceBetween: 10,
              },
            }">
            <template v-for="category in gameCategories">
              <swiper-slide v-for="(slide, index) in (publicStore.public.game_providers?.[category] || [])"
                :key="`${category}-${index}`">
                <div class="bg-lightgray rounded-sm h-14">
                  <div class="flex items-center justify-center h-full">
                    <img v-if="slide.prefs" :src="slide.prefs['logo.url']" class="brightness-90 rounded-lg w-7/12"
                      loading="lazy" />
                  </div>
                </div>
              </swiper-slide>
            </template>
          </swiper>
        </div>
      </div>
    </div>
  </div>
  <!-- <Vue3Marquee class="" :duration="200" :pause-on-hover="true">
        <template v-for="category in gameCategories">
          <div v-for="(slide, index) in (publicStore.public.game_providers?.[category] || [])"
            :key="`${category}-${index}`">
            <div class="flex items-center justify-center bg-darklgray h-20 w-28 mx-2 p-1">
              <img v-if="slide.prefs" :src="slide.prefs['logo.url']" class="brightness-90 max-w-full max-h-full" loading="lazy" />
            </div>
          </div>
        </template>
      </Vue3Marquee> -->
</template>
<script setup>
import { ref } from 'vue';
import { usePublicStore } from '@/store/PublicStore';

const publicStore = usePublicStore();

// Define your game categories here
const gameCategories = ref(['slot', 'live', 'sports', 'cockfight', 'crash', 'pvp']);
</script>

<style scoped>
:deep(.swiper-wrapper) {
  align-items: center;
}

:deep(.swiper-slide, swiper-slide) {
  height: auto;
}
</style>