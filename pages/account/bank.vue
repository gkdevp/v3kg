<template>
    <div class="bg-dark py-2">
        <div class="container mx-auto px-2 md:px-0">
            <OthersTopBar />
            <div class="flex flex-col md:flex-row">
                <OthersLeftSidebar />
                <!--Main-->
                <div class="flex flex-col flex-grow">
                    <div class="text-zinc-800 text-sm md:rounded-2xl lg:rounded-2xl overflow-hidden">
                        <div class="bg-zinc-200 text-zinc-500 text-sm md:p-10 lg:p-10 2xl:p-10 overflow-hidden h-104">
                            <div
                                class=" text-lightco text-[1.63rem] leading-8 mb-8 p-3 indent-[0.94rem] border-lightco border-solid border-b-4">
                                ADD BANK ACCOUNT</div>
                            <form v-on:submit.prevent="addPayment" class="p-2">
                                <div class="text-gray-600 font-bold mb-6 uppercase">Tambah Rekening Baru</div>
                                <div class="flex text-sm justify-between items-center my-4">
                                    <div class="text-gray-800">Tipe Pembayaran</div>
                                    <!-- As category -->
                                    <div class="mb-2 relative">
                                        <select v-model="selectedPayment" @change="updateCategory"
                                            class="h-12 w-52 md:w-[40.13rem] lg:w-[40.13rem] 2xl:w-[40.13rem] items-center bg-white text-zinc-800 py-1.5 px-3 align-middle border border-zinc-300 border-solid rounded-3xl">
                                            <option
                                                v-for="category in (detailStore.detailMember && detailStore.detailMember.payment_gateway ? Object.keys(detailStore.detailMember.payment_gateway) : [])"
                                                :key="category" :value="category">
                                                {{ category }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <!---As provider_code-->
                                <div class="flex text-sm justify-between items-center my-4">
                                    <div class="text-gray-800">Nama Bank</div>
                                    <div>
                                        <div class="text-gray-800 inline-flex m in-h-[3.00rem] relative">
                                            <select v-model="selectedProviderCode" @change="updateProviderCode"
                                                class="h-12 w-52 md:w-[40.13rem] lg:w-[40.13rem] 2xl:w-[40.13rem] items-center bg-white text-zinc-800 py-1.5 px-3 align-middle border border-zinc-300 border-solid rounded-3xl">
                                                <option v-for="code in providerCodes" :key="code" :value="code">
                                                    {{ code }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <!-- As account_name -->
                                <div class="flex text-sm justify-between items-center my-4">
                                    <div class="text-gray-800">Account Name</div>
                                    <div>
                                        <div class="mb-2 relative">
                                            <input type="text" v-model="formData.addPayment.account_name"
                                                class="h-12 w-52 md:w-[40.13rem] lg:w-[40.13rem] 2xl:w-[40.13rem] bg-gray-200 text-gray-800 inline-flex font-bold py-3 pl-3.5 pr-16 border border-zinc-300 border-solid rounded-3xl"
                                                readonly />
                                        </div>
                                    </div>
                                </div>
                                <!-- As account_id -->
                                <div class="flex text-sm justify-between items-center my-4">
                                    <div class="text-gray-800">Account Number</div>
                                    <div>
                                        <div class="relative">
                                            <input v-model="formData.addPayment.account_id"
                                                class="h-12 w-52 md:w-[40.13rem] lg:w-[40.13rem] 2xl:w-[40.13rem] text-gray-800 inline-flex font-bold py-3 px-3.5 border border-zinc-300 border-solid rounded-3xl" />
                                        </div>
                                    </div>
                                </div>
                                <div class="gap-4 flex justify-end pt-8">
                                    <button type="submit"
                                        class="items-center bg-orange-300 text-gray-800 cursor-pointer flex text-sm font-black justify-center py-4 px-8 uppercase border border-solid rounded-3xl">
                                        Simpan Rekening Bank
                                    </button>
                                </div>
                            </form>
                            <div id="toastbankprofile"
                                class="relative mt-8 w-full sm:max-w-xl sm:grid-cols-6 p-4 rounded-md shadow-lg text-left hidden mb-4">
                                <div class="absolute top-2 right-2" id="toast-icon-container">
                                    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg">
                                        <svg class="w-6 h-6 text-white" aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
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
    </div>
</template>
  
<script setup>
import { useMemberStore } from '@/store/MemberStore';
import { usePayStore } from '@/store/PaymentStore';
import { useDetailStore } from '@/store/DetailStore';

// Metadata
definePageMeta({ middleware: 'isauth-mid' });

// Store Initialization
const memberStore = useMemberStore();
const detailStore = useDetailStore();
const payStore = usePayStore();

// Reactive Variables
const selectedPayment = ref("");
const selectedProviderCode = ref("");
const formData = ref({
    addPayment: {
        provider_code: "",
        account_id: "",
        account_name: memberStore.profile.preferences?.name,
        category: ""
    },
});

// Computed Variables
const providerCodes = computed(() => {
    return detailStore.detailMember?.payment_gateway?.[selectedPayment.value]?.map(provider => provider.provider_id) || [];
});

// Helper Functions
function computeProviderCodes() {
    return detailStore.detailMember?.[selectedPayment.value]?.map(provider => provider.provider_id) || [];
}

// Event Handlers
const updateCategory = () => {
    formData.value.addPayment.category = selectedPayment.value;
    providerCodes.value = computeProviderCodes();
};

const updateProviderCode = () => {
    formData.value.addPayment.provider_code = selectedProviderCode.value;
};

// Add Payment
const addPayment = async () => {
    try {
        await payStore.addPayment(formData.value.addPayment);
        await memberStore.GetProfile();
        showToast("Payment has been successfully added", 'success', 'toastbankprofile');
    } catch (error) {
        let errorMessage = error.messages || 'An unexpected error occurred.';
        errorMessage = Object.values(error.messages).flat().join(' & ');
        showToast(errorMessage, 'error', 'toastbankprofile');
    }
};
</script>
  