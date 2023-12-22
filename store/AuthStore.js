import { defineStore } from 'pinia';
import fetchAPI from '@/utils/clienAPI';

export const useAuthStore = defineStore('auth', {
    state: () => ({
      isAuth: false,
    }),

    persist: true,

    actions: {
        async fetchAuth() {
            try {

                await fetchAPI('/auth/status', { method: 'POST' });
                
                //Success
                this.isAuth = true;

            } catch (error) {
                throw error;
            }
        },

        reset() {
            this.isAuth = false
        }
    },
});