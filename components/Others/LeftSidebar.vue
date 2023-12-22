<template>
    <div
        class="box-border leading-5 py-5 lg:mx-2 md:mx-2 text-center md:rounded-2xl lg:rounded-2xl overflow-hidden bg-darken md:w-56 lg:w-56 2xl:w-56">
        <section class="flex flex-col lg:flex-col mb-4 lg:mb-0 mx-auto items-center lg:items-center">
            <div class="mb-4 lg:mb-0">
                <img v-if="memberStore.profile.preferences?.avatar_url" :src="memberStore.profile.preferences?.avatar_url"
                    class="w-24 max-w-full h-auto" />
                <img v-else="!memberStore.profile.preferences?.avatar_url"
                    src="https://kgaming.b-cdn.net/kr/icons/profile.svg" class="w-24 max-w-full h-auto" />
                <span class="text-[#df944f] font-semibold uppercase my-2 text-center block">
                    {{ memberStore.profile.status }}
                </span>
            </div>
            <span class="text-lightwhite font-semibold uppercase">
                Selamat Datang!
            </span>
            <div class="flex flex-col items-center lg:items-center">
                <div class="text-base lg:text-xl mb-3 text-lightwhite">
                    <span class="text-[#df944f] font-semibold uppercase">
                        {{ memberStore.profile.username }}
                    </span>
                </div>
                <button @click="openModal" type="submit" class="signup text-lightwhite text-sm lg:text-base">Change
                    Profile</button>
            </div>

            <div class="group flex flex-col items-center my-4 mx-2 p-2 bg-drakligt rounded-lg shadow relative">
                <div class="flex items-center">
                    <!-- VIP Badge Image -->
                    <img v-if="vipBadgeUrl" :src="vipBadgeUrl" class="h-16" />
                    <!-- Milestone text -->
                    <div class="ml-2">
                        <span class="text-lightwhite text-sm font-medium">Milestone Selanjutnya</span>
                    </div>
                </div>

                <!-- VIP Progress Bar -->
                <div class="w-full bg-gray-300 rounded-full mt-3 overflow-hidden">
                    <div class="bg-coco text-xs font-medium text-green-700 text-center p-1 leading-none rounded-l-full"
                        :style="{ width: vipProgress + '%' }">
                        {{ vipProgress.toFixed(0) }}%
                    </div>
                </div>
            </div>
            <div v-show="isModalOpen" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog"
                aria-modal="true">
                <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div> <!-- Modal overlay -->
                    <div
                        class="inline-block align-bottom bg-darken rounded-lg text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div class="absolute top-0 right-0 pt-4 pr-4">
                            <button @click="closeModal" class="text-gray-400 hover:text-gray-500">
                                <span class="sr-only">Close</span> <!-- Accessibility: Screen reader only text -->
                                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div class="sm:flex sm:items-start">
                                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 class="text-lg leading-6 font-medium text-white" id="modal-title">Choose Your Avatar
                                    </h3>
                                    <div class="mt-2">
                                        <div class="grid grid-cols-3 gap-4">
                                            <div v-for="avatarUrl in avatars" :key="avatarUrl" class="cursor-pointer">
                                                <img :src="avatarUrl" :alt="'Avatar ' + avatarUrl"
                                                    :class="{ 'ring-4 ring-yellow-400': avatarUrl === selectedAvatar }"
                                                    class="rounded-md hover:opacity-90 transition-all duration-300 ease-in-out transform hover:scale-105"
                                                    @click="selectedAvatar = avatarUrl" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-dark px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button @click="saveAvatar" type="button"
                                class="w-full inline-flex justify-center text-base font-medium text-white rounded-lg border border-transparent shadow-lg px-4 py-2 bg-gradient-to-r from-coco to-darkco sm:ml-3 sm:w-auto sm:text-sm transition duration-300 ease-in-out">
                                Save Avatar
                            </button>
                            <button @click="closeModal" type="button"
                                class="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-gray-700 text-base font-medium text-white hover:bg-gray-600 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition duration-300 ease-in-out">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="grid grid-cols-2 lg:grid-cols-1 mb-4 mx-auto items-center gap-3 md:gap-4 lg:gap-4 p-2">
            <h4 class="hidden md:block lg:block text-2xl font-medium h-full col-span-2 lg:col-span-1">Akun Saya</h4>
            <NuxtLink to="/account"
                class="flex items-center justify-center py-3 px-6 bg-dark text-lightwhite border border-solid rounded-lg uppercase font-bold hover:bg-gray-800 transition ease-in-out duration-150">
                Account
            </NuxtLink>
            <NuxtLink to="/account/bank"
                class="flex items-center justify-center py-3 px-6 bg-dark text-lightwhite border border-solid rounded-lg uppercase font-bold hover:bg-gray-800 transition ease-in-out duration-150">
                Add Bank
            </NuxtLink>
            <NuxtLink to="/account/detail"
                class="flex items-center justify-center py-3 px-6 bg-dark text-lightwhite border border-solid rounded-lg uppercase font-bold hover:bg-gray-800 transition ease-in-out duration-150">
                Bank Details
            </NuxtLink>
            <NuxtLink to="/profile/inbox"
                class="flex items-center justify-center py-3 px-6 bg-dark text-lightwhite border border-solid rounded-lg uppercase font-bold hover:bg-gray-800 transition ease-in-out duration-150">
                Inbox
            </NuxtLink>
        </section>
        <!--Mobile check payment -->
        <div class="grid grid-cols-3 items-center text-sm px-1 rounded-2xl bg-darken py-2 md:hidden lg:hidden 2xl:hidden">
            <!-- Step 1: Check if profile has been added -->
            <div class="flex flex-col items-center space-y-2 transition"
                :class="memberStore.profile.preferences?.name ? 'text-green-500' : 'text-red-500 hover:text-red-600'">
                <h1 class="font-bold">Step 1</h1>
                <h2>Update Your Profile</h2>
                <div v-if="memberStore.profile.preferences?.name" class="bg-green-500 text-white rounded-full px-3 py-1">
                    Completed
                </div>
                <div v-if="!memberStore.profile.preferences?.name" class="bg-red-500 text-white rounded-full px-3 py-1">
                    <NuxtLink to="/account">
                        <i class="fa fa-times"></i> Incomplete
                    </NuxtLink>
                </div>
            </div>
            <!-- Step 2: Check if payment has been added -->
            <div class="flex flex-col items-center space-y-2 transition"
                :class="paymentAdded ? 'text-green-500' : 'text-red-500 hover:text-red-600'">
                <h1 class="font-bold">Step 2</h1>
                <h2>Add Your Payment</h2>
                <div v-if="paymentAdded" class="bg-green-500 text-white rounded-full px-3 py-1">
                    Completed
                </div>
                <div v-else class="bg-red-500 text-white rounded-full px-3 py-1">
                    <NuxtLink to="/account/bank">
                        <i class="fa fa-times"></i> Incomplete
                    </NuxtLink>
                </div>
            </div>
            <!-- Step 3: Check if payment has been approved -->
            <div class="flex flex-col items-center space-y-2 transition"
                :class="paymentApproved ? 'text-green-500' : 'text-red-500 hover:text-red-600'">
                <h1 class="font-bold">Step 3</h1>
                <h2>Get Your Payment Approved</h2>
                <div v-if="paymentApproved" class="bg-green-500 text-white rounded-full px-3 py-1">
                    Completed
                </div>
                <div v-else class="bg-red-500 text-white rounded-full px-3 py-1">
                    <NuxtLink to="/account">
                        <i class="fa fa-times"></i> Incomplete
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { usePublicStore } from '@/store/PublicStore';
import { useMemberStore } from '@/store/MemberStore';

