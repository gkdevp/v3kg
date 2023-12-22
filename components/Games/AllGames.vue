<template>
    <div class="text-white pb-5 px-5 relative grid pt-0 gap-5 bg-gray-800">
        <div class="overflow-hidden">
            <!---All Games--->
            <div class="mb-6">
                <div class="items-center justify-between flex mb-3">
                    <div class="flex-col flex">
                        <h3 class="text-xl font-bold">All Games</h3>
                    </div>
                    <div class="items-center flex">
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
                        <swiper :onSwiper="onSwiper1" :modules="[SwiperAutoplay]" :rewind="true"
                            :autoplay="{ delay: 70000, pauseOnMouseEnter: true }" :slides-per-view="1" :space-between="10"
                            :breakpoints="{
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
                            <swiper-slide class="flex justify-center items-center mb-3"
                                v-for="(link, index) in filteredMenu" :key="index">
                                <NuxtLink :to="link.to"
                                    class="payment relative flex items-center h-12 px-4 no-underline rounded-2xl z-10 cursor-pointer hover:border-t-yl hover:border-t-2">
                                    <nuxt-icon :name="link.icon" class="relative text-2xl mr-3 z-10 text-slatelight" />
                                    <span class="relative font-medium text-white z-10 text-base">{{ link.label }}</span>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="relative w-4 h-4 ml-auto z-10 text-slatelight">
                                        <path d="M10 5.99995L14 12L10 18" stroke="#b9c5e1" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </NuxtLink>
                            </swiper-slide>
                        </swiper>

                        <swiper :onSwiper="onSwiper2" :modules="[SwiperAutoplay]" :rewind="true"
                            :autoplay="{ delay: 70000, pauseOnMouseEnter: true }" :slides-per-view="1" :space-between="10"
                            :breakpoints="{
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
                            <swiper-slide class="flex justify-center items-center" v-for="(link, index) in filteredMenu2"
                                :key="index">
                                <NuxtLink :to="link.to"
                                    class="payment relative flex items-center h-12 px-4 no-underline rounded-2xl z-10 cursor-pointer hover:border-t-yl hover:border-t-2">
                                    <nuxt-icon :name="link.icon" class="relative text-2xl mr-3 z-10 text-slatelight" />
                                    <span class="relative font-medium text-white z-10 text-base">{{ link.label }}</span>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="relative w-4 h-4 ml-auto z-10 text-slatelight">
                                        <path d="M10 5.99995L14 12L10 18" stroke="#b9c5e1" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </NuxtLink>
                            </swiper-slide>
                        </swiper>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
import { useContentStore } from '@/store/ContentStore';

//Store instance
const contentStore = useContentStore();

// Filter Menu
const filteredMenu = computed(() => {
    const startIndex = contentStore.menuGeneral.findIndex(item => item.label === 'SLOT');
    const endIndex = contentStore.menuGeneral.findIndex(item => item.label === 'CASINO');
    return contentStore.menuGeneral.slice(startIndex, endIndex + 1);
});

const filteredMenu2 = computed(() => {
    const startIndex = contentStore.menuGeneral.findIndex(item => item.label === 'COCKFT');
    const endIndex = contentStore.menuGeneral.findIndex(item => item.label === 'GAMES');
    return contentStore.menuGeneral.slice(startIndex, endIndex + 1);
});

// References to Swiper instances
const swiperInstance1 = ref(null);
const swiperInstance2 = ref(null);

// Update the onSwiper method to handle multiple instances
const onSwiper1 = (instance) => {
    swiperInstance1.value = instance;
};
const onSwiper2 = (instance) => {
    swiperInstance2.value = instance;
};

// Shared navigation methods
const goNext = () => {
    swiperInstance1.value?.slideNext();
    swiperInstance2.value?.slideNext();
};

const goPrev = () => {
    swiperInstance1.value?.slidePrev();
    swiperInstance2.value?.slidePrev();
};
</script>