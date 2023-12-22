<template>
    <div v-if="hasFavorites" class="bg-dark">
        <div class="w-full box-border relative container mx-auto">
            <div class="grid grid-cols-2 py-6 relative">
                <div class="flex justify-start items-center mr-auto ml-2 ">
                    <h1
                        class="text-white text-base lg:text-3xl md:text-3xl flex text-center font-bold ml-2 mr-2 border-lightco border-solid border-b-4">
                        FAVORITE</h1>
                    <span
                        class="lg:text-3xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#CAAB72] to-[#D7C095]">GAMES</span>
                </div>
            </div>
        </div>
        <div class="bg-darklight">
            <div class="container mx-auto py-3">
                <swiper :modules="[SwiperAutoplay]" :rewind="true" :autoplay="{ delay: 3000, pauseOnMouseEnter: true }"
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
                    <swiper-slide class="py-3 px-2" v-for="(slide, index) in flattenedRecentGames" :key="index">
                        <div
                            class="max-w-sm shadow dark:bg-gray-800 dark:border-gray-700 relative overflow-hidden group hover:bg-black hover:bg-opacity-75 transition-all rounded-lg">
                            <div class="block unset relative">
                                <div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity">
                                </div>
                                <div v-if="slide.type === 'live'" class="absolute animate-blinker blinkers w-14 px-2 py-4">
                                    <div
                                        class="items-center bg-white rounded-full flex text-xss font-bold h-5 justify-center px-2 uppercase whitespace-nowrap text-rose-600">
                                        LIVE
                                    </div>
                                </div>
                                <img v-if="['slot', 'arcade', 'fish', 'table', 'crash'].includes(slide.category)"
                                    :src="slide.image" :alt="slide.title" class="rounded-lg w-full" />
                                <img v-if="['sports', 'live', 'cockfight'].includes(slide.category)"
                                    :src="slide.provider_image" :alt="slide.title" class="rounded-lg" />
                                <!-- Remove Favourite Icon -->
                                <nuxt-icon name="unfavorite"
                                class="cursor-pointer bg-darklight rounded-md hover:bg-dark text-coco absolute top-0 right-0 m-2"
                                @click="removeFromFavorites(slide)" />
                                <!-- Play Now Button -->
                                <NuxtLink @click.prevent="playGame(slide.code, slide.provider)"
                                class="opacity-0 group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:bg-gray-700 hover:cursor-pointer flex text-sm font-black justify-center py-2 px-4 uppercase conicyellow rounded-3xl">
                                <span>PLAY NOW</span>
                                </NuxtLink>
                                
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { useMemberStore } from '@/store/MemberStore';
import { useAuthStore } from '@/store/AuthStore';
import { useStoreGames } from '@/store/StoreGames';

// Metadata
definePageMeta({ middleware: 'isauth-mid' });

// Assign variable to store 
const memberStore = useMemberStore();
const authStore = useAuthStore();
const storeGames = useStoreGames();
const favorites = ref({});

// Check favorite empty or not
const hasFavorites = computed(() => {
    const categories = ['slot', 'arcade', 'fish', 'table', 'crash', 'live', 'sports', 'cockfight', 'pvp', 'togel', 'other'];
    return categories.some(category => memberStore.profile.favorite?.[category] && memberStore.profile.favorite?.[category].length > 0);
});

// Filter Games
const flattenedRecentGames = computed(() => {
    const recent = memberStore.profile.favorite;
    if (!recent) return [];

    // Flatten all game categories into a single array
    return [
        ...recent.slot || [],
        ...recent.arcade || [],
        ...recent.fish || [],
        ...recent.table || [],
        ...recent.crash || [],
        // ...recent.live || [],
        ...recent.sports || [],
        // ...recent.cockfight || [],
        // ...recent.pvp || [],
        // ...recent.togel || [],
        // ...recent.other || [],
    ];
});

// Remove Favorite Games 
const removeFromFavorites = async (game) => {
  try {
    await storeGames.favoriteGameData({ // Assuming you have a function to unfavorite a game
      code: game.code,
      provider: game.provider
    });
    // Update the favorites object to set the game as not favorited
    favorites.value[game.code] = false;
    await memberStore.GetProfile();
  } catch (error) {
    console.error("Error removing game from favorites:", error);
  }
};

// Launch games
const playGame = async (gameCode, provider) => {
    let newWindow = null;

    try {
        if (!authStore.isAuth) {
            const $loginButton = document.querySelector('#buttonlogin');
            return $loginButton.click();
        }

        newWindow = window.open('', '_blank');
        const currentURL = window.location.href;

        const launchURL = await storeGames.launchGameData({
            code: gameCode,
            provider: provider,
            exit_url: currentURL
        });

        if (launchURL && newWindow) {
            newWindow.location = launchURL;
        } else if (newWindow) {
            newWindow.close();
        }
    } catch (error) {
        if (newWindow) newWindow.close();
        console.error("Error launching game:", error);
    }
};
</script>