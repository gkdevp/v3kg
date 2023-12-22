import { defineStore } from 'pinia';
import fetchAPI from '@/utils/clienAPI';

// Import Store
import { useAuthStore } from '@/store/AuthStore';
import { useBalanceStore } from '@/store/BalanceStore';
import { useMemberStore } from '@/store/MemberStore';
import { useDetailStore } from '@/store/DetailStore';
import { useNotfyStore } from '@/store/NotificationStore';
import { useVoucherStore } from '@/store/VoucherStore';

export const useAccountStore = defineStore('account', {

  actions: {

    async register(username, password, verifyPassword, referralCode ) {
      try {

        const data = await fetchAPI('/players/register/', {
          method: 'POST',
          body: JSON.stringify({
            username: username,
            password: password,
            verifyPassword: verifyPassword,
            referralCode: referralCode,
          }),
        });
        
      } catch (error) {
            throw error;
      }
    },

    async login(username, password) {
      try {
    
        const data = await fetchAPI('/auth/login/', {
          method: 'POST',
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });

        // Set Local Storage
        localStorage.setItem('access_token', data.data.access_token);
        localStorage.setItem('expires_in', data.data.expires_in);
        localStorage.setItem('token_type', data.data.token_type);

        // Check Auth 
        const authStore = useAuthStore();
        await authStore.fetchAuth();

        // Fetch Remaining Store 
        const balanceStore = useBalanceStore();
        balanceStore.fetchBalance();

        const memberStore = useMemberStore();
        memberStore.GetProfile();
          
        const detailStore = useDetailStore();
        detailStore.fetchDetail();

        const Notfystore = useNotfyStore();
        Notfystore.fetchNotifications();

        const voucherStore = useVoucherStore(); 
        voucherStore.fetchVoucher();
        
      } catch (error) {
            throw error;
      }
    },
  },
});
