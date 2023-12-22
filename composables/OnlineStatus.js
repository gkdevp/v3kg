import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/store/AuthStore';

export default function useOnlineStatus() {
  const isOnline = ref(null);
  const previousIsOnline = ref(undefined);  
  const justCameOnline = ref(false);        
  const authStore = useAuthStore();

  const updateOnlineStatus = () => {
    if (typeof navigator !== 'undefined') {
      previousIsOnline.value = isOnline.value;
      isOnline.value = navigator.onLine;

      // Check if transitioning from offline to online, not on initial load
      if (previousIsOnline.value === false && isOnline.value === true) {

        //Refetch authStore
        authStore.fetchAuth();

        justCameOnline.value = true;      

        setTimeout(() => {
          justCameOnline.value = false;   // Reset after 3 seconds
        }, 3000);
      }

      if (!navigator.onLine) {
        authStore.isLogin = false;
      }

    } 
    
    else {
      isOnline.value = null;
    }

  }

  onMounted(() => {

    if (typeof window !== 'undefined') {
      updateOnlineStatus();
      window.addEventListener('online', updateOnlineStatus);
      window.addEventListener('offline', updateOnlineStatus);
    }

  });

  onUnmounted(() => {

    if (typeof window !== 'undefined') {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    }

  });

  return {
    isOnline,
    justCameOnline 
  }
}