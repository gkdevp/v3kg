// useLogout.js

// Import Stores
import { useAuthStore } from '@/store/AuthStore';
import { useBalanceStore } from '@/store/BalanceStore';
import { useMemberStore } from '@/store/MemberStore';
import { useDetailStore } from '@/store/DetailStore';
import { useNotfyStore } from '@/store/NotificationStore';
import { useVoucherStore } from '@/store/VoucherStore';

export function useLogout() {

    const logout = async () => {

        try {

        // Clear LocalStorage on client-side
        
        if (process.client) {
            localStorage.clear();
        }

        const authStore = useAuthStore();
        const balanceStore = useBalanceStore();
        const memberStore = useMemberStore();
        const detailStore = useDetailStore();
        const notfyStore = useNotfyStore(); 
        const voucherStore = useVoucherStore();

        // Reset Member State
        authStore.reset();
        balanceStore.reset();
        memberStore.reset();
        detailStore.reset();
        notfyStore.reset();
        voucherStore.reset();  
        } 
        
        catch (error) {
            throw error;   
        }

        // Redirect to the homepage
        await navigateTo('/');

    };

    return {
        logout
    };
}