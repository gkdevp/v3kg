<template>
  <div class="relative">
    <!-- Background Image -->
    <img src="https://s3.bttmedia.com/hub/b3/banners/HQ2xvGjjfJzTyaOOe545XHYbSXlzRs6Hk3Ct1f9Y.jpg"
      class="w-full h-full object-cover" />

    <!-- Sign-up Form and Cards -->
    <div class="absolute inset-0 flex items-center justify-between bgblackblur">
      <div v-if="authStore.isAuth === false"
        class="w-full bg-opacity-60 bg-gray-700 p-6 rounded-xl absolute right-5 flex-shrink-0 max-w-sm ml-5 scale-90 z-10 top-20 items-end">
        <HeaderDesktopRegister />
      </div>

      <div v-if="authStore.isAuth"
        class="w-full h-full bg-opacity-60 p-6 rounded-xl fixed right-1 flex-shrink-0 max-w-sm ml-5 scale-90 top-12 items-end marbg">
        <OthersLatestWinner />
      </div>
      
      <!-- Cards Container -->
      <div class="grid grid-cols-5 gap-4 w-3/5 mr-5 absolute bottom-24">
        <!-- Card 1 -->
        <div class="rounded-lg p-5">
          <a href="https://www.bettilt.com/en/profile/wallet/deposit"
            class="items-center justify-center py-1.5 underline flex w-full h-9">
            <img src="https://s3.bttmedia.com/hub/b3/images/CgO2loYUcflN0CV7hULZgeHrbWzPENcddFg38SS0.png"
              class="cursor-pointer w-24 h-full" />
          </a>
        </div>
        <!-- Card 2 -->
        <div class="rounded-lg p-5">
          <a href="https://www.bettilt.com/en/profile/wallet/deposit"
            class="items-center justify-center py-1.5 underline flex w-full h-9">
            <img src="https://s3.bttmedia.com/hub/b3/images/vwplYuf2keSIbbddyRhgkBfIohHwjoyIoVB56h5L.png"
              class="cursor-pointer w-24 h-full" />
          </a>
        </div>
        <!-- Card 3 -->
        <div class="rounded-lg p-5">
          <a href="https://www.bettilt.com/en/profile/wallet/deposit"
            class="items-center justify-center py-1.5 underline flex w-full h-9">
            <img src="https://s3.bttmedia.com/hub/b3/images/g8gsxmMcqZ4uiIzN3OMPQHnTIqklz1m4bQ4zYooA.png"
              class="cursor-pointer w-24 h-full" />
          </a>
        </div>
        <!-- Card 4 -->
        <div class="rounded-lg p-5">
          <a href="https://www.bettilt.com/en/profile/wallet/deposit"
            class="items-center justify-center py-1.5 underline flex w-full h-9">
            <img src="https://s3.bttmedia.com/hub/b3/images/ZkKtYpoCpP5Skf0VAosFy11Mi76VCVzcJ2sPxhzp.png"
              class="cursor-pointer w-full h-full" />
          </a>
        </div>
        <!-- Card 5 -->
        <div class="rounded-lg p-5">
          <a href="https://www.bettilt.com/en/profile/wallet/deposit"
            class="items-center justify-center py-1.5 underline flex w-full h-9">
            <img src="https://s3.bttmedia.com/hub/b3/images/CgO2loYUcflN0CV7hULZgeHrbWzPENcddFg38SS0.png"
              class="cursor-pointer w-24 h-full" />
          </a>
        </div>
      </div>
    </div>
  </div>

  <div class="text-white pb-5 px-5 relative grid pt-0 gap-5 bg-gray-800">
    <div class="flex max-w-lg -mt-20 mr-auto mb-5 ml-0">
      <div class="grid-cols-[324px_324px_324px_324px_0px] grid-rows-[8.13rem] grid w-full gap-3">
        <NuxtLink to="/sports"
          class="bg-gray-800 items-start flex-col relative flex w-full h-32 rounded-2xl overflow-hidden p-6 transform transition duration-200 ease-in-out hover:scale-105">
          <div
            class="bg-[url(https://s3.bttmedia.com/hub/b3/banners/wVlXx3ekeurXWBZteGDgI4C5q1slm20djPsLHlpx.jpg)] bg-no-repeat bottom-0 bg-center bg-cover cursor-pointer left-0 absolute top-0 w-full h-full">
          </div>
          <div class="text-white cursor-pointer text-base font-semibold mb-1 z-10">Sport Betting</div>
          <div
            class="text-white bg-gray-800 items-center cursor-pointer text-sm font-semibold justify-center px-4 flex h-10 min-w-[6.88rem] mt-3 rounded-3xl z-10 hover:bg-yl hover:text-graylight">
            Play now
          </div>
        </NuxtLink>
        <NuxtLink to="/slot"
          class="bg-gray-800 items-start flex-col relative flex w-full h-32 rounded-2xl overflow-hidden p-6 transform transition duration-200 ease-in-out hover:scale-105">
          <div
            class="bg-[url(https://s3.bttmedia.com/hub/b3/banners/ED2kU8q7OaZwvIE049iHjQu0hpTGqKF6x8Emm9ki.jpg)] bg-no-repeat bottom-0 bg-center bg-cover cursor-pointer left-0 absolute top-0 w-full h-full">
          </div>
          <div class="text-white cursor-pointer text-base font-semibold mb-1 z-10">Slot Games</div>
          <div
            class="text-white bg-gray-800 items-center cursor-pointer text-sm font-semibold justify-center px-4 flex h-10 min-w-[6.88rem] mt-3 rounded-3xl z-10 hover:bg-yl hover:text-graylight">
            Play now
          </div>
        </NuxtLink>
        <NuxtLink to="/casino"
          class="bg-gray-800 items-start flex-col relative flex w-full h-32 rounded-2xl overflow-hidden p-6 transform transition duration-200 ease-in-out hover:scale-105">
          <div
            class="bg-[url(https://s3.bttmedia.com/hub/b3/banners/FKTuLgKwgTKIKlbDJ9faeTrZVcgKTmceykv3iCAg.jpg)] bg-no-repeat bg-center bg-cover bottom-0 cursor-pointer left-0 absolute top-0 w-full h-full">
          </div>
          <div class="text-white cursor-pointer text-base font-semibold mb-1 z-10">Live casino</div>
          <div
            class="text-white bg-gray-800 items-center cursor-pointer text-sm font-semibold justify-center px-4 flex h-10 min-w-[6.88rem] mt-3 rounded-3xl z-10 hover:bg-yl hover:text-graylight">
            Play now
          </div>
        </NuxtLink>
        <NuxtLink to="/games"
          class="bg-gray-800 items-start flex-col relative flex w-full h-32 rounded-2xl overflow-hidden p-6 transform transition duration-200 ease-in-out hover:scale-105">
          <div
            class="bg-[url(https://s3.bttmedia.com/hub/b3/banners/6duESU6XmiSZYhM20qkNdvZqKm7Q6Gz3mGOsj09r.jpg)] bg-no-repeat bg-center bg-cover bottom-0 cursor-pointer left-0 absolute top-0 w-full h-full">
          </div>
          <div class="text-white cursor-pointer text-base font-semibold mb-1 z-10">Arcade Games</div>
          <div
            class="text-white bg-gray-800 items-center cursor-pointer text-sm font-semibold justify-center px-4 flex h-10 min-w-[6.88rem] mt-3 rounded-3xl z-10 hover:bg-yl hover:text-graylight">
            Play now
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { useAuthStore } from '@/store/AuthStore';

const authStore = useAuthStore();


</script>