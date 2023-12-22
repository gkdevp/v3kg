<template>
    <footer class="bg-custom-gray">
        <div class="w-full mb-6 flex justify-center py-8 px-5">
            <div class="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-4">
                <!-- Menu Column -->
                <div class="relative">
                    <span class="font-bold text-lg leading-5 text-slatelight opacity-50">Quick Links</span>
                    <div class="mt-2 grid grid-cols-2">
                        <NuxtLink v-for="(link, index) in filteredMenu" :key="index" :to="link.to"
                            class="block font-medium mb-2 text-base no-underline text-slatelight hover:text-yl hover:underline">
                            {{ link.label }}
                        </NuxtLink>
                    </div>
                </div>
                <!-- Info Column -->
                <div class="relative">
                    <span class="font-bold text-lg leading-5 text-slatelight opacity-50">Payment Method</span>
                    <div class="mt-1 grid grid-cols-5">
                        <div v-for="category in paymentCategories">
                            <div v-for="provider in publicStore.public.payment_providers?.[category] || []"
                                :key="`${category}`" class="my-1 mx-1">
                                <img :src="provider.prefs['logo.url']" :alt="provider.name"
                                    class="w-20 border-2 border-darken border-opacity-40 rounded-md" />
                            </div>
                        </div>
                    </div>
                </div>
                <!-- App Column -->
                <div class="relative">
                    <span class="font-bold text-lg leading-5 text-slatelight opacity-50">Apps</span>
                    <div class="mt-1 grid grid-cols-2">
                        <div class="relative flex items-center bg-black rounded-lg cursor-pointer w-36 h-14 px-7">
                            <img src="https://www.bettilt.com/static/media/ios.a0190df1157982f99a46a52828447533.svg"
                                class="mr-3 h-7" />
                            <div class="flex flex-col justify-center items-start">
                                <span class="mt-1 mb-0 text-xs font-medium leading-4 text-white">Get it on</span>
                                <span class="text-base font-black leading-6 text-white">iOS</span>
                            </div>
                            <div class="absolute -top-2 -right-2 flex items-center bg-red-600 text-white text-xs font-bold py-1 px-2 rounded-tl-lg">
                                <span>Coming soon</span>
                            </div>
                        </div>
                        <div class="relative flex items-center bg-black rounded-lg cursor-pointer w-36 h-14 px-1">
                            <img src="https://www.bettilt.com/static/media/android.7c2286c72330b9cf7ac19cf40b876552.svg"
                                class="mr-1 h-7" />
                            <div class="flex flex-col justify-center items-start">
                                <span class="mt-1 mb-0 text-xs font-medium leading-4 text-white">Download and use</span>
                                <span class="text-base font-black leading-6 text-white">Application</span>
                            </div>
                            <div class="absolute -top-2 -right-2 flex items-center bg-red-600 text-white text-xs font-bold py-1 px-2 rounded-tl-lg">
                                <span>Coming soon</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <OthersSeoProdcut />
        <OthersOurPartner />
        <div class="px-4 pt-6 bg-bg-dark pb-20 lg:py-6 md:py-6 md:flex md:items-center md:justify-between">
            <span class="text-sm text-gray-300 sm:text-center">{{ contentStore.footerText }}</span>
            <div class="flex mt-4 space-x-5 sm:justify-center md:mt-0">
                <NuxtLink class="text-gray-400 hover:text-gray-200 cursor-pointer">
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                        viewBox="0 0 8 19">
                        <path fill-rule="evenodd"
                            d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                            clip-rule="evenodd" />
                    </svg>
                </NuxtLink>
                <NuxtLink class="text-gray-400 hover:text-gray-200 cursor-pointer">
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                        viewBox="0 0 20 17">
                        <path fill-rule="evenodd"
                            d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                            clip-rule="evenodd" />
                    </svg>
                </NuxtLink>
            </div>
        </div>
    </footer>

    <!-- <HeaderLogin /> -->
    <!-- <HeaderRegister /> -->
</template>
<script setup>
import { ref } from 'vue';
import { usePublicStore } from '@/store/PublicStore';
import { useContentStore } from '@/store/ContentStore';

const publicStore = usePublicStore();
const contentStore = useContentStore();

const paymentCategories = ref(['bank', 'crypto', 'ewallet', 'pulsa']);

// Filter Menu
const filteredMenu = computed(() => {
    const startIndex = contentStore.menuGeneral.findIndex(item => item.label === 'SLOT');
    const endIndex = contentStore.menuGeneral.findIndex(item => item.label === 'PROMO');
    return contentStore.menuGeneral.slice(startIndex, endIndex + 1);
});
</script>
<style scoped>
:deep(.nuxt-icon svg) {
    width: 2em;
    height: 2em;
}
</style>