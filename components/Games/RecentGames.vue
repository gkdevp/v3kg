<template>
    <div v-if="hasrecents" class="bg-dark">
        <div class="w-full box-border relative container mx-auto p-6">
            <div class="flex justify-between items-center">
                <!-- Title Section -->
                <div class="flex items-center space-x-3">
                    <h1 class="text-white text-base lg:text-3xl md:text-3xl font-bold border-b-4 border-lightco">
                        RECENT
                    </h1>
                    <span
                        class="text-base lg:text-3xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#CAAB72] to-[#D7C095]">
                        GAMES
                    </span>
                </div>
                <!-- Toggle Button with Loading Icon -->
                <div class="flex items-center space-x-3">
                    <nuxt-icon v-if="showRecentGames" name="avgpace" />
                    <button @click="toggleRecentGames" class="text-white text-base lg:text-3xl md:text-3xl">
                        {{ showRecentGames ? 'Hide' : 'Show' }}
                    </button>
                </div>
            </div>
        </div>

        <div v-if="showRecentGames" class="bg-darklight">
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
                            <div class="block unset">
                                <div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity">
                                </div>
                                <div v-if="slide.type === 'live'" class="absolute animate-blinker blinkers w-14 px-2 py-4">
                                    <div
                                        class="items-center bg-white rounded-full flex text-xs font-bold h-5 justify-center px-2 uppercase whitespace-nowrap text-rose-600">
                                        LIVE
                                    </div>
                                </div>
                                    <img v-if="['slot', 'arcade', 'fish', 'table', 'crash'].includes(slide.category)"
                                        :src="slide.image" :alt="slide.title" class="w-full h-full rounded-lg" />
                                    <img v-if="['live', 'sports', 'cockfight', 'pvp', 'togel', 'other'].includes(slide.category)"
                                        :src="slide.image" :alt="slide.title" class="w-full h-full rounded-lg" />
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
import { ref, computed } from 'vue';
import { useMemberStore } from '@/store/MemberStore';
import { useAuthStore } from '@/store/AuthStore';
import { useStoreGames } from '@/store/StoreGames';
import { useContentStore } from '@/store/ContentStore';

// Metadata
definePageMeta({ middleware: 'isauth-mid' });

// Assign variable to store 
const memberStore = useMemberStore();
const authStore = useAuthStore();
const storeGames = useStoreGames();
const contentStore = useContentStore();
const showRecentGames = ref(true);

// Check recent empty or not
const hasrecents = computed(() => {
    const categories = ['slot', 'arcade', 'fish', 'table', 'crash', 'live', 'sports', 'cockfight', 'pvp', 'togel', 'other'];
    return categories.some(category => memberStore.profile.recent?.[category] && memberStore.profile.recent?.[category].length > 0);
});

// filter games
const flattenedRecentGames = computed(() => {
  const recent = memberStore.profile.recent;
  if (!recent) return [];

  let gamesArray = [
      ...recent.slot || [],
      ...recent.arcade || [],
      ...recent.fish || [],
      ...recent.table || [],
      ...recent.crash || [],
      ...recent.live || [],
      ...recent.sports || [],
      ...recent.cockfight || [],
      ...recent.pvp || [],
      ...recent.togel || [],
      ...recent.other || [],
  ];

  return gamesArray.map(game => {
    if (['live', 'sports', 'cockfight', 'pvp', 'togel', 'other'].includes(game.category)) {
      // Extract the suffix if present (e.g., "allbet-direct" becomes "allbet")
      const gameCodeSuffixIndex = game.code.lastIndexOf('-');
      const gameCodeWithoutSuffix = gameCodeSuffixIndex > -1 ? game.code.substring(0, gameCodeSuffixIndex) : game.code;

      // Find the image in the content store
      const categoryContent = contentStore.featuredProviders[game.category] || [];
      const matchedContent = categoryContent.find(content => content.code === gameCodeWithoutSuffix);

      // Replace the image if a match is found
      if (matchedContent) {
        game.image = matchedContent.image;
      }
    }
    return game;
  });
});

// Hide & Show Button
const toggleRecentGames = () => {
    showRecentGames.value = !showRecentGames.value;
};

// Play Games
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

<style scoped>
:deep(.nuxt-icon svg) {
    width: 1.8em;
    height: 1.8em;
}
</style>