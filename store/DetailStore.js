import { defineStore } from 'pinia';

const TeamURL = 'https://ge-api.kgaming.dev/v1/teams/get-detail';

export const useDetailStore = defineStore('detail',{
  state: () => ({
    detailMember :[],
  }),
  actions: {
    // Fetch public  
    async fetchDetail() {
      try {
        const accessToken = getToken();
        const headers = headerAuth(accessToken);
        const response = await fetch(TeamURL, {
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
          this.detailMember = data.data.team;
        }
      } catch (error) {
        throw error;
      }
    },
    reset() {
      this.detailMember = [];
    }
  }
});