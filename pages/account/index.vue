<template>
    <div class="bg-dark py-2">
        <div class="container mx-auto px-2 md:px-0">
            <OthersTopBar />
            <div class="flex flex-col md:flex-row">
                <OthersLeftSidebar />
                <!--Main-->
                <div class="flex flex-col flex-grow">
                    <div class="text-zinc-800 text-sm md:rounded-2xl lg:rounded-2xl overflow-hidden">
                        <div class="bg-zinc-200 text-zinc-500 px-2 text-sm md:p-10 lg:p-10 2xl:p-10 overflow-hidden h-104">
                            <div
                                class=" text-lightco text-[1.63rem] leading-8 mb-8 p-3 indent-[0.94rem] border-lightco border-solid border-b-4">
                                INFORMASI
                                AKUN</div>
                                <div class="text-gray-600 font-bold mb-4 uppercase">Data Pribadi</div>
                                <div class="flex text-sm justify-between my-4">
                                    <div class="text-gray-800 my-auto">Username</div>
                                    <div>
                                        <div class="relative">
                                            <input v-if="memberStore.profile.username" :value="memberStore.profile.username"
                                                placeholder="Nama panggilan"
                                                class="h-12 w-52 md:w-[40.13rem] lg:w-[40.13rem] 2xl:w-[40.13rem] bg-gray-200 text-zinc-500 inline-flex font-bold py-3 px-3.5 text-ellipsis border border-zinc-300 border-solid rounded-3xl"
                                                readonly />
                                        </div>
                                    </div>
                                </div>
                                <div class="flex text-sm justify-between my-4">
                                    <div class="text-gray-800 my-auto">Refferal Code</div>
                                    <div>
                                        <button v-if="memberStore.profile.referral_code === null" type="button"
                                            @click="generateReferralCode"
                                            class="items-center bg-orange-300 text-gray-800 cursor-pointer flex text-sm font-black justify-center py-2 px-4 uppercase border border-solid rounded-lg">
                                            Generate
                                        </button>
                                        <div class="relative">
                                            <input :value="referralCode()"
                                                class="h-12 w-52 md:w-[40.13rem] lg:w-[40.13rem] 2xl:w-[40.13rem] bg-gray-200 text-zinc-500 inline-flex font-bold py-3 px-3.5 text-ellipsis border border-zinc-300 border-solid rounded-3xl"
                                                readonly />
                                        </div>
                                    </div>
                                </div>
                            <form v-on:submit.prevent="updatePreferences">
                                <div class="flex text-sm justify-between my-4">
                                    <div class="text-gray-800 my-auto">Name</div>
                                    <div>
                                        <div class="relative">
                                            <input placeholder="name" v-model="formData.updatePreferences.name"
                                                class="h-12 w-52 md:w-[40.13rem] lg:w-[40.13rem] 2xl:w-[40.13rem] text-gray-800 inline-flex font-bold py-3 pl-3.5 pr-16 border border-zinc-300 border-solid rounded-3xl" />
                                        </div>
                                    </div>
                                </div>
                                <div class="flex text-sm justify-between my-4">
                                    <div class="text-gray-800 my-auto">Email</div>
                                    <div>
                                        <div class="relative">
                                            <input placeholder="email" v-model="formData.updatePreferences.email"
                                                class="h-12 w-52 md:w-[40.13rem] lg:w-[40.13rem] 2xl:w-[40.13rem] text-zinc-500 inline-flex font-bold py-3 px-3.5 text-ellipsis border border-zinc-300 border-solid rounded-3xl" />
                                        </div>
                                    </div>
                                </div>
                                <div class="flex text-sm justify-between my-4">
                                    <div class="text-gray-800 my-auto">Nomor Telepon</div>
                                    <div>
                                        <div class="relative">
                                            <input placeholder="phone" v-model="formData.updatePreferences.phone_number"
                                                class="h-12 w-52 md:w-[40.13rem] lg:w-[40.13rem] 2xl:w-[40.13rem] text-zinc-500 inline-flex font-bold py-3 px-3.5 text-ellipsis border border-zinc-300 border-solid rounded-3xl" />
                                        </div>
                                    </div>
                                </div>
                                <div class="flex flex-row-reverse mt-8">
                                    <button type="submit"
                                        class="items-center bg-orange-300 text-gray-800 cursor-pointer flex text-sm font-black justify-center py-4 px-8 uppercase border border-solid rounded-3xl">
                                        Simpan Perubahan
                                    </button>
                                </div>
                            </form>
                            <!-- Toast Container -->
                            <div id="toastaccount"
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
import { ref } from 'vue';
import { useMemberStore } from '@/store/MemberStore';

definePageMeta({ middleware: 'isauth-mid' });

const memberStore = useMemberStore();

const formData = ref({
    updatePreferences: {
        name: "",
        email: "",
        phone_number: "",
    },
});

const referralCode = () => memberStore.profile.referral_code;

const updatePreferences = async () => {
    try {
        await memberStore.UpdatePreferences(formData.value.updatePreferences);

        //Refetch ProfileMember
        memberStore.GetProfile();

        showToast("Update Profile Succesfully", 'success', 'toastaccount');

    } catch (error) {
        let errorMessage = error.messages || 'An unexpected error occurred.';
        errorMessage = Object.values(error.messages).flat().join(' & ');
        showToast(errorMessage, 'error', 'toastaccount');
    }
};

const generateReferralCode = async () => {
    try {
        await memberStore.GenerateReferral();

        //Refetch ProfileMember
        memberStore.GetProfile();

    } catch (error) {
        let errorMessage = error.message || 'An unexpected error occurred.';
        showToast(errorMessage, 'error', 'toastaccount');
    }
};
</script>
