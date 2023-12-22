import { defineStore } from 'pinia';

const accUrl = 'https://ge-api.kgaming.dev/v1/payments/add-account';
const upaccUrl = 'https://ge-api.kgaming.dev/v1/payments/update-account';
const crtUrl = 'https://ge-api.kgaming.dev/v1/transfers/create';
const detUrl = 'https://ge-api.kgaming.dev/v1/transfers/get?preset=this-month';
const trasUrl = 'https://ge-api.kgaming.dev/v1/transfers/get?preset=latest';

export const usePayStore = defineStore('pay-store', {
    state: () => ({
        historyDetails: [],
        depositDetails: [],
        withdrawDetails: [],
    }),

    actions: {

        // Add Payment Method
        async addPayment(paymentData) {
            try {
                const accessToken = getToken();
                const headers = headerAuth(accessToken);
                const response = await fetch(accUrl, {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify({
                        provider_code: paymentData.provider_code,
                        account_id: paymentData.account_id,
                        account_name: paymentData.account_name,
                        category: paymentData.category,
                    }),
                });
                const data = await response.json();
                console.log('API Response:', data);
                if (data.error) {
                    const ErrorCode = data.error.code
                    const ErrorMessage = data.error.message;
                    const ErrorMessages = data.error.messages;
                    throw {
                        code: ErrorCode,
                        message: ErrorMessage,
                        messages: ErrorMessages
                    };
                } else  {
                        //success
                }
            } catch (error) {
                throw error;
            }
        },

        // Enable and Disable Payment
        async updatePayment(provider_code, account_id, action) {
            try {
                const accessToken = getToken();
                const headers = headerAuth(accessToken);
                const response = await fetch(upaccUrl, {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify({
                        provider_code: provider_code,
                        account_id: account_id,
                        action: action
                    }),
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
                } else  {
                        //success
                }
            } catch (error) {
                throw error;
            }
        },

        // Deposit Logic
        async createPayment(paymentCreate) {
            try {
                const accessToken = getToken();
                const headers = headerAuth(accessToken);
                const response = await fetch(crtUrl, {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify({
                        type_trx: 'deposit',
                        player_account_id: paymentCreate.player_account_id,
                        amount: paymentCreate.amount,
                        payment_gateway_code: paymentCreate.payment_gateway_code,
                        payment_gateway_number: paymentCreate.payment_gateway_number
                    }),
                });

                const data = await response.json();

                //if there an error 
                if (data.error) {
                    console.log(data.error)
                    const ErrorCode = data.error.code
                    const ErrorMessage = data.error.message;
                    const ErrorMessages = data.error.messages;

                // Handle Unauthenticated
                if (ErrorCode === 100401) {
                    Logout();
                  }

                    throw {
                        //name: 'GeneralError',
                        code: ErrorCode,
                        message: ErrorMessage,
                        messages: ErrorMessages
                    };
                }
                // Sucess
                else {

                }
            } catch (error) {
                throw error;
            }
        },

        // Withdrawal Logic
        async dectPayment(paymentDeduct) {
            try {
                const accessToken = getToken();
                const headers = headerAuth(accessToken);
                const response = await fetch(crtUrl, {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify({
                        type_trx: 'withdraw',
                        player_account_id: paymentDeduct.player_account_id,
                        amount: paymentDeduct.amount,
                        payment_gateway_code: paymentDeduct.payment_gateway_code,
                        payment_gateway_number: paymentDeduct.payment_gateway_number
                    }),
                });

                const data = await response.json();

                //if there an error 
                if (data.error) {
                    const ErrorCode = data.error.code
                    const ErrorMessage = data.error.message;
                    const ErrorMessages = data.error.messages;

                // Handle Unauthenticated
                if (ErrorCode === 100401) {
                    Logout();
                }
                    throw {
                        code: ErrorCode,
                        message: ErrorMessage,
                        messages: ErrorMessages
                    };
                }
                // Sucess
                else {
  
                }
            } catch (error) {
                throw error;
            }
        },

        // Detail Payment
        async detailPayment() {
            try {
                const accessToken = getToken();
                const headers = headerAuth(accessToken);
                const response = await fetch(detUrl, {
                    method: "GET",
                    headers: headers,
                });

                const data = await response.json();
                
                //if there an error 
                if (data.error) {
                    console.log(data.error)
                    const ErrorCode = data.error.code
                    const ErrorMessage = data.error.message;
                    const ErrorMessages = data.error.messages;
                    throw {
                        //name: 'GeneralError',
                        code: ErrorCode,
                        message: ErrorMessage,
                        messages: ErrorMessages
                    };
                }
                // Sucess
                else {
                    this.historyDetails = data.data;
                }
            } catch (error) {
                throw error;
            }
        },

        // Get Deposit History
        async detailDeposit() {
            try {
                const accessToken = getToken();
                const headers = headerAuth(accessToken);
                const response = await fetch(trasUrl, {
                    method: "GET",
                    headers: headers,
                });
                const data = await response.json();
                //if there an error 
                if (data.error) {
                    const ErrorMessage = data.error.message;
                    const ErrorMessages = data.error.messages;
                    throw {
                        message: ErrorMessage,
                        messages: ErrorMessages
                    };
                }
                // Sucess
                else {
                    this.depositDetails = data.data.deposit;
                }
            } catch (error) {
                throw error;
            }
        },

        // Get Withdrawal History
        async detailWithdrawal() {
            try {
                const accessToken = getToken();
                const headers = headerAuth(accessToken);
                const response = await fetch(trasUrl, {
                    method: "GET",
                    headers: headers,
                });
                const data = await response.json();
                //if there an error 
                if (data.error) {
                    const ErrorMessage = data.error.message;
                    const ErrorMessages = data.error.messages;
                    throw {
                        message: ErrorMessage,
                        messages: ErrorMessages
                    };
                }
                // Sucess
                else {
                    this.withdrawDetails = data.data.withdraw;
                }
            } catch (error) {
                throw error;
            }
        },
    }
});
