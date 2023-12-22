<template>
  <div class="bg-dark">
    <div v-for="(config, index) in contentStore.featuredProviders.pageConfigs" :key="index">
      <img v-if="config.category === 'arcade'" :src="config.image" :alt="`Image for ${config.category}`"
        class="h-full w-full object-cover align-middle overflow-clip" />
    </div>
    <div class="container mx-auto">
      <div class="my-4 w-full h-auto boxshadow">
        <div class="grid grid-cols-2 lg:grid-cols-3 md:grid-cols-3 gap-2.5">
          <button @click="changeCategory('arcade')"
            :class="{ 'bg-darklight': currentCategory !== 'arcade', 'bg-brownlight': currentCategory === 'arcade' }"
            class="rounded-md py-3 uppercase">
            Arcade
          </button>
          <button @click="changeCategory('table')"
            :class="{ 'bg-darklight': currentCategory !== 'table', 'bg-brownlight': currentCategory === 'table' }"
            class="rounded-md py-3 uppercase">
            Table
          </button>
          <button @click="changeCategory('crash')"
            :class="{ 'bg-darklight': currentCategory !== 'crash', 'bg-brownlight': currentCategory === 'crash' }"
            class="rounded-md py-3 uppercase">
            Crash
          </button>
        </div>
      </div>
      <div class="my-4 w-full h-auto flex boxshadow">
        <div class="grid grid-cols-2 lg:grid-cols-10 md:grid-cols-8 gap-2.5">
          <div class="bg-darklight rounded-md"
            v-for="(provider, index) in publicStore.public.game_providers?.[currentCategory]" :key="index">
            <div v-if="isLoading && selectedProvider === provider.code" class="loader mx-auto mt-4"></div>
            <div v-else>
              <div class="provider-container" :class="{ 'bg-darklight rounded-md': selectedProvider === provider.code }">
                <!--Maintenance-->
                <div class="h-full bg-black bg-opacity-50 inset-0 rounded-md" v-if="provider.status === 'maintenance'">
                  <div class="relative h-16 mx-auto rounded-full overflow-hidden p-1">
                    <img v-if="provider.prefs" :src="provider.prefs['logo.url']" class="w-full object-cover"
                      loading="lazy" />
                    <div class="absolute inset-0 flex items-center justify-center  bg-black bg-opacity-50">
                      <img src="https://kgaming.b-cdn.net/kr/maintenance.webp" />
                    </div>
                  </div>
                  <div class="text-white text-xs uppercase font-semibold text-center mt-1">{{ provider.name }}</div>
                </div>
                <div v-else>
                  <NuxtLink class="cursor-pointer text-center" @click="loadContent(provider)">
                    <div v-if="isLoading && selectedProvider === provider.code" class="loader mx-auto mt-4"></div>
                    <div v-else>
                      <div class="h-16 mx-auto rounded-full overflow-hidden p-1">
                        <img v-if="provider.prefs" :src="provider.prefs['logo.url']" class="w-full h-full object-contain"
                          loading="lazy" />
                      </div>
                      <div class="text-white text-xs uppercase font-semibold text-center mt-1">{{ provider.name }}</div>
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="p-2">
        <div class="text-coco flex flex-col md:flex-row justify-between items-center">
          <div class="flex md:flex-wrap lg:flex-wrap 2xl:flex-wrap justify-center md:justify-start gap-3 mb-3 md:mb-0"
            v-if="isProviderClicked">
            <NuxtLink @click="setTagFilter('')" :class="{ 'bg-darken': tagFilter === '' }"
              class="cursor-pointer text-center p-1 md:p-2 border border-zinc-600 border-solid rounded-md">
              <div :class="{ 'text-coco': tagFilter === '' }">All Games</div>
            </NuxtLink>
            <NuxtLink @click="setTagFilter('hot')" :class="{ 'bg-darken': tagFilter === 'hot' }"
              class="cursor-pointer text-center p-1 md:p-2 border border-zinc-600 border-solid rounded-md">
              <div :class="{ 'text-coco': tagFilter === 'hot' }">Hot Games</div>
            </NuxtLink>
            <NuxtLink @click="setTagFilter('popular')" :class="{ 'bg-darken': tagFilter === 'popular' }"
              class="cursor-pointer text-center p-1 md:p-2 border border-zinc-600 border-solid rounded-md">
              <div :class="{ 'text-coco': tagFilter === 'popular' }">Popular Games</div>
            </NuxtLink>
            <NuxtLink @click="setTagFilter('new')" :class="{ 'bg-darken': tagFilter === 'new' }"
              class="cursor-pointer text-center p-1 md:p-2 border border-zinc-600 border-solid rounded-md">
              <div :class="{ 'text-coco': tagFilter === 'new' }">New Games</div>
            </NuxtLink>
          </div>
          <div class="relative justify-between flex w-full md:w-auto" v-if="isProviderClicked">
            <div class="h-10 flex mx-3 overflow-hidden p-1 bg-darken rounded-md">
              <img v-if="selectedProviderLogo" :src="selectedProviderLogo" class="w-24 h-full object-contain" />
            </div>
            <div class="relative flex justify-center">
              <nuxt-icon name="search" class="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input v-model="searchTerm" type="text" placeholder="Search by title"
                class="w-full pl-10 pr-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500 bg-dark rounded-md" />
            </div>
          </div>
        </div>
      </div>
      <div class="flex py-4 px-2 bg-dark">
        <div class="items-center flex justify-between mb-5">
          <div v-if="isProviderClicked" class="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-6 2xl:grid-cols-8 gap-4">
            <div class="relative overflow-hidden flex flex-col bg-darken rounded-md" v-for="(game, index) in sortedGames" :key="index">
              <div class="group mx-auto">
                <div class="relative overflow-hidden">
                  <div class="h-full">
                    <img :src="game.image" class="w-full h-full object-fit-cover hover:opacity-80" />
                  </div>
                  <div
                    class="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100 hover:scale-110 transform origin-center bg-black bg-opacity-60">
                    <div v-if="isGameLaunching">
                      <div class="loader mx-auto mt-4"></div>
                    </div>
                    <div v-else>
                      <div
                        class="absolute inset-0 flex flex-col items-center justify-center space-y-2 opacity-0 transition-all duration-300 group-hover:opacity-100 hover:scale-110 transform origin-center bg-black bg-opacity-60">
                        <!-- Favourite Icon -->
                        <nuxt-icon v-if="!isFavorite(game.code) && authStore.isAuth" name="favourite"
                          class="cursor-pointer bg-darklight rounded-md hover:bg-dark text-coco"
                          @click="addToFavorites(game)" />
                        <!-- Play Now Button -->
                        <button
                          class="hover:bg-gray-700 hover:cursor-pointer text-xs font-black justify-center py-2 px-3 uppercase conicyellow rounded-xl"
                          @click="playGame(game.code)">PLAY NOW</button>
                      </div>
                    </div>
                  </div>
                  <div v-if="game.tags == 'popular'" class="absolute top-1 left-2">
                    <span class="text-xs font-medium px-2.5 pt-0.5 pb-1 rounded bg-news text-red-600 uppercase">
                      {{ game.tags }}
                    </span>
                  </div>
                  <div v-if="game.tags == 'new'" class="absolute top-1 left-2">
                    <span class="text-xs font-medium px-2.5 pt-0.5 pb-1 rounded bg-news text-green-800 uppercase">
                      {{ game.tags }}
                    </span>
                  </div>
                  <div v-if="game.tags == 'hot'" class="absolute top-1 left-2">
                    <span class="text-xs font-medium px-2.5 pt-0.5 pb-1 rounded bg-news text-red-900 uppercase">
                      {{ game.hot }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="items-center mt-1 text-center">
                <span class="text-white text-sm font-bold ml-2 truncate uppercase">{{ game.title }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { usePublicStore } from '@/store/PublicStore';
import { useStoreGames } from '@/store/StoreGames';
import { useAuthStore } from '@/store/AuthStore';
import { useContentStore } from '@/store/ContentStore';
import { useMemberStore } from '@/store/MemberStore';

// Assing Variabel from store 
const publicStore = usePublicStore();
const storeGames = useStoreGames();
const authStore = useAuthStore();
const contentStore = useContentStore();
const memberStore = useMemberStore();
const clickedProvider = ref('');
const searchTerm = ref('');
const tagFilter = ref('');
const selectedProvider = ref('');
const activeFilter = ref('');
const selectedProviderLogo = ref('');
const isLoading = ref(false);
const favorites = ref({});

// Filter Cataegory Provider
const isProviderClicked = computed(() => clickedProvider.value);
const currentCategory = ref('arcade');

const setTagFilter = (tag) => {
  tagFilter.value = tag;
  activeFilter.value = tag;
};

// Load Games
const loadContent = async (provider) => {
  isLoading.value = true;
  selectedProvider.value = provider.code;
  try {
    // Set the selectedProviderLogo to the provider's logo URL
    selectedProviderLogo.value = provider.prefs ? provider.prefs['logo.url'] : '';
    await storeGames.fetchGameData(provider.code, currentCategory.value);
    clickedProvider.value = provider.code;
  } catch (error) {
    console.error("Error fetching games for provider:", error);
  } finally {
    isLoading.value = false;
  }
};

// Change games category
const changeCategory = async (category) => {
  if (currentCategory.value !== category) {
    currentCategory.value = category;
    selectedProvider.value = '';
    clickedProvider.value = '';
  }
};

// Filter Games
const sortedGames = computed(() => {
  const gamesList = storeGames.gameAll.data.games || [];
  const filteredGames = gamesList.filter(game => {
    const titleMatches = !searchTerm.value || game.title.toLowerCase().includes(searchTerm.value.toLowerCase());
    const tagMatches = !tagFilter.value || game.tags === tagFilter.value;
    return titleMatches && tagMatches;
  });
  return filteredGames;
});

// favorite 
const addToFavorites = async (game) => {
  try {
    await storeGames.favoriteGameData({
      code: game.code,
      provider: game.provider
    });

    // Update the favorites object to set the game as favorited
    favorites.value[game.code] = true;

    // Refresh the user profile to update favorite games list
    await memberStore.GetProfile();

  } catch (error) {
    console.error("Error adding game to favorites:", error);
  }
};

const favoriteCodes = computed(() => {
  // Get favorite games from each category
  const favoriteArcade = memberStore.profile.favorite?.arcade || [];
  const favoriteTable = memberStore.profile.favorite?.table || [];
  const favoriteCrash = memberStore.profile.favorite?.crash || [];

  // Combine and map to get an array of codes
  const allFavorites = [...favoriteArcade, ...favoriteTable, ...favoriteCrash];
  return allFavorites.map(fav => fav.code);
});

const isFavorite = (code) => {
  return favoriteCodes.value.includes(code);
};

// Play Games
const playGame = async (gameCode) => {
  let newWindow = null;

  try {
    if (!authStore.isAuth) {
      const $loginButton = document.querySelector('#buttonlogin');
      return $loginButton.click();
    }

    newWindow = window.open('', '_blank');
    const currentURL = window.location.href;

    const game = storeGames.gameAll.data.games.find(g => g.code === gameCode);

    if (!game) {
      console.error("Game not found");
      if (newWindow) newWindow.close();
      return;
    }

    const launchURL = await storeGames.launchGameData({
      code: game.code,
      provider: game.provider,
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
.loader {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #caab72;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
