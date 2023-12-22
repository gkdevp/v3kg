import { defineStore } from 'pinia';
import fetchAPI from '@/utils/clienAPI';

export const useBalanceStore = defineStore('auth-store', {
    state: () => ({
      balance : 0,
    }),
  
    actions: {
  
      async fetchBalance() {
        try {

          const data = await fetchAPI('/players/balance',{ method : 'GET'});
          this.balance = new Intl.NumberFormat('id-ID').format(data.data.balance);

        }

        catch (error) {
            throw error;
        }
      },
      reset() {
        this.balance = 0
      }
    },
  });