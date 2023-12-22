<template>
  <div class="bg-dark py-2">
    <div class="container mx-auto px-2 md:px-0">
      <OthersTopBar />
      <div class="flex flex-col md:flex-row">
        <OthersLeftSidebar />
        <div class="flex flex-col flex-grow">
          <div class="bg-zinc-200 text-zinc-500 text-sm md:p-10 lg:p-10 2xl:p-10 overflow-hidden p-2 h-104">
            <div class="flex flex-row md:flex-row justify-between items-center border-lightco border-solid border-b-4 py-3">
              <div class="text-lightco text-xl md:text-3xl leading-8 md:mb-0">
                LIST BANK ACCOUNT
              </div>
              <NuxtLink to="/account/bank" class="flex items-center justify-center py-2 md:py-3 px-4 md:px-6 text-zinc-100 border border-solid rounded-lg uppercase font-bold bg-lightco hover:bg-opacity-80 transition ease-in-out duration-150 md:mt-0">
                ADD BANK
              </NuxtLink>
            </div>
            <div class="box-border text-cyan-50 leading-6 py-6 px-2 w-full inline-block gap-4">
              <div class="overflow-y-auto h-102">
                <div class="space-y-4">
                  <div v-for="(account, index) in paginatedPaymentMethods" :key="index"
                    class="bg-stone-100 p-4 rounded-lg shadow">
                    <div class="flex justify-between items-center">
                        <div class="flex items-center space-x-2">
                          <img :src="account.icon" alt="" class="h-10 rounded shadow-md">
                          <div>
                            <div class="text-lightco text-sm font-medium my-1 uppercase">{{ account.account_name }}</div>
                            <div class="font-bold text-sm text-gray-500">{{ formatAccountId(account.account_id) }}</div>
                          </div>
                        </div>
                        <div>
                          <div class="items-center">
                            <span class="font-medium text-sm text-gray-500 uppercase"
                              :class="statusColor(account.status)">{{ account.status }}
                            </span>
                            <div>
                              <button
                                class="my-1 cursor-pointer text-sm bg-gray-700 hover:bg-gray-800 rounded px-2 py-1 transition duration-300 ease-in-out text-red-500 uppercase"
                                @click="updateStatus(account, 'disable')"
                                v-if="account.status === 'approved'">Disable</button>
                              <button
                                class="my-1 cursor-pointer text-sm bg-gray-700 hover:bg-gray-800 rounded px-2 py-1 transition duration-300 ease-in-out text-green-500 uppercase"
                                @click="updateStatus(account, 'enable')"
                                v-if="account.status === 'disabled'">Enable</button>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Pagination controls -->
            <div class="flex justify-center mt-4">
              <button @click="currentPage > 1 && currentPage--" class="mx-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Prev</button>
              <span>Page {{ currentPage }} of {{ pageCount }}</span>
              <button @click="currentPage < pageCount && currentPage++" class="mx-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Next</button>
            </div>
            <div id="toastbankprofile"
                class="relative mt-8 w-full sm:max-w-xl sm:grid-cols-6 p-4 rounded-md shadow-lg text-left hidden mb-4">
                <div class="absolute top-2 right-2" id="toast-icon-container">
                  <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg">
                    <svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor" viewBox="0 0 20 20">
                      <path
                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                  </div>
                </div>
                <span class="text-white"></span>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useMemberStore } from '@/store/MemberStore';
import { usePayStore } from '@/store/PaymentStore';

// Metadata
definePageMeta({ middleware: 'isauth-mid' });

// Store Initialization
const memberStore = useMemberStore();
const payStore = usePayStore();

// Pagination state
const currentPage = ref(1);
const pageSize = 10;

// Computed property for paginated payment methods
const paginatedPaymentMethods = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize;
  return allPaymentMethods.value.slice(startIndex, startIndex + pageSize);
});

// Computed property for the total page count
const pageCount = computed(() => {
  return Math.ceil(allPaymentMethods.value.length / pageSize);
});

// Computed property to consolidate all payment methods
const allPaymentMethods = computed(() => {
  const profile = memberStore.profile.payment_accounts;
  if (!profile) return [];
  const bank = profile.bank || [];
  const ewallet = profile.ewallet || [];
  const crypto = profile.crypto || [];
  const pulsa = profile.pulsa || [];
  return [...bank, ...ewallet, ...crypto, ...pulsa];
});


// This function will automatically be available in the template
const formatAccountId = (accountId) => {
  let startDigits = String(accountId).slice(0, 2);
  let endDigits = String(accountId).slice(-8);
  return `...${startDigits}-${endDigits}`;
}

// Method to Determine Status Color
const statusColor = (status) => {
  status = status.trim().toLowerCase();
  switch (status) {
    case 'approved':
      return 'text-green-400';
    case 'pending':
      return 'text-yellow-500';
    case 'rejected':
      return 'text-red-500';
    case 'disabled':
      return 'text-gray-600';
  }
};

//Method update payment 
const updateStatus = async (account, action) => {
  const accountRef = ref(account);
  try {
    if (action === 'enable') {
      accountRef.value.status = 'approved';
    } else {
      accountRef.value.status = 'disabled';
    }
    await payStore.updatePayment(accountRef.value.provider_id, accountRef.value.account_id, action);
  } catch (error) {
    let errorMessage = error.message || 'An unexpected error occurred.';
    errorMessage = Object.values(error.message).flat().join(' & ');
    showToast(errorMessage, 'error', 'toastbankprofile');
  }
};
</script>
