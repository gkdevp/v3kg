<template>
  <div v-if="showNotification" class="pointer-events-none fixed inset-0 flex items-center justify-center px-4 py-6 sm:items-start sm:justify-end sm:p-6 sm:px-4 sm:py-6 sm:inset-y-0 sm:inset-x-4 z-50">
    <div class="flex w-full max-w-sm flex-col items-center space-y-4 sm:items-end">
      <div class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg bg-darken backdrop-blur-2xl bg-opacity-60 p-4">
        <p :class="{'text-green-500': isApproved, 'text-red-500': isRejected}">{{ configStore.ablyUrl.value.status }}</p>
        <template v-if="isDeposit || isWithdraw">
            <p class="mt-1 text-sm text-white my-2">Amount : IDR. {{ new Intl.NumberFormat('id-ID').format(configStore.ablyUrl.value.amount) }}</p>
        </template>
        <template v-if="isDeposit && isApproved">
            <div class="flex items-center space-x-2 my-1">
                <nuxt-icon name="deposit" class="text-coco" />
                <p class="text-sm text-white font-medium">Your Deposit Has Been Successful.</p>
            </div>
        </template>
        <template v-if="isWithdraw && isApproved">
            <div class="flex items-center space-x-2 my-1">
                <nuxt-icon name="withdraw" class="text-coco" />
                <p class="text-sm text-white font-medium">Your Withdrawal Has Been Successful.</p>
            </div>
        </template>
        <template v-if="isRejected">
            <div class="flex items-center space-x-2 my-1">
                <nuxt-icon name="rewards" class="text-coco" />
                <p class="text-sm text-white font-medium">Your Request is Rejected</p>
            </div>
        </template>
        <template v-if="isIssued">
            <div class="flex items-center space-x-6">
                <nuxt-icon name="rewards" class="h-6 w-6 text-green-500 mr-4" />
                <p class="text-sm text-green-500 font-medium break-all uppercase">{{ configStore.ablyUrl.value.type }}</p>
            </div>
            <p class="text-sm text-white font-medium break-all mx-5 my-2">{{ configStore.ablyUrl.value.name }}</p>
        </template>
        <template v-if="isExpired">
            <div class="flex items-center space-x-2">
                <nuxt-icon name="rewards" class="text-red-500 h-6 w-6 mr-4" />
                <p class="text-sm text-red-500 font-medium break-all uppercase">{{ configStore.ablyUrl.value.type }}</p>
            </div>
            <p class="text-sm text-white font-medium break-all mx-5 my-2">{{ configStore.ablyUrl.value.name }}</p>
        </template>
        <template v-if="isPayment">
            <div class="flex items-center p-2 rounded-lg">
                <nuxt-icon name="icon-currency" class="text-coco"/>
                <div class="flex-1">
                <p class="text-white text-base font-medium">{{ configStore.ablyUrl.value.provider_id }}</p>
                <p class="text-white text-sm font-medium break-all">Add Payment {{ configStore.ablyUrl.value.status }}</p>
                </div>
            </div>
        </template>
        <button @click="dismissToast" class="pointer-events-auto absolute top-3 right-3 p-2 text-white text-xl">×</button>
      </div>
    </div>
</div>
</template>

<script setup>
import { ref, watch, onUnmounted, computed } from 'vue';
import { useConfig } from '~/composables/UseConfig';
import { useBalanceStore } from '@/store/BalanceStore';
import { usePayStore } from '@/store/PaymentStore';
import { useNotfyStore } from '@/store/NotificationStore';
import { useMemberStore } from '@/store/MemberStore';
import { useVoucherStore } from '@/store/VoucherStore';


const balanceStore = useBalanceStore();
const payStore = usePayStore();
const configStore = useConfig();
const notfyStore = useNotfyStore();
const memberStore = useMemberStore();
const voucherStore = useVoucherStore();

let timer = null;
const showNotification = ref(false);

const isDeposit = computed(() => configStore.ablyUrl.value.type === "deposit");
const isWithdraw = computed(() => configStore.ablyUrl.value.type === "withdraw");
const isApproved = computed(() => configStore.ablyUrl.value.status === "approved");
const isRejected = computed(() => configStore.ablyUrl.value.status === "rejected");
const isPayment = computed(() => configStore.ablyUrl.value.type === "payment_account");
const isIssued = computed(() => configStore.ablyUrl.value.type === "issued");
const isExpired = computed(() => configStore.ablyUrl.value.type === "expired");

watch(configStore.ablyUrl, (newVal) => {
    if (newVal && newVal !== "{No messages}") {

        if (isDeposit.value) {

            if(isApproved) {
                balanceStore.fetchBalance();
            }

            memberStore.GetProfile();

            payStore.detailDeposit();
        }

        if (isWithdraw.value) {

            if(isRejected) {
                balanceStore.fetchBalance();
            }

            memberStore.GetProfile();

            payStore.detailWithdrawal();

        }

        if(isIssued.value || isExpired.value) {

            voucherStore.fetchVoucher();
        }

        if(isPayment.value) {
            memberStore.GetProfile();
        }

        notfyStore.fetchNotifications();
        notfyStore.newNotif = true;

        
        showNotification.value = true;

        clearTimeout(timer);
        timer = setTimeout(() => {
            showNotification.value = false;
        }, 5000);
    }
});

onUnmounted(() => {
    clearTimeout(timer);
});

// Dismiss toast function
const dismissToast = () => {
    showNotification.value = false;
};
</script>


<style scoped>

.icon-history {
  margin-right: 10px;
  display: flex;
  align-items: center;
}

.close-btn {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
}
</style>
