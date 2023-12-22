import { defineStore } from 'pinia';

const voucherURL = 'https://ge-api.kgaming.dev/v1/vouchers/get';
const UpvcrURL = 'https://ge-api.kgaming.dev/v1/vouchers/claim';

export const useVoucherStore = defineStore('voucher',{
  state: () => ({
     vouchers:[],
  }),

  actions: {
    // Fetch voucher  
    async fetchVoucher() { 
        try {
            const accessToken = getToken();
            const headers = headerAuth(accessToken);
            const response = await fetch(voucherURL, {
                method: 'GET',
                headers: headers,
            });
    
            // Retrieve Data from server
            const data = await response.json();
            
            // if there is an error
            if (data.error) {
                const ErrorCode = data.error.code
                const ErrorMessage = data.error.message;
                const ErrorMessages = data.error.messages;
                throw {
                    name: 'GeneralError',
                    code: ErrorCode,
                    message: ErrorMessage,
                    messages: ErrorMessages
                }; 
            } else {
                this.vouchers = data.data;
            }
    
        } catch (error) {
            throw error;
        }
    },

    // Claim Voucher
    async claimVoucher(id) { 
        try {
            const accessToken = getToken();
            const headers = headerAuth(accessToken);
            const response = await fetch(UpvcrURL, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    id: id,
                })
            });
    
            // Retrieve Data from server
            const data = await response.json();
            console.log(data)
            // if there is an error
            if (data.error) {
                const ErrorCode = data.error.code
                const ErrorMessage = data.error.message;
                const ErrorMessages = data.error.messages;
                throw {
                    name: 'GeneralError',
                    code: ErrorCode,
                    message: ErrorMessage,
                    messages: ErrorMessages
                }; 
            } else {
             //success
            }
    
        } catch (error) {
            throw error;
        }
    },
    reset() {
        this.vouchers = [];
    }
  }
});