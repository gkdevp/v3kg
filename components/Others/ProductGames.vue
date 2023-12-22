<template>
  <Animate animation="animate__fadeIn" delay="" duration="animate__slow" repeat="" :scroll="true">
    <div class="p-2 px-2">
      <swiper :modules="[SwiperAutoplay]" :rewind="true" :autoplay="{ delay: 6000, pauseOnMouseEnter: true }"
        :slides-per-view="2" :space-between="10" :breakpoints="{
          '600': {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          '800': {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          '1000': {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          '1280': {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }">
        <swiper-slide class="py-3 cursor-pointer" v-for="(slide, index) in promo" :key="index">
          <div class="shadow dark:bg-gray-800 dark:border-gray-700 relative overflow-hidden">
            <div class="block unset">
              <nuxt-img :src="slide.image" :alt="slide.alt" class=" brightness-90 rounded-lg" loading="lazy" />
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </Animate>
  <div class="flex w-full h-full bg-primary">
    <LazyMarquee />
  </div>
</template>

<script lang="ts" setup>

const promo = ref([
  { image: 'https://s.kgaming.dev/webmember/promo/pragmatic-cb5.webp', alt: 'Gates Of Olympus' },
  { image: 'https://s.kgaming.dev/webmember/Juara/PROMO-NEW-MEMBER-JILI.webp', alt: 'Starlight Princess' },
  { image: 'https://s.kgaming.dev/webmember/promo/venusbc-com.webp', alt: 'Loki' },
  { image: 'https://s.kgaming.dev/webmember/promo/m8bet-cb5.webp', alt: 'Crystopia' },
  { image: 'https://s.kgaming.dev/webmember/promo/ssport-com.webp', alt: 'Crystal Realm' },
  { image: 'https://juara303.today/uploads/files/promotion/sv388-jackpot.jpg', alt: 'Spartas Honor' },
  { image: 'https://juara303.today/uploads/files/promotion/digmaan-cb5.webp', alt: 'Robber Strike' },
]);

</script>

<style scoped>
:deep(.image-container) {
  position: relative;
  overflow: hidden;
}

:deep(.image-container nuxt-img) {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

:deep(.nuxt-icon svg) {
  width: 3em;
  height: 3em;
}

:deep(.image-container:hover nuxt-img) {
  transform: scale(1.1);
  opacity: 0.7;
}
</style>