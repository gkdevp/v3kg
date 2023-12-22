import { defineStore } from 'pinia';

const teamsURL = "https://ge-api.kgaming.dev/v1/teams/get";

export const usePublicStore = defineStore('public',{
  state: () => ({
    public :[],
  }),
  actions: {
    // Fetch public  
    async fetchPublic() {
      try {
        const headers = headerAuth();
        const response = await fetch(teamsURL, {
          method: 'GET',
          headers: headers,
        });
        const data = await response.json();
        if (data.error) {
          const ErrorCode = data.error.code
          const ErrorMessage = data.error.message;
          const ErrorMessages = data.error.messages;
          throw {
            code: ErrorCode,
            message: ErrorMessage,
            messages: ErrorMessages
          };
        }
        // Success
        else {
          this.public = data.data.team;
        }
      } catch (error) {
        throw error;
      }
    },
  }
});