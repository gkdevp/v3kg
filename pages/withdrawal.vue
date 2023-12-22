<template>
    <div class="bg-dark">
        <div class="mx-auto container p-4">
            <div class="bg-neutral-100 text-zinc-500 text-sm p-6 overflow-hidden rounded-2xl">
                <div class="text-sm rounded-2xl overflow-hidden">
                    <div
                        class="border-b-4 text-lightco text-[1.63rem] leading-8 mb-8 pb-3 indent-[0.94rem] border-lightco border-solid">
                        WITHDRAWAL</div>
                    <!---Transaksi---->
                    <label
                        class="items-center text-white cursor-pointer h-16 px-4 mb-3 w-full flex rounded-lg bg-gray-700 hover:bg-dark"
                        @click="toggleTransactions">
                        <span class="text-sm font-medium h-5 leading-5 uppercase w-full"> Transaksi Withdraw Terbaru Saya
                        </span>
                        <nuxt-icon v-if="showTransactions" name="icon-up" />
                        <nuxt-icon v-else name="icon-down" />
                    </label>
                    <!---Desktop---->
                    <div v-if="showTransactions"
                        class="hidden lg:block md:block 2xl:block rounded-bl-lg rounded-br-lg pb-4 px-2 mb-3.5 overflow-auto max-h-32">
                        <div class="grid grid-cols-6 font-light text-white border-collapse text-center">
                            <div class="bg-darken text-sm py-1 pl-3 pr-1 border border-dark">
                                <strong>Tanggal / Waktu</strong>
                            </div>
                            <div class="bg-darken text-sm py-1 pl-3 pr-1 border border-dark">
                                <strong>ID Transaksi</strong>
                            </div>
                            <div class="bg-darken text-sm py-1 pl-3 pr-1 border border-dark">
                                <strong>Bank</strong>
                            </div>
                            <div class="bg-darken text-sm py-1 pl-3 pr-1 border border-dark">
                                <strong>Tipe</strong>
                            </div>
                            <div class="bg-darken text-sm py-1 pl-3 pr-1 border border-dark">
                                <strong>Jumlah</strong>
                            </div>
                            <div class="bg-darken text-sm py-1 pl-3 pr-1 border border-dark">
                                <strong>Status</strong>
                            </div>
                        </div>
                        <div v-for="withdraw in payStore.withdrawDetails" :key="withdraw.trx_id"
                            class="grid grid-cols-6 text-gray-800 border-collapse">
                            <div class="text-sm text-center border-2 border-zinc-300 p-3">
                                {{ withdraw.date }} - {{ withdraw.time }}
                            </div>
                            <div class="text-sm text-center border border-zinc-300 p-3">
                                <button @click="copyToClipboard(withdraw.trx_id)"
                                    class="my-1 cursor-pointer text-xs text-coco bg-gray-700 hover:bg-gray-800 rounded px-2 py-1 transition duration-300 ease-in-out">
                                    {{ copiedTrxIds.includes(withdraw.trx_id) ? 'Copied' : 'Copy TRX_ID' }}
                                </button>
                            </div>
                            <div class="text-sm text-center border border-zinc-300 p-3 uppercase">
                                {{ withdraw.dst_provider }}
                            </div>
                            <div class="text-sm text-center border border-zinc-300 p-3 uppercase">
                                {{ withdraw.type }}
                            </div>
                            <div class="text-sm text-center border border-zinc-300 p-3">
                                IDR. {{ new Intl.NumberFormat('id-ID').format(withdraw.amount) }}
                            </div>
                            <div class="text-sm text-center border border-zinc-300 p-3 uppercase" :class="{
                                'text-green-500': withdraw.status === 'approved',
                                'text-red-500': withdraw.status === 'rejected',
                                'text-yellow-500': withdraw.status === 'pending'
                            }">
                                {{ withdraw.status }}
                            </div>
                        </div>
                        <div v-if="!payStore.detailWithdrawal" class="text-sm text-center border border-zinc-300 p-3"
                            colspan="6">
                            No Latest Withdraw
                        </div>
                    </div>
                    <!----Mobile--->
                    <div v-if="showTransactions"
                        class="lg:hidden md:hidden 2xl:hidden mt-0 w-full whitespace-nowrap text-left grid gap-3 mb-2 overflow-y-auto max-h-56">
                        <template v-for="withdraw in payStore.withdrawDetails" :key="withdraw.trx_id">
                            <div
                                class="bg-white px-4 py-3 border border-gray-300 rounded-lg shadow-sm transition hover:shadow">
                                <div class="flex items-center">
                                    <nuxt-icon name="calendar" class="mr-1" />
                                    <div class="uppercase font-medium my-1">{{ withdraw.date }} - {{ withdraw.time }}</div>
                                </div>
                                <div class="flex justify-between items-center mt-2">
                                    <div class="flex items-center space-x-3">
                                        <img :src="withdraw.icon" :alt="withdraw.source_provider"
                                            class="h-8 w-12 bg-slate-600 object-cover rounded-md" />
                                        <div>
                                            <div class="uppercase font-medium my-1">{{ withdraw.type }}</div>
                                            <button @click="copyToClipboard(withdraw.trx_id)"
                                                class="my-1 cursor-pointer text-xs text-coco bg-gray-700 hover:bg-gray-800 rounded px-2 py-1 transition duration-300 ease-in-out">
                                                {{ copiedTrxIds.includes(withdraw.trx_id) ? 'Copied' : 'Copy TRX_ID' }}
                                            </button>
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <div :class="{
                                            'text-green-500': withdraw.status === 'approved',
                                            'text-red-500': withdraw.status === 'rejected',
                                            'text-yellow-500': withdraw.status === 'pending'
                                        }" class="text-sm font-medium py-1 rounded-full uppercase">
                                            {{ withdraw.status }}
                                        </div>
                                        <div class="font-bold text-lg text-gray-800 mt-1">
                                            IDR {{ new Intl.NumberFormat('id-ID').format(withdraw.amount) }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <div v-if="!payStore.detailWithdrawal" class="text-sm text-center border-2 border-zinc-300 p-3"
                            colspan="6">
                            No Latest Withdrawal
                        </div>
                    </div>
                    <div class="bg-gray-200 mb-3.5 rounded p-3">
                        <label class="inline-block font-bold mb-1">
                            Saldo
                        </label>
                        <div class="my-1 text-lightco text-xl ">
                            IDR {{ balanceStore.balance }}
                        </div>
                    </div>
                    <div v-if="memberStore.profile.preferences?.name" class="bg-gray-200 mb-3.5 rounded p-3">
                        <label class="inline-block font-bold mb-1">
                            Nama
                        </label>
                        <input type="text" readonly v-model="memberStore.profile.username"
                            class="uppercase my-1 text-lightco h-9 w-full items-baseline bg-white px-3 text-ellipsis align-middle border border-zinc-300 border-solid rounded overflow-hidden pointer-events-none" />
                    </div>
                    <div v-if="!memberStore.profile.preferences?.name"
                        class="flex items-center text-md mb-3.5 rounded p-4 bg-yellow-100 border border-yellow-500"
                        role="alert">
                        <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span class="sr-only">Info</span>
                        <span class="mr-1 font-medium">Please Add your Name First</span>
                        <NuxtLink to="/account" class="text-lightco cursor-pointer font-medium">Click Here</Nuxtlink>
                    </div>
                    <form v-on:submit.prevent="submitPayment">
                        <div v-if="hasApprovedPaymentAccounts" class="bg-gray-200 mb-3.5 rounded p-3">
                            <label class="inline-block font-bold mb-1">
                                Rekening Asal
                                <span class="text-red-600">*</span>
                            </label>
                            <select v-model="avialablePayment"
                                class="uppercase h-full md:h-9 lg:h-9 w-full items-center bg-white text-zinc-800 py-1.5 px-3 align-middle border border-zinc-300 border-solid rounded">
                                <template
                                    v-for="category in (memberStore.profile.payment_accounts ? Object.keys(memberStore.profile.payment_accounts) : [])"
                                    :key="category">
                                    <optgroup :label="category" :hidden="shouldHideCategory(category)">
                                        <option v-for="payment in memberStore.profile.payment_accounts[category]"
                                            :hidden="['rejected', 'pending'].includes(payment.status)"
                                            :disabled="payment.status === 'disabled'" :key="payment.provider_id"
                                            :value="payment">
                                            <span class="uppercase">{{ payment.provider_id }} {{
                                                payment.account_id }}</span>
                                        </option>
                                    </optgroup>
                                </template>
                            </select>
                            <!--- Account Detail --->
                            <div class="mt-3.5" v-if="avialablePayment">
                                <div class="items-center bg-darken text-lightwhite flex flex-wrap rounded p-3.5">
                                    <div class="flex-grow overflow-hidden">
                                        <img :src="avialablePayment.icon" alt="" class="h-9">
                                        <h1 class="text-xl font-medium uppercase mt-2">
                                            {{ avialablePayment.account_name }}
                                        </h1>
                                        <span class="text-xl font-medium uppercase break-all">
                                            {{ avialablePayment.account_id }}
                                        </span>
                                    </div>
                                    <div class="flex basis-full justify-between">
                                        <h4 class="leading-8 font-medium mt-1 uppercase break-all"
                                            :class="avialablePayment.status === 'maintenance' ? 'text-red-500' : 'text-green-400'">
                                            {{ avialablePayment.status === 'active' ? 'online' : (avialablePayment.status
                                                ===
                                                'maintenance' ? 'offline' : avialablePayment.status) }}
                                        </h4>
                                        <NuxtLink @click="copyToClipboard(avialablePayment.account_id)"
                                            class="ml-3 bg-brownlight text-white font-bold py-2 px-4 rounded cursor-pointer">
                                            {{ copiedTrxIds.includes(avialablePayment.account_id) ? 'Copied' : 'Copy' }}
                                        </NuxtLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else
                            class="flex items-center text-md mb-3.5 rounded p-4 bg-yellow-100 border border-yellow-500"
                            role="alert">
                            <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span class="sr-only">Info</span>
                            <span class="mr-1 font-medium">Please Submit Your Payment and Get Approved</span>
                            <NuxtLink to="/account/bank" class="text-lightco cursor-pointer font-medium">Click Here
                            </Nuxtlink>
                        </div>
                        <div class="bg-gray-200 mb-3.5 rounded p-3">
                            <label class="inline-block font-bold mb-1">
                                Jumlah
                                <span class="text-red-600">*</span>
                            </label>
                            <div class="rounded">
                                <div class="flex">
                                    <div class="flex items-center flex-grow">
                                        <span class="text-base mx-1 text-zinc-500 font-semibold">Rp.</span>
                                        <input v-model="displayAmount" @input="updateAmount" type="text"
                                            class="h-9 w-full bg-white cursor-text py-1.5 px-3 align-middle border border-zinc-300 border-solid" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="memberStore.profile.has_pending_transaction"
                            class="flex items-center p-4 mb-4 text-sm rounded-lg bg-yellow-100 border border-yellow-500 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200"
                            role="alert">
                            <svg class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-7a1 1 0 011-1h2a1 1 0 110 2h-2v2a1 1 0 11-2 0v-2H7a1 1 0 110-2h2V9a1 1 0 012 0v2zM9 3a1 1 0 012 0v2a1 1 0 11-2 0V3z"
                                    clip-rule="evenodd" />
                            </svg>
                            <span class="sr-only">Info</span>
                            <div>
                                <span class="font-medium">Action Needed!</span> You have pending transactions. Please
                                complete them to proceed.
                            </div>
                        </div>
                        <div v-if="!memberStore.profile.has_pending_transaction" class="mb-3.5 text-center">
                            <button type="submit" ctype="submit" class="signup text-white">
                                SUBMIT
                            </button>
                        </div>
                        <div v-if="memberStore.profile.has_pending_transaction" class="mb-3.5 text-center">
                            <button type="submit"
                                class="text-white border-lightwhite items-start text-sm font-semibold py-2 px-3 text-center w-40 h-9 rounded-full bg-dark/75"
                                :disabled="memberStore.profile.has_pending_transaction">
                                Submit Withdraw
                            </button>
                        </div>
                    </form>
                </div>
                <!-- Toast Container -->
                <div id="toastwithdrawform"
                    class="relative w-full sm:max-w-xl sm:grid-cols-6 p-4 rounded-md shadow-lg text-left hidden my-4">
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
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useMemberStore } from '@/store/MemberStore';
import { usePayStore } from '@/store/PaymentStore';
import { useBalanceStore } from '@/store/BalanceStore';

