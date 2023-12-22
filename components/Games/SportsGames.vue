<template>
    <Animate animation="animate__fadeIn" delay="" duration="animate__slow" repeat="" :scroll="true">
        <div class="bg-dark">
            <div class="w-full box-border relative container mx-auto">
                <div class="grid grid-cols-2 py-6">
                    <div class="flex justify-start items-center mr-auto ml-2">
                        <span
                            class="lg:text-3xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#CAAB72] to-[#D7C095] ml-2 mr-2">SPORTS</span>
                        <h1 class="text-white text-base lg:text-3xl md:text-3xl flex text-center font-bold mr-auto">GAMES
                        </h1>
                    </div>
                    <div class="flex justify-end items-center ml-auto z-10">
                        <NuxtLink to="/sports" class="flex items-center">
                            <span
                                class="text-lightwhite cursor-pointer font-bold text-sm uppercase mr-2 hover:text-gray-400 transition-colors duration-300 hover:underline">Lihat
                                Semua Produk</span>
                            <nuxt-icon name="icon-arrow-right" class="text-coco" />
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
        <!---Swiper Product-->
        <div class="bg-darken py-3 mx-auto">
            <div class="w-full box-border relative container mx-auto">
                <swiper :modules="[SwiperAutoplay]" :rewind="true" :autoplay="{ delay: 30000, pauseOnMouseEnter: true }"
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
                    <swiper-slide class="py-3" v-for="(slide, index) in contentStore.featuredProviders.sports" :key="index">
                        <div class="shadow relative overflow-hidden">
                            <div class="block p-1 unset relative">
                                <img :src="slide.image" :alt="slide.alt" />
                                <NuxtLink
                                    class="absolute bottom-4 left-4 hover:bg-gray-700 hover:cursor-pointer flex text-sm font-black justify-center py-1 px-4 uppercase conicyellow rounded-3xl"
                                    to="/sports">
                                    <span>PLAY NOW</span>
                                </NuxtLink>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
            <div class="w-full h-full box-border relative container mx-auto">
                <div class="overflow-hidden">
                    <div class="h-full">
                        <swiper class="lg:top-2/3 2xl:top2/3" :modules="[SwiperAutoplay]"
                            :autoplay="{ delay: 3000, pauseOnMouseEnter: true }" :slides-per-view="1" direction="horizontal"
                            :space-between="10" :breakpoints="{
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
                                '1536': {
                                    slidesPerView: 3,
                                    spaceBetween: 10,
                                },
                            }">
                            <swiper-slide class="py-1 px-2 cursor-pointer" v-for="item in contentStore.soccerFixtures.Match" :key="item.matchname">
                                <div class="w-full block relative items-center bg-[#1a202c] rounded-md">
                                    <div
                                        class="bg-dark flex justify-between items-center px-4 text-white text-sm h-9 gap-3 rounded-tl-md rounded-tr-md">
                                        <strong
                                            class="block font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">{{ item.League }}</strong>
                                        <span class="whitespace-nowrap text-white text-opacity-80 shadow">{{ item.Date
                                        }} - {{ item.Time}}</span>
                                    </div>
                                    <div
                                        class="flex items-center bg-content justify-between gap-6 relative px-3 pt-4 pb-5 rounded-bl-md rounded-br-md">
                                        <div class="flex content-center items-center relative w-16 h-16">
                                            <img :src="`https://kgaming.b-cdn.net/dk/homepage/sportsbook/fixture/${item.Home}.webp`"
                                                class="object-contain max-w-full max-h-full" />
                                        </div>
                                        <div class="flex-auto">
                                            <div class="flex gap-5">
                                                <span
                                                    class="text-xs text-white flex-1 whitespace-nowrap overflow-hidden overflow-ellipsis">{{
                                                        item.Home }}</span>
                                                <img src="https://kgaming.b-cdn.net/kr/icons/soccer-default-home.svg" class="flex-1 whitespace-nowrap overflow-ellipsis h-6" />
                                                <img src="https://kgaming.b-cdn.net/kr/icons/soccer-default-away.svg" class="flex-1 whitespace-nowrap overflow-ellipsis h-6" />
                                                <span
                                                    class="text-xs text-white flex-1 whitespace-nowrap overflow-hidden overflow-ellipsis">{{
                                                        item.Away }}</span>
                                            </div>
                                            <div class="grid grid-cols-3 mt-2 gap-5">
                                                <div
                                                    class="flex justify-between items-center bg-slate-400 rounded-2xl h-7 px-2 text-white text-xs">
                                                    <span class="text-xs text-gray-600">H</span>
                                                    <span class="text-xs mx-auto">{{ item.Home_Handicap }}</span>
                                                </div>
                                                <div
                                                    class="flex justify-between items-center bg-slate-400 rounded-2xl h-7 px-2 text-white text-xs">
                                                    <span class="text-xs text-gray-600">O/U</span>
                                                    <span class="text-xs mx-auto">{{ item.Over_Under }}</span>
                                                </div>
                                                <div
                                                    class="flex justify-between items-center bg-slate-400 rounded-2xl h-7 px-2 text-white text-xs">
                                                    <span class="text-xs text-gray-600">A</span>
                                                    <span class="text-xs mx-auto">{{ item.Away_Handicap }}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex content-center items-center relative w-16 h-16">
                                            <img :src="`https://kgaming.b-cdn.net/dk/homepage/sportsbook/fixture/${item.Away}.webp`"
                                                class="object-contain max-w-full max-h-full" />
                                        </div>
                                    </div>
                                </div>
                            </swiper-slide>
                        </swiper>
                    </div>
                </div>
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