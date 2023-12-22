<template>
  <div class="bg-dark">
    <div v-for="(config, index) in contentStore.featuredProviders.pageConfigs" :key="index">
      <img v-if="config.category === 'slot'" :src="config.image" :alt="`Image for ${config.category}`"
        class="h-full w-full object-cover align-middle overflow-clip" />
    </div>
    <div class="container mx-auto">
      <div class="my-4 w-full h-auto boxshadow">
        <!--Desktop-->
        <div v-if="$device.isDesktop">
          <div class="grid grid-cols-8 gap-2.5">
            <div class="bg-darklight rounded-md" v-for="(provider, index) in publicStore.public.game_providers?.slot"
              :key="index">
              <div v-if="isLoading && selectedProvider === provider.code" class="loader mx-auto mt-4"></div>
              <div v-else>
                <div class="provider-container"
                  :class="{ 'bg-darklight rounded-md': selectedProvider === provider.code }">
                  <!--Maintenance-->
                  <div class="h-full bg-black bg-opacity-95 inset-0 rounded-md" v-if="provider.status === 'maintenance'">
                    <div class="relative h-16 mx-auto rounded-full overflow-hidden p-1">
                      <img v-if="provider.prefs" :src="provider.prefs['logo.url']" class="w-full object-cover"
                        loading="lazy" />
                      <div class="absolute inset-0 flex items-center justify-center">
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
                          <img v-if="provider.prefs" :src="provider.prefs['logo.url']"
                            class="w-full h-full object-contain" loading="lazy" />
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
        <!----Mobile Version---->
        <div v-if="$device.isMobileOrTablet" class="relative mx-1">
          <swiper class="visible md:invisible swiper-container"
            :modules="[SwiperAutoplay, SwiperNavigation]" :rewind="true"
            :onSwiper="onSwiper"
            :autoplay="{ delay: 30000, pauseOnMouseEnter: true }" :slides-per-view="3" :space-between="10"
            :pagination="{ clickable: true }" @init="onSwiperInit" @slideChange="onSlideChange">
            <SwiperSlide v-for="(provider, index) in publicStore.public.game_providers?.slot" :key="index"
              class="bg-darklight rounded-md">
              <div v-if="isLoading && selectedProvider === provider.code" class="loader mx-auto mt-4"></div>
              <div v-else>
                <div class="provider-container"
                  :class="{ 'bg-darklight rounded-md': selectedProvider === provider.code }">
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
                          <img v-if="provider.prefs" :src="provider.prefs['logo.url']"
                            class="w-full h-full object-contain" loading="lazy" />
                        </div>
                        <div class="text-white text-xs uppercase font-semibold text-center mt-1">{{ provider.name }}</div>
                      </div>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <button @click="goPrev">Previous</button>
            <button @click="goNext">Next</button>
          </Swiper>
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
            <div class="relative overflow-hidden flex flex-col bg-darken rounded-md" v-for="(game, index) in sortedGames"
              :key="index">
              <div class="group mx-auto">
                <div class="relative overflow-hidden overflow-ellipsis whitespace-nowrap truncate">
                  <div class="h-full">
                    <img :src="game.image" class="w-full h-full object-fit-cover hover:opacity-80" />
                  </div>
                  <div
                    class="absolute inset-0 flex flex-col items-center justify-center space-y-2 opacity-0 transition-all duration-300 group-hover:opacity-100 hover:scale-110 transform origin-center bg-black bg-opacity-60">
                    <nuxt-icon v-if="!isFavorite(game.code) && authStore.isAuth" name="favourite"
                      class="cursor-pointer bg-darklight rounded-md hover:bg-dark text-coco"
                      @click="addToFavorites(game)" />
                    <button v-if="authStore.isAuth && memberStore.profile.status === 'active'"
                      class="hover:bg-gray-700 hover:cursor-pointer text-xs font-black justify-center py-2 px-3 uppercase conicyellow rounded-xl"
                      @click="playGame(game.code)">PLAY NOW</button>
                    <button v-if="!authStore.isAuth || memberStore.profile.status === 'registered'"
                      class="items-center box-border text-white cursor-pointer text-xs font-black h-10 justify-center mr-2 py-3 px-5 uppercase w-20 flex border-2 border-white border-solid rounded-xl bg-red-600/[0.1] hover:bg-dark"
                      @click="playGame(game.code)">DEMO</button>
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
                <span class="text-white text-sm font-bold ml-2 uppercase whitespace-nowrap overflow-hidden text-ellipsis">
                  {{ game.title }}
                </span>
                <div class="flex justify-center items-center my-1">
                  <span
                    class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white rounded-full"
                    :class="{
                      'bg-red-600': getRtpColor(game.rtp) === 'red',
                      'bg-yellow-400': getRtpColor(game.rtp) === 'yellow',
                      'bg-green-500': getRtpColor(game.rtp) === 'green'
                    }">
                    <svg
                      :class="{ 'text-red-200': getRtpColor(game.rtp) === 'red', 'text-yellow-200': getRtpColor(game.rtp) === 'yellow', 'text-green-200': getRtpColor(game.rtp) === 'green' }"
                      class="w-4 h-4 mr-1" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        d="M9 20l-5.447-2.724A2 2 0 012 15.382V8.618a2 2 0 011.553-1.894L9 4m0 16v-8m0 0l11 5.5V9.5L9 4v8z">
                      </path>
                    </svg>
                    Current RTP : {{ game.rtp }}%
                  </span>
                </div>
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
import { useAuthStore } from '@/store/AuthStore'
import { useContentStore } from '@/store/ContentStore';
import { useMemberStore } from '@/store/MemberStore';

