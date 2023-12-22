import { useAuthStore } from '@/store/AuthStore';

export async function Logout() {
    try {

    // Create an instance of the auth store
    const authStore = useAuthStore();

    // Removing access_token and token_type from localStorage
    localStorage.clear();

    // Set isLogin to false
    authStore.isAuth = false;

    navigateTo("/");
    } catch (error) {
      console.error("Error during logout:", error);
  }
}


