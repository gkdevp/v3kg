import { defineStore } from "pinia";

const ntfyURL = "https://ge-api.kgaming.dev/v1/players/notifications?preset=latest";
const noftUPURL = "https://ge-api.kgaming.dev/v1/notifications/update";

export const useNotfyStore = defineStore('notify-store', {
    state: () => ({
        newNotif: false,
        notify: [],
    }),
    
    persist: {
        paths: ['newNotif']
      },

    getters: {
        unreadNotifications() {
            // Filter notifications that have is_read set to false
            return this.notify.filter(notification => !notification.is_read);
        }
    },
    actions: {
        // Fetch Notfiy  
        async fetchNotifications() {
            try {
                const accessToken = getToken();
                const headers = headerAuth(accessToken);
                const response = await fetch(ntfyURL, {
                    method: 'GET',
                    headers: headers,
                });
                const data = await response.json();
                if (data.error) {
                    const ErrorMessage = data.error.message;
                    const ErrorMessages = data.error.messages;
                    throw {
                        message: ErrorMessage,
                        messages: ErrorMessages
                    };
                }
                // Success
                else {
                    this.notify = data.data;
                }
            } catch (error) {
                throw error;
            }
        },

        // Update Notification  
        async updateNotifications(id, read_all) {
            try {
                const accessToken = getToken();
                const headers = headerAuth(accessToken);
                const response = await fetch(noftUPURL, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        id: id,
                        read_all: read_all
                    })
                });
                const data = await response.json();
                if (data.error) {
                    const ErrorMessage = data.error.message;
                    const ErrorMessages = data.error.messages;
                    throw {
                        message: ErrorMessage,
                        messages: ErrorMessages
                    };
                }
                // Success
                else {
                    console.log('success')
                    // 
                }
            } catch (error) {
                throw error;
            }
        },
        reset() {
            this.notify = [];
        }
    }
});