const memberStore = useMemberStore();
const publicStore = usePublicStore();

// Reactive Variable
const selectedAvatar = ref('');
const isModalOpen = ref(false);
const avatars = computed(() => publicStore.public.avatars);

//Methods :
const openModal = () => {
    isModalOpen.value = !isModalOpen.value;
};

const closeModal = () => {
    isModalOpen.value = false;
};

const saveAvatar = async () => {
    memberStore.profile.preferences.avatar_url = selectedAvatar.value;
    const updatedProfile = {
        ...memberStore.profile,
        avatar: selectedAvatar.value
    };
    await memberStore.UpdatePreferences(updatedProfile);
    isModalOpen.value = false;
};

const vipBadgeUrl = computed(() => {
    const level = memberStore.profile.level;
    switch (level) {
        case 'newbie':
            return '/images/member/1.webp';
        case 'bronze':
            return '/images/member/1.webp';
        case 'silver':
            return '/images/member/2.webp';
        case 'gold':
            return '/images/member/3.webp';
        case 'platinum':
            return '/images/member/4.webp';
        case 'diamond':
            return '/images/member/5.webp';
        default:
            return '';
    }
});

const vipLevels = {
    'newbie': 0,
    'bronze': 1,
    'silver': 2,
    'gold': 3,
    'platinum': 4,
    'diamond': 5,
};

const vipProgress = computed(() => {
    const level = memberStore.profile.level;
    const levelIndex = vipLevels[level] || 0;
    return (levelIndex / Object.keys(vipLevels).length) * 100;
});

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
  