// Assing Variabel from store 
const publicStore = usePublicStore();
const storeGames = useStoreGames();
const authStore = useAuthStore()
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
// const mySwiper = ref(null);
// const isAtBeginning = ref(true);
// const isAtEnd = ref(false);

const isProviderClicked = computed(() => clickedProvider.value);
const category = 'slot';

// const onSwiperInit = (swiper) => {
//   mySwiper.value = swiper;
//   isAtBeginning.value = swiper.isBeginning;
//   isAtEnd.value = swiper.isEnd;
//   // Force the right button to be shown initially
//   isAtEnd.value = false;
// };

// const onSlideChange = (swiper) => {
//   isAtBeginning.value = swiper.isBeginning;
//   isAtEnd.value = swiper.isEnd;
// };

// Tag
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
    await storeGames.fetchGameData(provider.code, category);
    clickedProvider.value = provider.code;
  } catch (error) {
    console.error("Error fetching games for provider:", error);
  } finally {
    isLoading.value = false;
  }
};

// Filter Games
const sortedGames = computed(() => {
  const gamesList = storeGames.gameAll.data.games || [];
  gamesList.forEach(game => game.isFavorite = false); // Initialize isFavorited property
  gamesList.forEach(game => {
    game.isFavorite = false;
    generateRtpForGame(game); // Generate an RTP for each game
  });
  const filteredGames = gamesList.filter(game => {
    const titleMatches = !searchTerm.value || game.title.toLowerCase().includes(searchTerm.value.toLowerCase());
    const tagMatches = !tagFilter.value || game.tags === tagFilter.value;
    return titleMatches && tagMatches;
  });
  return filteredGames;
});

// Function to generate RTP for a game
function generateRtpForGame(game) {
  game.rtp = generateRandomRtp();  // This calls the imported function
  game.rtpColor = getRtpColor(game.rtp);
}

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
  const favoriteSlots = memberStore.profile.favorite?.slot;
  if (Array.isArray(favoriteSlots)) {
    return favoriteSlots.map(fav => fav.code);
  } else {
    return [];
  }
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
    console.log(launchURL)
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

.swiper-button-next,
.swiper-button-prev {
  @apply text-lightwhite;
}

.swiper-container::before,
.swiper-container::after {
  content: "";
  position: absolute;
  width: 3em;
  height: 100%;
  top: 0;
  z-index: 5;
}

.swiper-button-next,
.swiper-button-prev {
  @apply text-lightwhite;
}

.swiper-container::before {
  left: 0;
  background: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
}

.missing {
  display: none;
}

.swiper-container::after {
  right: 0;
  background: linear-gradient(to left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
}
</style>