<template >
  <div class="bg-darken">
    <NuxtLoadingIndicator :throttle="0" />
    <NuxtLayout />
      <Header />
      <client-only>
        <div>
          <p v-if="justCameOnline" class="flex justify-center bg-green-500">You are back online!</p>
          <p v-if="!isOnline" class="flex justify-center bg-red-600">You are offline, Please check your connection
          </p>
        </div>
      </client-only>
      <OthersBroadcastMessages v-if="authStore.isAuth" /> 
      <NuxtPage />
      <Footer />
  </div>
</template>

<script setup>
import '@/assets/css/global.css'

// Use Pinia Store
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { usePublicStore } from '@/store/PublicStore';
import { useContentStore } from '@/store/ContentStore';
import { useAuthStore } from '@/store/AuthStore';
import { useBalanceStore } from '@/store/BalanceStore';
import { useMemberStore } from '@/store/MemberStore';
import { useDetailStore } from '@/store/DetailStore';
import { useNotfyStore } from '@/store/NotificationStore';
import { useVoucherStore } from '@/store/VoucherStore';


// Use Composables to check connection
import useOnlineStatus from '@/composables/OnlineStatus'
const { isOnline, justCameOnline } = useOnlineStatus()


// Define variable for Store
const publicStore = usePublicStore();
const contentStore = useContentStore();
const authStore = useAuthStore();
const balanceStore = useBalanceStore();
const memberStore = useMemberStore();
const detailStore = useDetailStore();
const notfyStore = useNotfyStore(); 
const voucherStore = useVoucherStore(); 

const lastCalledTimestamp = ref(0);
let timer = null; // to store the setTimeout reference

function onTabFocus() {
  const now = Date.now();
  const timeSinceLastCall = now - lastCalledTimestamp.value;

  if (timeSinceLastCall >= 60000) {
    invokeBalanceMember();
  } else {
    const waitTime = 60000 - timeSinceLastCall;
    if (timer) clearTimeout(timer); 
    timer = setTimeout(invokeBalanceMember, waitTime);
  }
}

function invokeBalanceMember() {
  balanceStore.fetchBalance();
  lastCalledTimestamp.value = Date.now();
}

onBeforeUnmount(() => {
  window.removeEventListener('focus', onTabFocus);
  if (timer) clearTimeout(timer); // Clear the timer if it's still active
});


//Handle Rehydrate from Hard Refresh
const fetcDetail = () => {

  //General Store
  publicStore.fetchPublic();
  contentStore.getContent();

  //After Login Store
  if(authStore.isAuth === true){
    balanceStore.fetchBalance();
    memberStore.GetProfile();
    detailStore.fetchDetail();
    notfyStore.fetchNotifications();
    voucherStore.fetchVoucher();
  }
}

onMounted(async () => {
  fetcDetail();
  window.addEventListener('focus', onTabFocus);
});
</script>

<style scoped>
</style>


