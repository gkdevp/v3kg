<template>
  <div id="regModal" tabindex="-1" aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-lg lg:max-w-2xl 2xl:max-w-2xl max-h-full">
      <div class="relative rounded-lg shadow backdrop-blur-2xl bgblur">
        <button id="button" type="button"
          class="absolute top-3 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center">
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="px-6 py-6 lg:px-8">
          <h1 class="text-red-500 items-center justify-center">This is a test website, only for internal use</h1>
          <h3 class="mb-4 text-xl font-medium dark:text-white">REGISTER</h3>
          <form class="md:w-2/3 md:mx-auto" @submit.prevent="submit_register">
            <div class="space-y-6">
              <!-- Username input -->
              <div class="flex items-center space-x-4">
                <label for="text" class="w-1/3 font-bold">Username</label>
                <div class="flex-1">
                  <input type="text" v-model="username"
                    class="h-9 w-full bg-darken cursor-pointer text-sm py-1.5 px-3 border border-gray-400 border-solid rounded focus:ring-gray-600 focus:border-gray-600 text-white"
                    placeholder="Username" autocomplete="username" required />
                </div>
              </div>
              <!-- Password input -->
              <div class="flex items-center space-x-4">
                <label for="password" class="w-1/3 font-bold">Password</label>
                <div class="relative flex-1">
                  <input :type="showPassword ? 'text' : 'password'" name="password" v-model="password"
                    class="h-9 w-full bg-darken cursor-pointer text-sm py-1.5 px-3 border border-gray-400 border-solid rounded focus:ring-gray-600 focus:border-gray-600 text-white pr-10"
                    placeholder="********" required autocomplete="new-password" />
                  <div class="absolute top-1 right-0 pr-3 flex items-center cursor-pointer"
                    @click="togglePasswordVisibility('password')">
                    <nuxt-icon v-if="showPassword" name="hide" alt="Hide Password" class="h-8 w-8" />
                    <nuxt-icon v-else name="show" alt="Show Password" class="h-8 w-8" />
                  </div>
                </div>
              </div>
              <!-- Verify Password input -->
              <div class="flex items-center space-x-4">
                <label for="konfirmasipassword" class="w-1/3 font-bold">Konfirmasi Sandi</label>
                <div class="relative flex-1">
                  <input :type="showConfPassword ? 'text' : 'password'" name="verifyPassword"
                    v-model="verifyPassword"
                    class="h-9 w-full bg-darken cursor-pointer text-sm py-1.5 px-3 border border-gray-400 border-solid rounded focus:ring-gray-600 focus:border-gray-600 text-white pr-10"
                    placeholder="********" autocomplete="new-password" required />
                  <div class="absolute top-1 right-0 pr-3 flex items-center cursor-pointer"
                    @click="togglePasswordVisibility('konfirmasipassword')">
                    <nuxt-icon v-if="showConfPassword" name="hide" alt="Hide Password" class="h-8 w-8" />
                    <nuxt-icon v-else name="show" alt="Show Password" class="h-8 w-8" />
                  </div>
                </div>
              </div>
              <!-- Referral Code input -->
              <div class="flex items-center space-x-4">
                <label for="text" class="w-1/3 font-bold">Referral Code</label>
                <div class="flex-1">
                  <input type="text" v-model="referralCode"
                    class="h-9 w-full bg-darken cursor-pointer text-sm py-1.5 px-3 border border-gray-400 border-solid rounded focus:ring-gray-600 focus:border-gray-600 text-white"
                    placeholder="Referral Code" />
                </div>
              </div>
              <!-- Submit button -->
              <div class="text-center">
                <LoadingButton :isLoading="isLoading" type="submit" label="SUBMIT" class="signup" />
              </div>
              <div class="align-middle">
                <ul class="list-disc pl-10">
                  <li class="text-sm">Anda setidaknya berumur 18 keatas.</li>
                  <li class="text-sm">Silakan gunakan informasi yang valid.</li>
                  <li class="text-sm">Data anda aman bersama kami.</li>
                </ul>
              </div>
            </div>
          </form>
          <!-- Toast Container -->
          <div id="toastregisterform"
            class="relative w-full sm:max-w-xl sm:grid-cols-6 p-4 rounded-md shadow-lg text-left hidden my-4">
            <div class="absolute top-2 right-2" id="toast-icon-container">
              <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg">
                <svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                  viewBox="0 0 20 20">
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
</template>

<script setup>
import { ref } from 'vue';
import { Modal } from 'flowbite'
import { useAccountStore } from '@/store/AccountStore'
import { useRouter } from 'vue-router'
import LoadingButton from '@/composables/LoadingButton.vue';

const accountStore = useAccountStore()
const showPassword = ref(false);
const showConfPassword = ref(false);
const router = useRouter();
const isLoading = ref(false)
let modal = null;

const username = ref('')
const password = ref('')
const verifyPassword = ref('')
const referralCode = ref('')

const setLoading = (actionName, value) => {
    loadingStates.value[actionName] = value;
}   

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


//Register Modal
onMounted(() => {
  const $buttonElementDesktop = document.querySelector('#register-desktop');
  const $buttonElementMobile = document.querySelector('#register-mobile');
  const $modalElement = document.querySelector('#regModal');
  const $closeButton = document.querySelector('#button');
  const modalOptions = {
    backdropClasses: 'bg-gray-900 bg-opacity-75 fixed inset-0 z-40',
  }
  if ($modalElement) {
    modal = new Modal($modalElement, modalOptions);
    $buttonElementDesktop.addEventListener('click', () => modal.toggle());
    $buttonElementMobile.addEventListener('click', () => modal.toggle()); // Add event listener for the second button
    $closeButton.addEventListener('click', () => modal.hide());
  }
})
</script>