<template>
  <div id="loginModal" tabindex="-1" aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-sm max-h-full">
      <div class="relative rounded-lg shadow backdrop-blur-2xl bgblur">
        <button id="loginButton" type="button"
          class="absolute top-3 right-2.5 bg-transparent hover:bg-opacity-30 rounded-lg text-sm w-10 h-10 ml-auto inline-flex justify-center items-center">
          <img src="https://www.bettilt.com/static/media/close-circle-lg.8baebc22241f8acb88203d90ca94dec7.svg" />
          <span class="sr-only">Close modal</span>
        </button>
        <div class="px-6 pt-6 lg:px-8">
          <h3 class="mb-4 text-xl text-white text-center font-bold">LOGIN</h3>
          <form class="space-y-6" @submit.prevent="login">
            <div class="relative">
              <div class="bg-slate-600 rounded-t-lg rounded-tr-lgoverflow-hidden relative z-0 w-full mb-5 group">
                <input v-model="formData.username.value" type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-400 peer" placeholder=" " required autocomplete="username"/>
                <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-slate-300 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ml-2">Username</label>
              </div>
            </div>
            <div class="relative">
              <div class="bg-slate-600 rounded-t-lg rounded-tr-lgoverflow-hidden relative z-0 w-full mb-5 group">
                <input v-model="formData.password.value" :type="passwordFieldType" type="text" name="password" id="password" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-white dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-400 peer" placeholder=" " autocomplete="current-password"/>
                <label for="password" class="peer-focus:font-medium absolute text-sm text-slate-300 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ml-2">Password</label>
                <nuxt-icon @click="togglePasswordVisibility" v-if="showPassword" name="hide"
                    alt="Hide Password"
                    class="h-8 w-8 cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-5" />
                  <nuxt-icon @click="togglePasswordVisibility" v-else name="show" alt="Show Password"
                    class="h-8 w-8 cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-5" />
              </div>
              </div>
            <LoadingButton :isLoading="isLoading" label="Login" @click="login" class="conicgreen relative flex items-center justify-center h-11 rounded-full overflow-hidden p-2 text-white w-full font-bold cursor-pointer" />
          </form>
          <!-- Toast Container -->
          <div id="toastloginform"
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
        <div class="bglogin rounded-bl-2xl rounded-br-2xl text-base pb-8 px-8 pt-10 text-center min-h-[5.00rem]">
          <div class="justify-center flex">
            <span class="text-slate-300 mr-1.5">Don't have an account?</span>
            <button class="text-yellow-400 cursor-pointer inline-block">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Modal } from 'flowbite'
import { useAccountStore } from '@/store/AccountStore'
import LoadingButton from '@/composables/LoadingButton.vue';

const showPassword = ref(false);
const accountStore = useAccountStore()
const isLoading = ref(false)
let modal = null

const formData = {
  username: ref(''),
  password: ref(''),
};

// Computed property to determine the field type
const passwordFieldType = computed(() => (showPassword.value ? 'text' : 'password'));

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

const login = async () => {
  try {
    isLoading.value = true; 
    await accountStore.login(formData.username.value, formData.password.value );
    modal.hide()
    isLoading.value = false;
    showToast("Success", 'success', 'toastloginform');
  } catch (error) {
    let errorMessage = error.message || 'An unexpected error occurred.';
    showToast(errorMessage, 'error', 'toastloginform');
  }
  finally {
    isLoading.value = false; 
  }
}

//Register Button
const registerfrom = () => {
    modal.hide();
    const $regform = document.querySelector('#register-mobile');
    $regform.click();
}

onMounted(() => {
  const $buttonElement = document.querySelector('#buttonlogin');
  const $modalElement = document.querySelector('#loginModal');
  const $loginButton = document.querySelector('#loginButton');
  const modalOptions = {
    backdropClasses: 'bg-gray-900 bg-opacity-80 fixed inset-0 z-40',
  };
  if ($modalElement) {
    modal = new Modal($modalElement, modalOptions);
    $buttonElement.addEventListener('click', () => modal.toggle());
    $loginButton.addEventListener('click', () => modal.hide());
  }
});
</script>

