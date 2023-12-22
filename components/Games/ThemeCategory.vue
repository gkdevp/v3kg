<template>
    <div class="text-white pb-5 px-5 relative grid pt-0 gap-5 bg-gray-800">
        <div class="overflow-hidden">
            <!----Popular Payment Methods--->
            <div class="mb-6">
                <div class="items-center justify-between flex mb-3">
                    <div class="flex-col flex">
                        <h3 class="font-bold text-white text-xl">Popular Payment Methods</h3>
                    </div>
                </div>
                <div class="relative flex overflow-visible">
                    <div class="relative w-full overflow-visible m-auto">
                        <swiper :onSwiper="onSwiper" :modules="[SwiperAutoplay]" :rewind="true"
                            :autoplay="{ delay: 70000, pauseOnMouseEnter: true }" :slides-per-view="3" :space-between="10"
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
                            <!-- Skrill Slide -->
                            <swiper-slide class="flex justify-center items-center">
                                <NuxtLink class="relative items-center justify-center h-20 flex rounded-2xl z-10 no-underline payment cursor-pointer hover:border-t-yl hover:border-t-2">
                                    <img src="https://s3.bttmedia.com/hub/b3/images/vuYfTSg10SqNBQoMipzxLYJTpIcae5zXBIcRnOGp.svg"
                                        class="relative z-10 px-6 py-7" />
                                </NuxtLink>
                            </swiper-slide>

                            <!-- Mastercard Slide -->
                            <swiper-slide class="flex justify-center items-center">
                                <NuxtLink
                                    class="relative items-center justify-center h-20 flex rounded-2xl z-10 no-underline payment cursor-pointer hover:border-t-yl hover:border-t-2">
                                    <img src="https://s3.bttmedia.com/hub/b3/images/hzAlN6CC5R4cKnvhgZ34iO239dAGqZAtoIdmQqZW.svg"
                                        class="relative z-10 px-6 py-7" />
                                </NuxtLink>
                            </swiper-slide>

                            <!-- Revolut Slide -->
                            <swiper-slide class="flex justify-center items-center">
                                <NuxtLink
                                    class="relative items-center justify-center h-20 flex rounded-2xl z-10 no-underline payment cursor-pointer hover:border-t-yl hover:border-t-2">
                                    <img src="https://s3.bttmedia.com/hub/b3/images/hzAlN6CC5R4cKnvhgZ34iO239dAGqZAtoIdmQqZW.svg"
                                        class="relative z-10 px-6 py-7" />
                                </NuxtLink>
                            </swiper-slide>
                        </swiper>
                    </div>
                </div>
            </div>

            <!----Games Category--->
            <div class="mb-6">
                <div class="items-center justify-between flex mb-3">
                    <div class="flex-col flex">
                        <h3 class="text-xl font-bold">Slot Games</h3>
                    </div>
                    <div class="items-center flex">
                        <div class="text-yl cursor-pointer text-base inline-block">Show All</div>
                        <div class="items-center flex ml-4" id="div-5">
                            <button @click="goPrev"
                                class="text-black items-center cursor-pointer justify-center flex w-7 h-7 overflow-visible m-1 rotate-180">
                                <img
                                    src="https://kgaming.b-cdn.net/kr/icons/slide-arrow.svg" />
                            </button>
                            <button @click="goNext"
                                class="text-black items-center cursor-pointer justify-center flex w-7 h-7 overflow-visible m-1">
                                <img
                                    src="https://kgaming.b-cdn.net/kr/icons/slide-arrow.svg" />
                            </button>
                        </div>
                    </div>
                </div>
                <div class="relative flex overflow-visible">
                    <div class="relative w-full overflow-visible m-auto">
                        <swiper :onSwiper="onSwiper" :modules="[SwiperAutoplay]" :rewind="true"
                            :autoplay="{ delay: 70000, pauseOnMouseEnter: true }" :slides-per-view="2" :space-between="10"
                            :breakpoints="{
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
                            <swiper-slide class="flex justify-center items-center">
                                <NuxtLink class="relative flex h-56 w-full rounded-xl overflow-hidden bg-custom-gray cursor-pointer">
                                    <img src="https://s3.bttmedia.com/hub/b3/banners/EHtafFLOgOH5OGh6RqFYBUie5Qr9bFntdfvKUIzb.png"
                                        class="absolute top-0 left-0 w-full h-full object-contain transition-transform duration-300 ease-in" />
                                    <div class="absolute bottom-4 w-full px-4 text-white text-base font-medium leading-5 text-center z-10">Drops & Wins</div>    
                                </NuxtLink>
                            </swiper-slide>

                            <swiper-slide class="flex justify-center items-center">
                                <NuxtLink class="relative flex h-56 w-full rounded-xl overflow-hidden bg-custom-gray cursor-pointer">
                                    <img src="https://s3.bttmedia.com/hub/b3/banners/xJ7iUUCnayi85QFgvv2EqO5qyTnHPc03ghTU2tIs.png"
                                        class="absolute top-0 left-0 w-full h-full object-contain transition-transform duration-300 ease-in" />
                                    <div class="absolute bottom-4 w-full px-4 text-white text-base font-medium leading-5 text-center z-10">Slot Games</div>    
                                </NuxtLink>
                            </swiper-slide>

                            <swiper-slide class="flex justify-center items-center">
                                <NuxtLink class="relative flex h-56 w-full rounded-xl overflow-hidden bg-custom-gray cursor-pointer">
                                    <img src="https://s3.bttmedia.com/hub/b3/banners/bW7foiPrYV3rKEcOeDByyFVulXUd0cTmL9M3Kd65.png"
                                        class="absolute top-0 left-0 w-full h-full object-contain transition-transform duration-300 ease-in" />
                                    <div class="absolute bottom-4 w-full px-4 text-white text-base font-medium leading-5 text-center z-10">Crash Games</div>    
                                </NuxtLink>
                            </swiper-slide>

                            <swiper-slide class="flex justify-center items-center">
                                <NuxtLink class="relative flex h-56 w-full rounded-xl overflow-hidden bg-custom-gray cursor-pointer">
                                    <img src="https://s3.bttmedia.com/hub/b3/banners/qwfSq5dLd6OLfyyvaVOnDRGGOJNV273p4UFZxJ9B.png"
                                        class="absolute top-0 left-0 w-full h-full object-contain transition-transform duration-300 ease-in" />
                                    <div class="absolute bottom-4 w-full px-4 text-white text-base font-medium leading-5 text-center z-10">Arcade Games</div>    
                                </NuxtLink>
                            </swiper-slide>

                            <swiper-slide class="flex justify-center items-center">
                                <NuxtLink class="relative flex h-56 w-full rounded-xl overflow-hidden bg-custom-gray cursor-pointer">
                                    <img src="https://s3.bttmedia.com/hub/b3/banners/U5RpKmyxHZ6SVW0yJ6wwKjC7WKPH2e5ZImItyuBF.png"
                                        class="absolute top-0 left-0 w-full h-full object-contain transition-transform duration-300 ease-in" />
                                    <div class="absolute bottom-4 w-full px-4 text-white text-base font-medium leading-5 text-center z-10">Table Games</div>    
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