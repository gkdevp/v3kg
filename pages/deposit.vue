<template>
    <div class="bg-dark">
        <div class="mx-auto container p-4 ">
            <div class="bg-neutral-100 text-zinc-500 text-sm p-6 overflow-hidden rounded-2xl">
                <div class="text-sm rounded-2xl overflow-hidden">
                    <div
                        class="border-b-4 text-lightco text-[1.63rem] leading-8 mb-8 pb-3 indent-[0.94rem] border-lightco border-solid">
                        DEPOSIT</div>
                    <!---Transaksi--->
                    <label
                        class="rounded-lg flex items-center text-white cursor-pointer h-16 px-4 mb-3 w-full bg-gray-700 hover:bg-dark"
                        @click="toggleTransactions">
                        <span class="text-sm font-medium h-5 leading-5 uppercase w-full">Transaksi Deposit Terbaru Saya
                        </span>
                        <nuxt-icon v-if="showTransactions" name="icon-up" />
                        <nuxt-icon v-else name="icon-down" />
                    </label>
                    <!---Desktop---->
                    <div v-if="showTransactions"
                        class="hidden lg:block md:blcok 2xl:block rounded-bl-lg rounded-br-lg pb-4 px-2 overflow-auto max-h-32 mb-2">
                        <div
                            class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-6 font-light text-white border-collapse text-center">
                            <div class="hidden lg:block md:block bg-darken text-sm py-1 pl-3 pr-1 border border-dark">
                                <strong>Tanggal / Waktu</strong>
                            </div>
                            <div class="bg-darken text-sm py-1 pl-3 pr-1 border border-dark">
                                <strong>ID Transaksi</strong>
                            </div>
                            <div class="bg-darken text-sm py-1 pl-3 pr-1 border border-dark">
                                <strong>Bank</strong>
                            </div>
                            <div class="hidden lg:block md:block bg-darken text-sm py-1 pl-3 pr-1 border border-dark">
                                <strong>Tipe</strong>
                            </div>
                            <div class="bg-darken text-sm py-1 pl-3 pr-1 border border-dark">
                                <strong>Jumlah</strong>
                            </div>
                            <div class="bg-darken text-sm py-1 pl-3 pr-1 border border-dark">
                                <strong>Status</strong>
                            </div>
                        </div>
                        <div v-for="deposit in payStore.depositDetails" :key="deposit.trx_id"
                            class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-6 text-gray-800 border-collapse">
                            <div class=" hidden lg:block md:block text-sm text-center border border-zinc-300 p-3">
                                {{ deposit.date }} - {{ deposit.time }}
                            </div>
                            <div class="text-sm text-center border border-zinc-300 p-3">
                                <button @click="copyToClipboard(deposit.trx_id)"
                                    class="my-1 cursor-pointer text-xs text-coco bg-gray-700 hover:bg-gray-800 rounded px-2 py-1 transition duration-300 ease-in-out">
                                    {{ copiedTrxIds.includes(deposit.trx_id) ? 'Copied' : 'Copy TRX_ID' }}
                                </button>
                            </div>
                            <div class="text-sm text-center border border-zinc-300 p-3 uppercase">
                                {{ deposit.source_provider }}
                            </div>
                            <div class="hidden lg:block md:block text-sm text-center border border-zinc-300 p-3 uppercase">
                                {{ deposit.type }}
                            </div>
                            <div class="text-sm text-center border border-zinc-300 p-3">
                                IDR. {{ new Intl.NumberFormat('id-ID').format(deposit.amount) }}
                            </div>
                            <div class="text-sm text-center border border-zinc-300 p-3 uppercase" :class="{
                                'text-green-500': deposit.status === 'approved',
                                'text-red-500': deposit.status === 'rejected',
                                'text-yellow-500': deposit.status === 'pending'
                            }">
                                {{ deposit.status }}
                            </div>
                        </div>
                        <div v-if="!payStore.detailDeposit" class="text-sm text-center border border-zinc-300 p-3"
                            colspan="6">
                            No Latest Deposit
                        </div>
                    </div>
                    <!----Mobile--->
                    <div v-if="showTransactions"
                        class="lg:hidden md:hidden 2xl:hidden mt-0 w-full whitespace-nowrap text-left grid gap-3 mb-2 overflow-y-auto max-h-56">
                        <template v-for="deposit in payStore.depositDetails">
                            <div
                                class="bg-white px-4 py-3 border border-gray-300 rounded-lg shadow-sm transition hover:shadow">
                                <div class="flex items-center">
                                    <nuxt-icon name="calendar" class="mr-1" />
                                    <div class="uppercase font-medium my-1">{{ deposit.date }} - {{ deposit.time }}</div>
                                </div>
                                <div class="flex justify-between items-center mt-2">
                                    <div class="flex items-center space-x-3">
                                        <img :src="deposit.icon" :alt="deposit.source_provider"
                                            class="h-8 w-12 bg-slate-600 object-cover rounded-md" />
                                        <div>
                                            <div class="uppercase font-medium my-1">{{ deposit.type }}</div>
                                            <button @click="copyToClipboard(deposit.trx_id)"
                                                class="my-1 cursor-pointer text-xs text-coco bg-gray-700 hover:bg-gray-800 rounded px-2 py-1 transition duration-300 ease-in-out">
                                                {{ copiedTrxIds.includes(deposit.trx_id) ? 'Copied' : 'Copy TRX_ID' }}
                                            </button>
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <div :class="{
                                            'text-green-500': deposit.status === 'approved',
                                            'text-red-500': deposit.status === 'rejected',
                                            'text-yellow-500': deposit.status === 'pending'
                                        }" class="text-sm font-medium py-1 rounded-full uppercase">
                                            {{ deposit.status }}
                                        </div>
                                        <div class="font-bold text-lg text-gray-800 mt-1">
                                            IDR {{ new Intl.NumberFormat('id-ID').format(deposit.amount) }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <div v-if="!payStore.depositDetails" class="text-sm text-center border-2 border-zinc-300 p-3"
                            colspan="6">
                            No Latest Deposit
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
                            <div class="mb-3.5">
                                <div class="items-center flex justify-between mb-3">
                                    <label class="font-bold mb-1">
                                        Rekening Tujuan
                                        <span class="text-red-600 cursor-pointer">*</span>
                                    </label>
                                </div>
                                <select v-model="selectedPayment" disabled
                                    class="uppercase md:h-9 lg:h-9 w-full items-center bg-white text-zinc-800 py-1.5 px-3 align-middle border border-zinc-300 border-solid rounded">
                                    <template v-for="category in Object.keys(filteredPayments || {})">
                                        <optgroup :label="category">
                                            <option class="uppercase" v-for="payment in filteredPayments[category]"
                                                :key="payment.provider_id" :disabled="payment.status === 'maintenance'"
                                                :value="payment">
                                                {{ payment.provider_id }} {{ payment.number }}
                                            </option>
                                        </optgroup>
                                    </template>
                                </select>
                            </div>
                            <div class="mb-3.5" v-if="selectedPayment">
                                <div class="items-center bg-darken text-lightwhite flex flex-wrap rounded p-3.5">
                                    <div class="flex-grow overflow-hidden">
                                        <img :src="selectedPayment.icon" alt="" class="h-9">
                                        <h1 class="text-xl font-medium uppercase mt-2">
                                            {{ selectedPayment.name }}
                                        </h1>
                                        <span class="text-xl font-medium uppercase break-all">
                                            {{ selectedPayment.number }}
                                        </span>
                                    </div>
                                    <div class="flex basis-full justify-between">
                                        <h4 class="leading-8 font-medium mt-1 uppercase break-all"
                                            :class="selectedPayment.status === 'maintenance' ? 'text-red-500' : 'text-green-400'">
                                            {{ selectedPayment.status === 'active' ? 'online' : (selectedPayment.status ===
                                                'maintenance' ? 'offline' : selectedPayment.status) }}
                                        </h4>
                                        <NuxtLink @click="copyToClipboard(selectedPayment.number)"
                                            class="ml-3 bg-brownlight text-white font-bold py-2 px-4 rounded cursor-pointer">
                                            {{ copiedTrxIds.includes(selectedPayment.number) ? 'Copied' : 'Copy' }}
                                        </NuxtLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-200 mb-3.5 rounded p-3">
                            <label class="inline-block font-bold mb-1">
                                Jumlah
                                <span class="text-red-600">*</span>
                            </label>
                            <div class="rounded">
                                <div class="flex">
                                    <div class="flex items-center flex-grow pb-1">
                                        <span class="text-base mx-1 text-zinc-500 font-semibold">Rp.</span>
                                        <input v-model="displayAmount" @input="updateAmount" type="text"
                                            class="h-9 w-full bg-white cursor-text py-1.5 px-3 align-middle border border-zinc-300 border-solid" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-200 mb-3.5 rounded p-3">
                            <label class="inline-block font-bold mb-1">Tanda Terima Transaksi</label>
                            <div>
                                <input type="file"
                                    class="w-full bg-white text-zinc-800 px-3 text-ellipsis align-middle border border-zinc-300 border-solid rounded overflow-hidden" />
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
                                {{ loadingStates['SUBMIT'] ? 'Loading...' : 'SUBMIT' }}
                            </button>
                        </div>
                        <div v-if="memberStore.profile.has_pending_transaction" class="mb-3.5 text-center">
                            <button type="submit"
                                class="text-white border-lightwhite items-start text-sm font-semibold py-2 px-3 text-center w-32 h-9 rounded-full bg-dark/75"
                                :disabled="memberStore.profile.has_pending_transaction">
                                Submit Deposit
                            </button>
                        </div>
                    </form>
                </div>
                <!-- Toast Container -->
                <div id="toastdepositform"
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
import { ref, computed } from 'vue';
import { useMemberStore } from '@/store/MemberStore';
import { usePayStore } from '@/store/PaymentStore';
import { useDetailStore } from '@/store/DetailStore';
import { useBalanceStore } from '@/store/BalanceStore';

definePageMeta({ middleware: 'isauth-mid' });

// Reactive Variable 
const memberStore = useMemberStore();
const payStore = usePayStore();
const balanceStore = useBalanceStore();
const detailStore = useDetailStore();
const isLoading = ref(false);
const loadingStates = ref({});
const selectedPayment = ref();
const avialablePayment = ref();
const copiedTrxIds = ref([]);
const rawAmount = ref('');
const showTransactions = ref(false);

// filter for payment approved
const shouldHideCategory = (category) => {
    const payments = memberStore.profile.payment_accounts[category];
    return payments.every(payment =>
        ['rejected', 'pending'].includes(payment.status)
    );
};

// filter payments 
const filteredPayments = computed(() => {
    let result = {};
    if (avialablePayment.value && avialablePayment.value.provider_id) {
        const selectedProvider = avialablePayment.value.provider_id;
        for (const category of Object.keys(detailStore.detailMember.payment_gateway)) {
            result[category] = detailStore.detailMember.payment_gateway[category].filter(payment => payment.provider_id === selectedProvider);
        }
        const allFilteredPayments = Object.values(result).flat();
        if (!allFilteredPayments.includes(selectedPayment.value)) {
            selectedPayment.value = allFilteredPayments[0];
        }
        return result;
    }
    if (!detailStore.detailMember?.payment_gateway) {
        return {};
    }
});

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

// Construct the submitPayment
const submitPayment = async () => {
    isLoading.value = true;
    const paymentCreate = {

        player_account_id: avialablePayment.value ? avialablePayment.value.account_id : '',

        amount: rawAmount.value,

        payment_gateway_code: selectedPayment.value ? selectedPayment.value.provider_id : '',

        payment_gateway_number: selectedPayment.value ? selectedPayment.value.number : ''

    };

    try {
        await payStore.createPayment(paymentCreate);

        showToast("Deposit has been submited", 'success', 'toastdepositform');

        memberStore.GetProfile();

        await payStore.detailDeposit();

        // clean form 
        rawAmount.value = "";

        isLoading.value = false;
    }

    catch (error) {

        let errorMessage = error.messages || 'An unexpected error occurred.';

        errorMessage = Object.values(error.messages).flat().join(' & ');

        showToast(errorMessage, 'error', 'toastdepositform');

        isLoading.value = false;
    }
};

// Toggel Latest Deposit
const toggleTransactions = async () => {
    try {

        showTransactions.value = !showTransactions.value;

    } catch (error) {

        console.error("Error toggling transactions:", error);

    }
}

onMounted(() => {
    payStore.detailDeposit();
});
</script>

<style scoped>
:deep(.nuxt-icon svg) {
    width: 1em;
    height: 1em;
}
</style>