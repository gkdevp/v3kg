<template>
  <div class="bg-dark">
    <div v-for="(config, index) in contentStore.featuredProviders.pageConfigs" :key="index">
      <img v-if="config.category === 'live'" :src="config.image" :alt="`Image for ${config.category}`"
           class="h-full w-full object-cover align-middle overflow-clip" />
    </div> 
    <!-- Filter Buttons -->
    <div class="container mx-auto my-4">
      <div class="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-6 mx-2 gap-4">
        <button v-for="tag in availableTags" :key="tag" @click="selectedTag = tag"
          :class="{ 'bg-brownlight': selectedTag === tag, 'bg-darken': selectedTag !== tag }"
          class="text-white p-2 rounded uppercase">
          {{ tag.charAt(0).toUpperCase() + tag.slice(1) }}
        </button>
      </div>
    </div>
    <div class="w-full py-6 container mx-auto">
      <ul class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 mx-2 lg:grid-cols-4 gap-3.5">
        <li v-for="(provider, index) in providersWithStatus" :key="index" class="relative">
          <div v-if="provider.status !== 'maintenance'"
            class="relative cursor-pointer overflow-hidden hover:scale-105 transition-transform duration-300 rounded-lg group shadow-lg">
            <div class="relative border border-gray-700 text-coco">
              <div class="flex-col relative">
                <div class="items-center flex-grow justify-center relative flex">
                  <!-- Image with gradient overlay -->
                  <img :src="provider.image" :alt="provider.alt" class="object-cover relative w-full h-full" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                </div>
                <!-- Button with enhanced styles -->
                <div class="top-full w-full bg-coco flex flex-col justify-center">
                  <button v-if="authStore.isAuth && memberStore.profile.status === 'active'" @click="playGame(provider)"
                    class="text-white text-center cursor-pointer text-md bg-brownligh p-2 rounded uppercase hover:bg-gray-500 transition-bg duration-200">
                    Play Now
                  </button>
                  <NuxtLink to="/deposit" v-if="authStore.isAuth && memberStore.profile.status === 'registered'"
                    class="text-white text-center cursor-pointer text-md bg-brownligh p-2 rounded uppercase hover:bg-gray-500 transition-bg duration-200">
                    Deposit Now
                  </NuxtLink>
                  <button v-if="!authStore.isAuth" @click="Login_Button()"
                    class="text-white text-center cursor-pointer text-md bg-brownligh p-2 rounded uppercase hover:bg-gray-500 transition-bg duration-200">
                    Login Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="relative border border-gray-700 border-solid overflow-hidden text-white h-full">
            <img :src="provider.image" :alt="provider.alt" class="object-cover w-full h-full" />
            <div class="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center">
              <img src="https://kgaming.b-cdn.net/kr/maintenance.webp" />
              <div class="text-center p-1 md:p-4 lg:p-4 2xl:p-4">
                <span class="text-xs md:text-xl lg:text-xl font-bold uppercase">{{ provider.code }} (Maintenance)</span>
                <p class="text-xs">{{ provider.maintenanceMessage }}</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { usePublicStore } from '@/store/PublicStore';
import { useContentStore } from '@/store/ContentStore';
import { useStoreGames } from '@/store/StoreGames';
import { useAuthStore } from '@/store/AuthStore';
import { useMemberStore } from '@/store/MemberStore';

const publicStore = usePublicStore();
const contentStore = useContentStore();
const storeGames = useStoreGames();
const authStore = useAuthStore();
const memberStore = useMemberStore();
const selectedTag = ref('all');
let newWindow = null;

// Compute tagOrder based on the provider_tag values
const tagOrder = computed(() => {
  const tagsSet = new Set();
  if (publicStore.public.game_providers?.live) {
    publicStore.public.game_providers.live.forEach(provider => {
      if (provider.provider_tag) {
        provider.provider_tag.split(',').forEach(tag => tagsSet.add(tag));
      }
    });
  }
  return Array.from(tagsSet);
});

// Match Content with provider 
const providersWithStatus = computed(() => {
  if (!publicStore.public.game_providers?.live || !contentStore.featuredProviders.live) {
    return [];
  }

  return contentStore.featuredProviders.live.map(provider => {
    const matchingProvider = publicStore.public.game_providers.live.find(p => p.code === provider.code);

    // Add provider_tag to the provider object
    if (matchingProvider) {
      provider.provider_tag = matchingProvider.provider_tag;
    }

    return {
      ...provider,
      status: matchingProvider ? matchingProvider.status : 'active',
      maintenanceMessage: matchingProvider && matchingProvider.status === 'maintenance' ? 'This provider is currently under maintenance' : ''
    };
  }).filter(provider =>
    selectedTag.value === 'all' ||
    (provider.provider_tag && provider.provider_tag.includes(selectedTag.value))
  );
});

// Compute available tags from the providers
const availableTags = computed(() => {
  const tags = new Set(['all', ...tagOrder.value]);
  return Array.from(tags);
});

// Login Button
const Login_Button = () => {
  const $loginButton = document.querySelector('#buttonlogin');
  return $loginButton.click();
}

// Play Games
const playGame = async (provider) => {
  try {

    newWindow = window.open('', '_blank');
    const currentURL = window.location.href;

    const launcherGames = {
      code: provider.code + "-direct",
      provider: provider.code,
      exit_url: currentURL
    };

    const launchURL = await storeGames.launchGameData(launcherGames);
    console.log(launchURL)
    if (launchURL && newWindow) {
      newWindow.location = launchURL;
    } else if (newWindow) {
      newWindow.close();
    }
  } catch (error) {
    console.error("Error launching game:", error);
  }
};
</script>
