<template>
    <div class="py-5">
        <div class="hidden md:grid lg:grid 2xl:grid grid-cols-1 md:grid-cols-3 gap-5 px-10 py-5 rounded-2xl bg-darken">
            <!-- Step 1: Update Your Profile -->
            <div class="flex flex-col items-center space-y-2 transition-all transform hover:scale-105">
                <h1 class="text-lg font-bold">Step 1</h1>
                <h2>Update Your Profile</h2>
                <NuxtLink v-if="memberStore.profile.preferences?.name" to="/account"
                    class="flex items-center justify-center bg-green-500 text-white rounded-full px-3 py-1">
                    <nuxt-icon name="complete" />
                    Completed
                </NuxtLink>
                <NuxtLink v-else to="/account"
                    class="flex items-center justify-center bg-red-500 text-white rounded-full px-3 py-1">
                    <nuxt-icon name="incomplete" />
                    Incomplete
                </NuxtLink>
            </div>

            <!-- Step 2: Add Your Payment -->
            <div class="flex flex-col items-center space-y-2 transition-all transform hover:scale-105">
                <h1 class="text-lg font-bold">Step 2</h1>
                <h2>Add Your Payment</h2>
                <NuxtLink v-if="paymentAdded" to="/account/bank"
                    class="flex items-center justify-center bg-green-500 text-white rounded-full px-3 py-1">
                    <nuxt-icon name="complete" />
                    Completed
                </NuxtLink>
                <NuxtLink v-else to="/account/bank"
                    class="flex items-center justify-center bg-red-500 text-white rounded-full px-3 py-1">
                    <nuxt-icon name="incomplete" />
                    Incomplete
                </NuxtLink>
            </div>

            <!-- Step 3: Get Your Payment Approved -->
            <div class="flex flex-col items-center space-y-2 transition-all transform hover:scale-105">
                <h1 class="text-lg font-bold">Step 3</h1>
                <h2>Get Your Payment Approved</h2>
                <NuxtLink v-if="paymentApproved" to="/account/detail"
                    class="flex items-center justify-center bg-green-500 text-white rounded-full px-3 py-1">
                    <nuxt-icon name="complete" />
                    Completed
                </NuxtLink>
                <NuxtLink v-else to="/account/detail"
                    class="flex items-center justify-center bg-red-500 text-white rounded-full px-3 py-1">
                    <nuxt-icon name="incomplete" />
                    Incomplete
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import { computed } from 'vue';
import { useMemberStore } from '@/store/MemberStore';

const memberStore = useMemberStore();

// Check if any payment account exists inside any of the payment methods
const paymentAdded = computed(() => {
    if (memberStore.profile && memberStore.profile.payment_accounts) {
        return Object.values(memberStore.profile.payment_accounts).some(paymentMethod => Array.isArray(paymentMethod) && paymentMethod.length > 0);
    }
    return false;
});

// Check if there's any payment account inside any of the payment methods with the status `approved`
const paymentApproved = computed(() => {
    if (memberStore.profile && memberStore.profile.payment_accounts) {
        return Object.values(memberStore.profile.payment_accounts).some(paymentMethod =>
            Array.isArray(paymentMethod) && paymentMethod.some(account => account.status === 'approved')
        );
    }
    return false;
});
</script>


    