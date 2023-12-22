<template>
    <div class="mx-auto max-w-4xl px-4 lg:px-0">
        <div id="voucherMenu"
            class="hidden max-w-lg rounded-lg bg-dark bg-opacity-70 backdrop-blur-2xl border z-30 overflow-x-auto scrollbar-hide">
            <div class="rounded-lg overflow-hidde">
                <div class="overflow-y-auto max-h-96 scrollbar-hide px-3">
                    <div v-for="voucher in voucherStore.vouchers" :key="voucher.id" class="border-b border-white border-opacity-10 last:border-b-0 p-2">
                        <!-- Voucher Content -->
                        <div class="flex items-center space-x-4">
                            <!-- Time and Amount -->
                            <div class="flex-1">
                                <div class="flex justify-between items-center my-2">
                                    <div class="flex items-center text-sm text-white">
                                        <nuxt-icon name="calendar" class="mr-1" />
                                        {{ voucher.create_date }}
                                    </div>
                                    <p class="text-sm text-coco">
                                        IDR {{ new Intl.NumberFormat('id-ID').format(voucher.amount) }}
                                    </p>
                                </div>

                                <!-- Voucher Code and Status -->
                                <div class="flex items-center justify-between my-2">
                                    <div class="flex items-center text-sm text-white">
                                        <nuxt-icon name="voucher" class="mr-1" />
                                        Voucher {{ voucher.code }}
                                    </div>
                                    <div class="flex text-sm items-center px-2 rounded ml-3"
                                        :class="statusClasses(voucher.status)">
                                        <nuxt-icon v-if="voucher.status === 'claimed'" name="approved"
                                            class="text-green-500 mr-1" />
                                        <nuxt-icon v-if="voucher.status === 'expired'" name="rejected"
                                            class="text-red-500 mr-1" />
                                        <span v-if="voucher.status === 'claimed' || voucher.status === 'expired'" :class="statusTextColor(voucher.status)">{{ voucher.status }}</span>
                                        <button v-if="voucher.status === 'issued'" type="button" @click="claimVoucher(voucher.id)" :class="statusTextColor(voucher.status)">
                                            Claim Now
                                        </button>
                                        <span></span>
                                    </div>
                                </div>
                                <!-- Copy trx_id Button -->
                                <button @click="copyToClipboard(voucher.id)"
                                    class="px-3 py-1 text-xs font-medium transition duration-200 rounded bg-gray-700 hover:bg-gray-800">
                                    {{ copiedTrxIds.includes(voucher.id) ? 'Copied' : 'Copy vchr_id' }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- No Vouchers Message -->
                <div v-if="!voucherStore.vouchers.length" class="p-3 text-sm text-center">
                    No Latest Vouchers
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useVoucherStore } from '@/store/VoucherStore';
import { useBalanceStore } from '@/store/BalanceStore';

const voucherStore = useVoucherStore();
const balanceStore = useBalanceStore();
const copiedTrxIds = ref([]);

const copyToClipboard = (trxId) => {
    navigator.clipboard.writeText(trxId).then(() => {
        copiedTrxIds.value.push(trxId);
        setTimeout(() => {
            const index = copiedTrxIds.value.indexOf(trxId);
            if (index > -1) {
                copiedTrxIds.value.splice(index, 1);
            }
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
};

const statusClasses = (status) => {
    return {
        'bg-yellow-100': status === 'issued',
        'bg-green-100': status === 'claimed',
        'bg-red-100': status === 'expired',
    };
};

const statusTextColor = (status) => {
    return {
        'text-yellow-500': status === 'issued',
        'text-green-500': status === 'claimed',
        'text-red-500': status === 'expired',
    };
};

const claimVoucher = async (id) => {
    try {
        await voucherStore.claimVoucher(id);

        // Refetch Voucher Store
        await voucherStore.fetchVoucher();

        // get balance
        await balanceStore.fetchBalance();

    } catch (error) {
        console.error(error)
    }
};
</script>

<style scoped>
.voucher-card {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.voucher-card:last-child {
    border-bottom: none;
}

:deep(.nuxt-icon svg) {
    width: 1.2em;
    height: 1.2em;
}</style>
