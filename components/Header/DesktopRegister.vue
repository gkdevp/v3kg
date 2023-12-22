<template>
    <div class="text-lg font-semibold text-center mb-4">Ready to start winning?</div>
    <form
        class="grid-cols-[1fr] grid-rows-[51.9965px_51.9965px_51.9965px_51.9965px_74.0451px_36.9618px_21.9931px] grid w-full gap-[0.63rem] m-auto"
        @submit.prevent="submit_register">
        <div class="flex-col relative flex">
            <div class="bg-slate-600 rounded-t-lg rounded-tr-lgoverflow-hidden relative z-0 w-full mb-5 group">
                <input type="text" name="floating_first_name" id="floating_first_name"
                    class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-400 peer"
                    placeholder=" " required autocomplete="username" />
                <label for="floating_first_name"
                    class="peer-focus:font-medium absolute text-sm text-slate-300 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ml-2">Username</label>
            </div>
        </div>
        <div class="flex-col relative flex">
            <div class="bg-slate-600 rounded-t-lg rounded-tr-lgoverflow-hidden relative z-0 w-full mb-5 group">
                <input :type="showPassword ? 'text' : 'password'" name="floating_password" id="floating_password"
                    class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-400 peer"
                    placeholder=" " required autocomplete="password" />
                <label for="floating_password"
                    class="peer-focus:font-medium absolute text-sm text-slate-300 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ml-2">Password</label>
                <div class="absolute top-3 right-0 pr-3 flex items-center cursor-pointer"
                    @click="togglePasswordVisibility('password')">
                    <nuxt-icon v-if="showPassword" name="hide" alt="Hide Password" class="h-full w-full text-lg" />
                    <nuxt-icon v-else name="show" alt="Show Password" class="h-full w-full text-lg" />
                </div>    
            </div>
        </div>
        <div class="flex-col relative flex">
            <div class="bg-slate-600 rounded-t-lg rounded-tr-lgoverflow-hidden relative z-0 w-full mb-5 group">
                <input :type="showConfPassword ? 'text' : 'password'" name="floating_konpassword" idf="floating_konpassword"
                    class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-400 peer"
                    placeholder=" " required autocomplete="password" />
                <label for="floating_konpassword"
                    class="peer-focus:font-medium absolute text-sm text-slate-300 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ml-2">Konfirmasi
                    Password</label>
                <div class="absolute top-3 right-0 pr-3 flex items-center cursor-pointer"
                    @click="togglePasswordVisibility('konfirmasipassword')">
                    <nuxt-icon v-if="showConfPassword" name="hide" alt="Hide Password" class="h-full w-full text-lg" />
                    <nuxt-icon v-else name="show" alt="Show Password" class="h-full w-full text-lg" />
                </div>
            </div>
        </div>
        <div class="flex-col relative flex">
            <div class="bg-slate-600 rounded-t-lg rounded-tr-lgoverflow-hidden relative z-0 w-full mb-5 group">
                <input type="text" name="floating_refferal" id="floating_refferal"
                    class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-400 peer"
                    placeholder=" " required />
                <label for="floating_refferal"
                    class="peer-focus:font-medium absolute text-sm text-slate-300 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ml-2">Referral
                    Code</label>
            </div>
        </div>
        <label class="items-start inline-flex my-1 mr-3">
            <div class="text-slate-300 text-sm ml-1">
                <div class="align-middle">
                    <ul class="list-disc pl-10">
                        <li class="text-sm">Anda setidaknya berumur 18 keatas.</li>
                        <li class="text-sm">Silakan gunakan informasi yang valid.</li>
                        <li class="text-sm">Data anda aman bersama kami.</li>
                    </ul>
                </div>
            </div>
        </label>
        <LoadingButton :isLoading="isLoading" type="submit" label="Create Account" class="text-gray-800 conicylw items-center opacity-80 justify-center py-3 px-5 text-center flex w-auto h-11 mt-3 rounded-3xl overflow-hidden text-base font-bold" />
    </form>
</template>
<script setup>
import { ref } from 'vue';
import { useAccountStore } from '@/store/AccountStore'
import { useRouter } from 'vue-router'
import LoadingButton from '@/composables/LoadingButton.vue';

const accountStore = useAccountStore();
const showPassword = ref(false);
const showConfPassword = ref(false);
const router = useRouter();
const isLoading = ref(false)
let modal = null;

const username = ref('')
const password = ref('')
const verifyPassword = ref('')
const referralCode = ref('')

const togglePasswordVisibility = (field) => {
  if (field === 'password') {
    showPassword.value = !showPassword.value;
  } else if (field === 'konfirmasipassword') {
    showConfPassword.value = !showConfPassword.value;
  }
};

// Register
const submit_register = async () => {
  try {
    isLoading.value = true; 
    await accountStore.register(username.value, password.value, verifyPassword.value, referralCode.value);
    
    await accountStore.login(username.value, password.value);
    
    modal.hide();

    await router.push({ path: '/account' });

    isLoading.value = false;

  } catch (error) {
    let errorMessage = error.messages || 'An unexpected error occurred.';
    if (error.messages && typeof error.messages === 'object') {
      errorMessage = Object.values(error.messages).flat().join(' & ');
    }
    showToast(errorMessage, 'error', 'toastregisterform');
    isLoading.value = false; 
  }
};
</script>