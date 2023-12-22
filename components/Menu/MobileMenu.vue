<template>
  <div class="sm:hidden fixed bottom-0 left-0 z-50 w-full h-[4.5rem] backdrop-blur-2xl bgblur">
    <div class="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
      <NuxtLink to="/" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-500 group">
        <nuxt-icon name="icon-home" />
        <span class="text-sm text-white group-hover:text-gray-600 dark:group-hover:text-blue-500 uppercase">home</span>
      </NuxtLink>
      <NuxtLink to="/promo" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-500 group">
        <nuxt-icon name="icon-promo" />
        <span class="text-sm text-white group-hover:text-gray-600 dark:group-hover:text-blue-500 uppercase">promo</span>
      </NuxtLink>
      <NuxtLink v-show="!authStore.isAuth"
        class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-500 group">
        <button id="buttonlogin">
          <nuxt-icon name="login" />
          <span class="text-sm text-white group-hover:text-gray-600 dark:group-hover:text-blue-500 uppercase">login</span>
        </button>
      </NuxtLink>
      <NuxtLink to="/account" v-show="authStore.isAuth"
        class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-500 group">
        <nuxt-icon name="profile" />
        <span class="text-sm text-white group-hover:text-gray-600 dark:group-hover:text-blue-500 uppercase">profile</span>
      </NuxtLink>
      <NuxtLink v-show="!authStore.isAuth" id="register-mobile"
        class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-500 group">
        <nuxt-icon name="register" />
        <span
          class="text-sm text-white group-hover:text-gray-600 dark:group-hover:text-blue-500 uppercase">register</span>
      </NuxtLink>
      <NuxtLink to="wallet" v-show="authStore.isAuth"
        class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-500 group">
        <nuxt-icon name="wallet" />
        <span class="text-sm text-white group-hover:text-gray-600 dark:group-hover:text-blue-500 uppercase">wallet</span>
      </NuxtLink>
      <NuxtLink class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-500 group">
        <nuxt-icon name="support" />
        <span class="text-sm text-white group-hover:text-gray-600 dark:group-hover:text-blue-500 uppercase">chat</span>
      </NuxtLink>
    </div>
  </div>
  <div id="drawer-menu"
    class="fixed top-0 right-0 z-50 w-11/12 h-screen p-4 overflow-y-auto transition-transform translate-x-full backdrop-blur-lg bgblur"
    tabindex="-1" aria-labelledby="drawer-navigation-label">
    <div class="flex h-fit">
      <button type="button" id="drawer-hide-button"
        class="text-gray-400 bg-secondary rounded-full text-sm p-1.5 inline-flex items-center">
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"></path>
        </svg>
        <span class="sr-only">Close menu</span>
      </button>
    </div>
    <div class="flex items-center justify-between mx-auto p-3">
      <div class="flex">
        <NuxtLink to="/" class="flex">
          <img src="/logo.svg" class="mx-auto h-16" alt="Juara303" />
        </NuxtLink>
      </div>
    </div>
    <div class="py-4">
      <div class="flex flex-wrap gap-4 justify-center">
        <NuxtLink class="w-24 h-20 rounded-lg border border-darkligt bg-darken text-center"
          v-for="(item, index) in dropdownItems" :key="index" :to="item.to" @click="hideDrawer">
          <div class="w-full h-full rounded-lg flex flex-col items-center justify-center">
            <nuxt-icon :name="item.icon" />
            <span class="mt-2 text-xs">{{ item.label }}</span>
          </div>
        </NuxtLink>
      </div>
    </div>
    <div v-if="authStore.isAuth">
      <h4 class="text-md text-white my-2 ">Akun Saya</h4>
      <div class="rounded-md bg-gray-700">
        <div class="mx-auto p-2">
          <div class="gap-2 justify-center">
            <div class="cursor-pointer font-bold justify-between flex rounded-lg">
              <nuxt-icon name="voucher" />
              <div class="ml-auto">
                <span class="text-neutral-400 text-md"> Total Saldo </span>
                <div>
                  <span class="text-orange-300 text-md">IDR</span>
                  <span class="text-orange-300 text-md">{{ authStore.balance }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pt-6 pb-6">
        <div class="flex flex-wrap gap-4 justify-center">
          <div class="w-24 h-20 rounded-lg border border-darkligt bg-darken text-center"
            v-for="(item, index) in dropdownlogin" :key="index" @click="hideDrawer">
            <div class="w-full h-full rounded-lg flex flex-col items-center justify-center">
              <NuxtLink :to="item.to">
                <nuxt-icon :name="item.icon" />
                <span class="mt-2 text-xs">{{ item.label }}</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pb-16">
      <div class="flex flex-wrap gap-4 justify-center">
        <NuxtLink class="w-24 h-20 rounded-lg border border-darkligt bg-darken text-center"
          v-for="(item, index) in dropdownOther" :key="index" @click="hideDrawer">
          <div class="w-full h-full rounded-lg flex flex-col items-center justify-center">
            <!-- Conditionally render the entire div based on the user's authentication state -->
            <div v-if="item.title === 'LOGOUT' && authStore.isAuth">
              <nuxt-icon :name="item.icon" />
              <span class="ml-2 text-xs" @click="Logout">{{ item.label }}</span>
            </div>
            <div v-else-if="item.title !== 'LOGOUT'">
              <nuxt-icon :name="item.icon" />
              <span class="ml-2 text-xs">{{ item.label }}</span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
  <HeaderLogin />
</template>

<script setup>
import { onMounted } from 'vue';
import { Drawer } from 'flowbite';
import { useAuthStore } from '@/store/AuthStore';
import { useContentStore } from '@/store/ContentStore';

const authStore = useAuthStore();
const contentStore = useContentStore();

// Split the menu items based on the requirement
const dropdownItems = computed(() => {
  const index = contentStore.mobileGeneral.findIndex(item => item.label === "PROMO");
  if (index !== -1) {
    return contentStore.mobileGeneral.slice(0, index + 1); // +1 to include the PROMO item
  }
  return [];
});

const dropdownOther = computed(() => {
  const startIndex = contentStore.mobileGeneral.findIndex(item => item.label === "REFFERAL");

  const endIndex = contentStore.mobileGeneral.length - 1;
  if (startIndex !== -1) {
    return contentStore.mobileGeneral.slice(startIndex, endIndex + 1);
  }
  return [];
});

const dropdownlogin = computed(() => {
  const startIndex = contentStore.mobileGeneral.findIndex(item => item.label === "PROFILE");

  const endIndex = contentStore.mobileGeneral.findIndex(item => item.label === "HISTORY");
  if (startIndex !== -1 && endIndex !== -1) {
    return contentStore.mobileGeneral.slice(startIndex, endIndex + 1);
  }
  return [];
});

const hideDrawer = () => {
    const $drawerClose = document.getElementById('drawer-hide-button');
    $drawerClose.click();
}

onMounted(() => {
  const $targetEl = document.getElementById('drawer-menu');
  const $drawerHideButton = document.getElementById('drawer-hide-button');
  const $drawerShowButton = document.getElementById('drawer-show-button');
  const options = {
    placement: 'right',
    backdrop: true,
    bodyScrolling: false,
    edge: false,
    edgeOffset: '',
    backdropClasses: 'bg-black bg-opacity-10 fixed inset-0 z-30',
  };

  if ($targetEl) {
    const drawer = new Drawer($targetEl, options);
    $drawerShowButton.addEventListener('click', () => {
      drawer.toggle();
    });
    $drawerHideButton.addEventListener('click', () => {
      drawer.hide();
    });
  }
});
</script>

<style scoped>
:deep(.nuxt-icon svg) {
  width: 3em;
  height: 2em;
}</style>