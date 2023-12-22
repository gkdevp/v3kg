//middleware/isauth-mid.js
import { useAuthStore } from '@/store/AuthStore'

export default defineNuxtRouteMiddleware(async () => {

    //Variable to use Store
    const authStore = useAuthStore()

    // Wait for checking isLogin value to complete before moving to the conditions
    authStore.fetchAuth();
    
    // console.log("Is Authenticated: ", authStore.isAuth);
    
    if (authStore.isAuth) {
        return
      } 

    if (!authStore.isAuth) {
        return navigateTo('/')
    } 
});