definePageMeta({ middleware: 'isauth-mid' });

// Reactive Variable 
const memberStore = useMemberStore();
const payStore = usePayStore();
const balanceStore = useBalanceStore();
const isLoading = ref(false);
const avialablePayment = ref();
const copiedTrxIds = ref([]);
const rawAmount = ref('');
const showTransactions = ref(false);

// filter for paymanet approved
const shouldHideCategory = (category) => {
    const payments = memberStore.profile.payment_accounts[category];
    return payments.every(payment =>
        ['rejected', 'pending'].includes(payment.status)
    );
};

// Change Amount to IDR Format 
const displayAmount = computed({
    get: () => formatNumber(rawAmount.value),
    set: (value) => {
        rawAmount.value = value.replace(/\D/g, '');
    },
});

function formatNumber(value) {
    if (!value) return '';
    return new Intl.NumberFormat('de-DE').format(value);
}

function updateAmount() {
    displayAmount.value = formatNumber(rawAmount.value);
}

// Copy Account Number & TRX
const copyToClipboard = (trxId) => {
    navigator.clipboard.writeText(trxId).then(() => {

        // Mark the transaction ID as copied
        copiedTrxIds.value.push(trxId);

        // After 2 seconds, revert the copied status
        setTimeout(() => {
            const index = copiedTrxIds.value.indexOf(trxId);
            if (index > -1) {
                copiedTrxIds.value.splice(index, 1);
            }
        }, 700);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
};

// Check for paymanet already approved or not
const hasApprovedPaymentAccounts = computed(() => {
    const paymentAccounts = memberStore.profile.payment_accounts;
    return paymentAccounts && Object.values(paymentAccounts).some(category =>
        category.some(payment => payment.status === 'approved')
    );
})

// Construct the submitPayment
const submitPayment = async () => {
    isLoading.value = true;

    const paymentDeduct = {

        player_account_id: avialablePayment.value ? avialablePayment.value.account_id : '',

        amount: rawAmount.value,
    };
    try {
        await payStore.dectPayment(paymentDeduct);

        await balanceStore.fetchBalance();

        await payStore.detailWithdrawal();

        memberStore.GetProfile();

        showToast("Withdrawal Has Been Submited", 'success', 'toastwithdrawform');

        // clean form 

        rawAmount.value = "";

        isLoading.value = false;

    } catch (error) {

        let errorMessage = error.messages || 'An unexpected error occurred.';

        errorMessage = Object.values(error.messages).flat().join(' & ');

        showToast(errorMessage, 'error', 'toastwithdrawform');

        isLoading.value = false;
    }
};

// Toggel Latest Withdrawal
const toggleTransactions = async () => {
    try {
        showTransactions.value = !showTransactions.value;

    } catch (error) {

        console.error("Error toggling transactions:", error);
    }
}

onMounted(() => {
    payStore.detailWithdrawal();
});
</script>

<style scoped>
:deep(.nuxt-icon svg) {
    width: 1em;
    height: 1em;
}</style>