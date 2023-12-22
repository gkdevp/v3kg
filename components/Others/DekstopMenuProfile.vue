<template>
    <div class="text-white grid gap-5 w-full">
        <div class="items-center flex">
            <div class="relative items-center justify-center flex">
                <img v-if="memberStore.profile.preferences?.avatar_url" :src="memberStore.profile.preferences?.avatar_url"
                    class="w-16 max-w-full h-auto" />
                <img v-else="!memberStore.profile.preferences?.avatar_url"
                    src="https://kgaming.b-cdn.net/kr/icons/profile.svg" class="w-16 max-w-full h-auto" />
                <div @click="openModal" class="absolute bottom-0 right-0 bg-gray-700 p-1 cursor-pointer rounded-full border border-white">
                    <nuxt-icon name="edit" class="text-white" />
                </div>
            </div>
            <div class="flex-col flex ml-5">
                <div class="text-lg font-semibold text-ellipsis w-48 overflow-hidden uppercase">{{
                    memberStore.profile.username }}</div>
                <div class="text-base text-ellipsis w-48 overflow-hidden">
                    <div><span class="text-slate-300">Current Status</span><span
                            class="font-semibold ml-1 text-yl uppercase">{{ memberStore.profile.status }}</span>
                    </div>
                    <div><span class="text-slate-300">Current VIP level</span><span
                            class="font-semibold ml-1 text-yl uppercase">{{ memberStore.profile.level }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid-rows-[21px_21px_21px_21px] grid gap-[0.63rem]">
            <div class="text-base justify-between flex"><span class="text-slate-300">Loyalty points</span><span
                    class="text-yl font-bold">0</span>
            </div>
            <div class="text-base justify-between flex"><span class="text-slate-300">Bonus balance</span><span
                    class="text-yl font-bold">Rp 0.00</span>
            </div>
            <div class="text-base justify-between flex"><span class="text-slate-300">Real balance</span><span
                    class="text-yl font-bold">Rp. {{ balanceStore.balance }}</span>
            </div>
        </div>
        <NuxtLink to="/deposit"
            class="text-gray-800 conicylw items-center bg-[linear-gradient(90deg, rgb(255, 199, 0) 0%, 234, 33) 100%), none] cursor-pointer justify-center py-3 px-5 text-center flex w-auto h-11 rounded-3xl overflow-hidden">
            <span class="text-base font-bold">Deposit</span>
        </NuxtLink>
    </div>
    <div class="w-px mx-6 bg-graydark"></div>

    <div class="text-white grid w-full gap-2">
        <NuxtLink to="/account"
            class="bg-slate-300/[0.14] items-center px-4 flex h-12 rounded-xl">
            <div class="cursor-pointer relative flex w-6 h-6 mr-4">
                <img src="https://www.bettilt.com/static/media/profile-normal.e3976cae700d51dfacb1718b090c12fd.svg"
                    class="w-full h-6" />
                <svg height="18" viewbox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="bottom-[-0.38rem] left-[0.75rem] absolute right-[-0.38rem] top-[0.75rem] w-5 h-5">
                    <circle r="8.57143" transform="matrix(-1 0 0 1 9.00084 8.9999)" fill="rgb(244, 83, 83)"></circle>
                    <g clip-path="url(#clip0)" fill="none">
                        <path
                            d="M9.00101 3.95581C9.55817 3.95581 10.0098 4.40748 10.0098 4.96463V8.99993C10.0098 9.55709 9.55817 10.0088 9.00101 10.0088C8.44385 10.0088 7.99219 9.55709 7.99219 8.99993V4.96463C7.99219 4.40748 8.44385 3.95581 9.00101 3.95581Z"
                            fill="rgb(255, 255, 255)"></path>
                        <path
                            d="M9.00101 12.0263C8.44385 12.0263 7.99219 12.4779 7.99219 13.0351C7.99219 13.5922 8.44385 14.0439 9.00101 14.0439H9.01069C9.56785 14.0439 10.0195 13.5922 10.0195 13.0351C10.0195 12.4779 9.56785 12.0263 9.01069 12.0263H9.00101Z"
                            fill="rgb(255, 255, 255)"></path>
                    </g>
                    <defs fill="none">
                        <rect height="10.2857" fill="rgb(255, 255, 255)" transform="translate(3.85742 3.85693)"
                            class="w-3 h-3"></rect>
                    </defs>
                </svg>
            </div>
            <span class="text-white cursor-pointer text-base font-medium">Profile
                <span class="text-red-500 ml-2">2FA not enabled</span>
            </span>
        </NuxtLink>
        <NuxtLink to="/deposit"
            class="text-blue-700 bg-slate-300/[0.14] items-center px-4 flex h-12 rounded-xl">
            <div class="cursor-pointer flex w-6 mr-4">
                <nuxt-icon name="icon-deposit" class="text-slatelight text-2xl" />
            </div>
            <span class="text-white cursor-pointer text-base font-medium">Deposit</span>
        </NuxtLink>
        <NuxtLink to="/withdrawal"
            class="bg-slate-300/[0.14] items-center px-4 flex h-12 rounded-xl">
            <div class="cursor-pointer flex w-6 mr-4">
                <nuxt-icon name="icon-withdraw" class="text-slatelight text-2xl" />
            </div>
            <span class="text-white cursor-pointer text-base font-medium">Withdraw</span>
        </NuxtLink>
        <NuxtLink to="/history"
            class="bg-slate-300/[0.14] items-center px-4 flex h-12 rounded-xl">
            <div class="cursor-pointer flex w-6 mr-4">
                <nuxt-icon name="history-time" class="text-slatelight text-3xl" />
            </div>
            <span class="text-white cursor-pointer text-base font-medium">History</span>
        </NuxtLink>
        <button @click="Logout"
            class="items-center cursor-pointer justify-center py-3 px-5 text-center flex w-auto h-11 mt-0 rounded-3xl overflow-hidden">
            <span class="text-base font-bold">Log Out</span>
        </button>
    </div>
    <div v-show="isModalOpen" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog"
        aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div
                class="inline-block align-bottom bg-darken rounded-lg text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div class="absolute top-0 right-0 pt-4 pr-4">
                    <button @click="closeModal" class="text-gray-400 hover:text-gray-500">
                        <span class="sr-only">Close</span>
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                            </path>
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
</template>
<script setup>
import { ref, computed } from 'vue';

import { useMemberStore } from '@/store/MemberStore';
import { useBalanceStore } from '@/store/BalanceStore';
import { usePublicStore } from '@/store/PublicStore';

// Assign Variabel to Store
const balanceStore = useBalanceStore();
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
    await memberStore.updateAvatar(updatedProfile);
    isModalOpen.value = false;
};
</script>