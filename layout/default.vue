<template>
  <div class="bg-black">
    <NuxtLoadingIndicator :throttle="0" />
    <Header />
    <client-only>
        <div>
          <p v-if="justCameOnline" class="flex justify-center bg-green-500">You are back online!</p>
          <p v-if="!isOnline" class="flex justify-center bg-red-600">You are offline, Please check your connection
          </p>
        </div>
    </client-only>
    <NotifyMessages v-if="authStore.isAuth" />
    <NuxtPage />
    <Footer />
  </div>
</template>
<script setup>
// Use Composables to check connection
import useOnlineStatus from '@/composables/OnlineStatus'
const { isOnline, justCameOnline } = useOnlineStatus()

// Import Store
import { useAuthStore } from '@/store/AuthStore'

// Define variable for Store
const authStore = useAuthStore()
</script>