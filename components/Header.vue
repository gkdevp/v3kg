<template>
  <div class="relative">
    <!-- Fixed Navbar -->
    <div :class="{ 'bg-transparent': !scrolled, 'bg-graylight': scrolled }"
      class="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-5 h-20 transition-all ease-in-out duration-300">
      <!-- Logo -->
      <NuxtLink to="/">
        <img src="/logo.svg" class="cursor-pointer w-auto h-16 mr-16 ml-3" />
      </NuxtLink>
      <!-- Navigation Links -->
      <div class="flex h-full gap-7 mr-auto" >
        <NuxtLink v-for="(link, index) in filteredMenu" :key="index" :to="link.to" :class="{ 'text-white': !scrolled, 'text-custom-slate': scrolled }"  class="nav-item text-sm font-bold flex items-center">{{ link.label }}</NuxtLink>
      </div>
      <!-- Authentication Buttons -->
      <div v-if="authStore.isAuth === false" class="flex">
        <button id="buttonlogin"
          class="text-base font-bold py-2 px-5 flex items-center justify-center border-2 border-emerald-400 rounded-3xl hover:bg-greenlight hover:border-greenlight">
          Login
        </button>
        <button id="register-mobile"
          class="text-base font-bold py-2 px-5 flex items-center justify-center ml-3 conicylw rounded-3xl text-gray-900">
          Sign Up
        </button>
      </div>
      <div v-if="authStore.isAuth" class="flex">
        <div class="items-center cursor-pointer text-center flex w-full h-11 overflow-visible">
          <img src="https://www.bettilt.com/static/media/user-profile-normal.7c68759c17cd0536329309b499e1b51d.svg"
            class="w-9 h-9 mr-1.5" />
          <div class="items-start flex-col flex"><span class="text-slate-300 text-sm font-medium">Balance</span>
            <span class="text-yl text-base font-bold">Rp. {{ balanceStore.balance }}</span>
          </div>
          <button @click="toggleTransactions" class="mx-2">
            <nuxt-icon v-if="showProfile" name="icon-up" />
            <nuxt-icon v-else name="icon-down" />
          </button>
        </div>
        <NuxtLink to="/deposit"
          class="text-base font-bold py-2 px-5 flex items-center justify-center ml-3 conicylw rounded-3xl text-gray-900">
          Deposit
        </NuxtLink>
        <div v-if="showProfile"
          class="fixed top-[68px] right-[20px] flex max-w-[660px] w-full p-8 rounded-[12px] z-10 bgprof">
          <OthersDekstopMenuProfile />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useContentStore } from '@/store/ContentStore';
import { useAuthStore } from '@/store/AuthStore';
import { useBalanceStore } from '@/store/BalanceStore';


// Store instance
const authStore = useAuthStore();
const balanceStore = useBalanceStore();
const contentStore = useContentStore();

// State references
const showProfile = ref();
const scrolled = ref(false);

// Filter Menu
const filteredMenu = computed(() => {
    const startIndex = contentStore.menuGeneral.findIndex(item => item.label === 'SLOT');
    const endIndex = contentStore.menuGeneral.findIndex(item => item.label === 'PROMO');
    return contentStore.menuGeneral.slice(startIndex, endIndex + 1);
});

// Toggel Latest Deposit
const toggleTransactions = async () => {
  try {

    showProfile.value = !showProfile.value;

  } catch (error) {

    console.error("Error toggling transactions:", error);

  }
}

// Top Navbar Bg Changes
const handleScroll = () => {
  scrolled.value = window.scrollY > 0;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style></style>