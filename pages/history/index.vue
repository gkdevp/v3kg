<template>
    <div class="bg-dark">
        <div class="mx-auto container p-4">
            <div class="bg-zinc-100 text-zinc-500 text-sm p-2 md:p-6 lg:p-6 2xl:p-6 overflow-hidden rounded-2xl">
                <!-- Tab Navigation -->
                <div class="flex border-b">
                    <div class="mx-1 px-2 py-2 cursor-pointer text-md uppercase rounded-tl-lg rounded-tr-lg font-medium"
                        :class="{ 'bg-lightco text-white border': activeTab === 'deposit', 'bg-lightwhite text-gray-800 hover:bg-gray-100': activeTab !== 'deposit' }"
                        @click="activeTab = 'deposit'">
                        Deposit
                    </div>
                    <div class="mx-1 px-2 py-2 cursor-pointer text-md uppercase rounded-tl-lg rounded-tr-lg font-medium"
                        :class="{ 'bg-lightco text-white': activeTab === 'withdraw', 'bg-lightwhite text-gray-800 hover:bg-gray-100': activeTab !== 'withdraw' }"
                        @click="activeTab = 'withdraw'">
                        Withdraw
                    </div>
                    <div class="mx-1 px-2 py-2 cursor-pointer text-md uppercase rounded-tl-lg rounded-tr-lg font-medium"
                        :class="{ 'bg-lightco text-white': activeTab === 'voucher', 'bg-lightwhite text-gray-800 hover:bg-gray-100': activeTab !== 'voucher' }"
                        @click="activeTab = 'voucher'">
                        Bonus
                    </div>
                </div>
                <!-- Content for Deposit -->
                <div v-if="activeTab === 'deposit'">
                    <div class="border-b-4 text-lightco text-xl mb-4 my-6 border-lightco border-solid uppercase">
                        History Deposit
                    </div>
                    <div class="flex flex-col gap-4 p-3">
                        <div class="hidden lg:block md:block 2xl:block">
                            <div v-if="paginatedDeposit && paginatedDeposit.length"
                                class="rounded-2xl overflow-hidden mb-5 p-2 shadow-lg">
                                <div
                                    class="grid grid-cols-1 md:grid-cols-6 gap-4 text-center font-bold p-2 bg-darken text-sm text-white rounded-t-lg">
                                    <div>Tanggal</div>
                                    <div>Bank</div>
                                    <div>Amount</div>
                                    <div>Type</div>
                                    <div>ID Transaksi</div>
                                    <div>Status</div>
                                </div>
                                <template v-for="item in paginatedDeposit" :key="item.trx_id">
                                    <div
                                        class="grid grid-cols-1 md:grid-cols-6 gap-4 text-center p-2 border-b last:border-b-0">
                                        <div>{{ item.date }}</div>
                                        <div><img :src="item.icon" alt="Provider Icon"
                                                class="inline-block h-8 md:h-10 mr-2 bg-slate-600"></div>
                                        <div> IDR {{ new Intl.NumberFormat('id-ID').format(item.amount) }}</div>
                                        <div class="uppercase">{{ item.type }}</div>
                                        <div class="items-center">
                                            <button @click="copyToClipboard(item.trx_id)"
                                                class="my-1 cursor-pointer text-xs text-coco bg-gray-700 hover:bg-gray-800 rounded px-2 py-1 transition duration-300 ease-in-out">
                                                {{ copiedTrxIds.includes(item.trx_id) ? 'Copied' : 'Copy TRX_ID' }}
                                            </button>
                                        </div>
                                        <div class="uppercase" :class="{
                                            'text-green-500': item.status === 'approved',
                                            'text-red-500': item.status === 'rejected',
                                            'text-yellow-500': item.status === 'pending'
                                        }">{{ item.status }}
                                        </div>
                                    </div>
                                </template>
                            </div>
                            <div v-else class="rounded-2xl overflow-hidden mb-5 p-2 shadow-lg">
                                <div
                                    class="grid grid-cols-1 md:grid-cols-6 gap-4 text-center font-bold p-2 bg-darken text-sm text-white rounded-t-lg">
                                    <div>Tanggal</div>
                                    <div>Bank</div>
                                    <div>Amount</div>
                                    <div>Type</div>
                                    <div>ID Transaksi</div>
                                    <div>Status</div>
                                </div>
                                <p class="text-md text-lightco text-center  p-3 uppercase">No History deposit</p>
                            </div>
                        </div>
                        <!--Mobile-->
                        <div class="lg:hidden md:hidden 2xl:hidden">
                            <div v-if="paginatedDeposit && paginatedDeposit.length" class="space-y-4">
                                <template v-for="item in paginatedDeposit" :key="item.trx_id">
                                    <div
                                        class="flex justify-between items-center bg-white px-4 py-3 border border-gray-300 rounded-lg shadow-sm transition hover:shadow">
                                        <div class="flex items-center space-x-3">
                                            <img :src="item.icon" class="h-12 bg-slate-600 object-cover rounded-md">
                                            <div>
                                                <div class="font-semibold text-gray-800 uppercase">{{ item.type }}</div>
                                                <div class="flex items-center mt-2">
                                                    <span class="text-sm text-gray-600 truncate overflow-hidden">{{
                                                        item.trx_id }}</span>
                                                </div>
                                                <button @click="copyToClipboard(item.trx_id)"
                                                    class="my-1 cursor-pointer text-xs text-coco bg-gray-700 hover:bg-gray-800 rounded px-2 py-1 transition duration-300 ease-in-out">
                                                    {{ copiedTrxIds.includes(item.trx_id) ? 'Copied' : 'Copy TRX_ID' }}
                                                </button>
                                            </div>
                                        </div>
                                        <div class="text-right">
                                            <div :class="{
                                                'text-green-500': item.status === 'approved',
                                                'text-red-500': item.status === 'rejected',
                                                'text-yellow-500': item.status === 'pending'
                                            }" class="text-sm font-medium py-1 rounded-full uppercase">
                                                {{ item.status }}
                                            </div>
                                            <div class="font-bold text-lg text-gray-800 mt-1">
                                                IDR {{ new Intl.NumberFormat('id-ID').format(item.amount) }}
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                            <div v-else class="text-center py-4">
                                <p class="text-gray-800 uppercase font-semibold">No Deposit History</p>
                            </div>
                        </div>
                        <div class="flex justify-center items-center space-x-2">
                            <button @click="previousPage" :disabled="currentPage <= 1"
                                class="px-4 py-2 text-xs md:text-sm md:px-4 md:py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50">Previous</button>
                            <span class="text-xs md:text-sm text-lightco font-medium uppercase">Page {{ totalPages ?
                                currentPage : 0 }} of {{ totalPages }}</span>
                            <button @click="nextPage" :disabled="currentPage >= totalPages"
                                class="px-4 py-2 text-xs md:text-sm md:px-4 md:py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50">Next</button>
                        </div>
                    </div>
                </div>

                <!-- Content for Withdraw -->
                <div v-if="activeTab === 'withdraw'">
                    <div class="border-b-4 text-lightco text-xl mb-4 my-6 border-lightco border-solid uppercase">
                        History Withdraw
                    </div>
                    <div class="flex flex-col gap-4 p-3">
                        <div class="hidden lg:block md:block 2xl:block">
                            <div v-if="paginatedWithdraw && paginatedWithdraw.length"
                                class="rounded-2xl overflow-hidden mb-5 p-2 shadow-lg">
                                <div
                                    class="grid grid-cols-1 md:grid-cols-6 gap-4 text-center font-bold p-2 bg-darken text-sm text-white rounded-t-lg">
                                    <div>Tanggal</div>
                                    <div>Bank</div>
                                    <div>Amount</div>
                                    <div>Type</div>
                                    <div>ID Transaksi</div>
                                    <div>Status</div>
                                </div>
                                <template v-for="item in paginatedWithdraw" :key="item.trx_id">
                                    <div
                                        class="grid grid-cols-1 md:grid-cols-6 gap-4 text-center p-2 border-b last:border-b-0">
                                        <div >{{ item.date }}</div>
                                        <div><img :src="item.icon" alt="Provider Icon"
                                                class="inline-block h-8 md:h-10 mr-2 bg-slate-600"></div>
                                        <div> IDR {{ new Intl.NumberFormat('id-ID').format(item.amount) }}</div>
                                        <div class=" uppercase">{{ item.type }}</div>
                                        <div class="items-center">
                                            <button @click="copyToClipboard(item.trx_id)"
                                                class="my-1 cursor-pointer text-xs text-coco bg-gray-700 hover:bg-gray-800 rounded px-2 py-1 transition duration-300 ease-in-out">
                                                {{ copiedTrxIds.includes(item.trx_id) ? 'Copied' : 'Copy TRX_ID' }}
                                            </button>
                                        </div>
                                        <div class=" uppercase" :class="{
                                            'text-green-500': item.status === 'approved',
                                            'text-red-500': item.status === 'rejected',
                                            'text-yellow-500': item.status === 'pending'
                                        }">{{ item.status }}
                                        </div>
                                    </div>
                                </template>
                            </div>
                            <div v-else class="rounded-xl overflow-hidden mb-5 p-2 shadow-lg">
                                <div
                                    class="grid grid-cols-1 md:grid-cols-6 gap-4 text-center font-bold p-2 bg-darken text-sm text-white rounded-t-lg">
                                    <div>Tanggal</div>
                                    <div>Bank</div>
                                    <div>Amount</div>
                                    <div>Type</div>
                                    <div>ID Transaksi</div>
                                    <div>Status</div>
                                </div>
                                <p class="text-md text-lightco text-center  p-3 uppercase">No History withdraw</p>
                            </div>
                        </div>
                        <!--Mobile-->
                        <div class="lg:hidden md:hidden 2xl:hidden">
                            <div v-if="paginatedWithdraw && paginatedWithdraw.length" class="space-y-4">
                                <template v-for="item in paginatedWithdraw" :key="item.trx_id">
                                    <div
                                        class="flex justify-between items-center bg-white px-4 py-3 border border-gray-300 rounded-lg shadow-sm transition hover:shadow">
                                        <div class="flex items-center space-x-3">
                                            <img :src="item.icon" class="h-12 bg-slate-600 object-cover rounded-md">
                                            <div>
                                                <div class="font-semibold text-gray-800 uppercase">{{ item.type }}</div>
                                                <div class="flex items-center mt-2">
                                                    <span class="text-sm text-gray-600 truncate overflow-hidden">{{
                                                        item.trx_id }}</span>
                                                </div>
                                                <button @click="copyToClipboard(item.trx_id)"
                                                    class="my-1 cursor-pointer text-xs text-coco bg-gray-700 hover:bg-gray-800 rounded px-2 py-1 transition duration-300 ease-in-out">
                                                    {{ copiedTrxIds.includes(item.trx_id) ? 'Copied' : 'Copy TRX_ID' }}
                                                </button>
                                            </div>
                                        </div>
                                        <div class="text-right">
                                            <div :class="{
                                                'text-green-500': item.status === 'approved',
                                                'text-red-500': item.status === 'rejected',
                                                'text-yellow-500': item.status === 'pending'
                                            }" class="text-sm font-medium py-1 rounded-full uppercase">
                                                {{ item.status }}
                                            </div>
                                            <div class="font-bold text-lg text-gray-800 mt-1">
                                                IDR {{ new Intl.NumberFormat('id-ID').format(item.amount) }}
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                            <div v-else class="text-center py-4">
                                <p class="text-gray-800 uppercase font-semibold">No Deposit History</p>
                            </div>
                        </div>
                        <div class="flex justify-center items-center space-x-2">
                            <button @click="previousPage" :disabled="currentPage <= 1"
                                class="px-4 py-2 text-xs md:text-sm md:px-4 md:py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50">Previous</button>
                            <span class="text-xs md:text-sm text-lightco font-medium uppercase">Page {{ totalPage ?
                                currentPage : 0 }} of {{ totalPage }}</span>
                            <button @click="nextPage" :disabled="currentPage >= totalPage"
                                class="px-4 py-2 text-xs md:text-sm md:px-4 md:py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50">Next</button>
                        </div>
                    </div>
                </div>

                <!-- Content for Voucher -->
                <div v-if="activeTab === 'voucher'">
                    <div class="border-b-4 text-lightco text-xl mb-4 my-6 border-lightco border-solid uppercase">
                        History bonus
                    </div>
                    <div class="flex flex-col gap-4 p-3">
                        <div class="hidden lg:block md:block 2xl:block">
                            <div v-if="paginatedVouchers && paginatedVouchers.length"
                                class="rounded-2xl overflow-hidden mb-5 p-2 shadow-lg">
                                <div
                                    class="grid grid-cols-1 md:grid-cols-6 gap-4 text-center font-bold p-2 bg-darken text-sm text-white rounded-t-lg">
                                    <div>Player</div>
                                    <div>Amount</div>
                                    <div>Bonus</div>
                                    <div>ID Transaksi</div>
                                    <div>Status</div>
                                    <div>Expired</div>
                                </div>
                                <template v-for="item in paginatedVouchers" :key="item.trx_id">
                                    <div
                                        class="grid grid-cols-1 md:grid-cols-6 gap-4 text-center p-2 border-b last:border-b-0">
                                        <div class="uppercase">{{ item.player_id }}</div>
                                        <div> IDR {{ new Intl.NumberFormat('id-ID').format(item.amount) }}</div>
                                        <div class="uppercase">{{ item.code }}</div>
                                        <div class="items-center">
                                            <button @click="copyToClipboard(item.id)"
                                                    class="my-1 cursor-pointer text-xs text-coco bg-gray-700 hover:bg-gray-800 rounded px-2 py-1 transition duration-300 ease-in-out">
                                                {{ copiedTrxIds.includes(item.id) ? 'Copied' : 'Copy VCHR_ID' }}
                                            </button>
                                        </div>
                                        <div class="uppercase" :class="{
                                            'text-green-500': item.status === 'approved',
                                            'text-red-500': item.status === 'rejected',
                                            'text-yellow-500': item.status === 'issued'
                                        }">{{ item.status }}
                                        </div>
                                        <div class="uppercase">{{ item.expired_date }}</div>
                                    </div>
                                </template>
                            </div>
                            <div v-else class="rounded-2xl overflow-hidden mb-5 p-2 shadow-lg">
                                <div
                                    class="grid grid-cols-1 md:grid-cols-6 gap-4 text-center font-bold p-2 bg-darken text-sm text-white rounded-t-lg">
                                    <div>Player</div>
                                    <div>Amount</div>
                                    <div>Bonus</div>
                                    <div>ID Transaksi</div>
                                    <div>Status</div>
                                    <div>Expired</div>
                                </div>
                                <p class="text-md text-lightco text-center  p-3 uppercase">No History Vouchers</p>
                            </div>
                        </div>
                        <!--Mobile-->
                        <div class="lg:hidden md:hidden 2xl:hidden">
                            <div v-if="paginatedVouchers && paginatedVouchers.length" class="space-y-4">
                                <template v-for="item in paginatedVouchers" :key="item.trx_id">
                                    <div
                                        class="flex justify-between items-center bg-white px-4 py-3 border border-gray-300 rounded-lg shadow-sm transition hover:shadow">
                                        <div class="flex items-center space-x-3">
                                            <nuxt-icon name="voucher" class="mr-1 text-lg" />
                                            <div>
                                                <div class="uppercase">{{ item.player_id }}</div>
                                                <div class="flex items-center mt-2">
                                                    <span class="text-sm text-gray-600 truncate overflow-hidden">{{
                                                        item.trx_id }}</span>
                                                </div>
                                                <button @click="copyToClipboard(item.id)"
                                                    class="my-1 cursor-pointer text-xs text-coco bg-gray-700 hover:bg-gray-800 rounded px-2 py-1 transition duration-300 ease-in-out">
                                                    {{ copiedTrxIds.includes(item.id) ? 'Copied' : 'Copy VCHR_ID' }}
                                                </button>
                                            </div>
                                        </div>
                                        <div class="text-right">
                                            <div :class="{
                                                'text-green-500': item.status === 'approved',
                                                'text-red-500': item.status === 'rejected',
                                                'text-yellow-500': item.status === 'issued'
                                            }" class="text-sm font-medium py-1 rounded-full uppercase">
                                                {{ item.status }}
                                            </div>
                                            <div class="font-bold text-lg text-gray-800 mt-1">
                                                IDR {{ new Intl.NumberFormat('id-ID').format(item.amount) }}
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                            <div v-else class="text-center py-4">
                                <p class="text-gray-800 uppercase font-semibold">No Deposit History</p>
                            </div>
                        </div>
                        <div class="flex justify-center items-center space-x-2">
                            <button @click="previousPage" :disabled="currentPage <= 1"
                                class="px-4 py-2 text-xs md:text-sm md:px-4 md:py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50">Previous</button>
                            <span class="text-xs md:text-sm text-lightco font-medium uppercase">Page {{ totalvoucher ?
                                currentPage : 0 }} of {{ totalvoucher }}</span>
                            <button @click="nextPage" :disabled="currentPage >= totalvoucher"
                                class="px-4 py-2 text-xs md:text-sm md:px-4 md:py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { usePayStore } from '@/store/PaymentStore';
import { useMemberStore } from '@/store/MemberStore';

// Reactive variable for the active tab
const activeTab = ref('deposit');

// Your existing logic
const payStore = usePayStore();
const memberStore = useMemberStore();
const currentPage = ref(1);
const itemsPerPage = 10;
const copiedTrxIds = ref([]);

// Deposit 
const paginatedDeposit = computed(() => {
    if (payStore.historyDetails.deposit && payStore.historyDetails.deposit.length > 0) {
        const start = (currentPage.value - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return payStore.historyDetails.deposit.slice(start, end);
    }
    return [];
});

const totalPages = computed(() => {
    return payStore.historyDetails.deposit ? Math.ceil(payStore.historyDetails.deposit.length / itemsPerPage) : 0;
});


// withdraw 
const paginatedWithdraw = computed(() => {
    if (payStore.historyDetails.withdraw && payStore.historyDetails.withdraw.length > 0) {
        const start = (currentPage.value - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return payStore.historyDetails.withdraw.slice(start, end);
    }
    return [];
});

const totalPage = computed(() => {
    return payStore.historyDetails.withdraw ? Math.ceil(payStore.historyDetails.withdraw.length / itemsPerPage) : 0;
});

// Vouchers 
const paginatedVouchers = computed(() => {
    if (memberStore.profile.unclaimed_vouchers && memberStore.profile.unclaimed_vouchers.length > 0) {
        const start = (currentPage.value - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return memberStore.profile.unclaimed_vouchers.slice(start, end);
    }
    return [];
});

const totalvoucher = computed(() => {
    return memberStore.profile.unclaimed_vouchers ? Math.ceil(memberStore.profile.unclaimed_vouchers.length / itemsPerPage) : 0;
});

// Navigation Next and Prev
const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

const previousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

// Copy Trx 
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

onMounted(() => {
    payStore.detailPayment();
});
</script>
