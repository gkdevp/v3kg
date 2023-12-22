//Import Composables
import { useLogout } from '@/composables/Logout';
const { logout } = useLogout();

//BASE API URL
const BASE_URL = 'https://ge-api.kgaming.dev/v1';

function getTokenFromLocalStorage() {
    if (process.client) {
        const access_token = localStorage.getItem('access_token');
        const token_type = localStorage.getItem('token_type');
        if (access_token && token_type) {
            return `${token_type} ${access_token}`;
        }
    }
    return null;
}

const API_Headers = (token = null) => {
    const BASE_HEADERS = {
        'Accept': 'application/json',
        'X-Gaming-Key': 'b3oxWUlRdmk1M25SVDdOSVNDaU41MXFE',
        'Content-Type': 'application/json'
    };

    if (token) {
        return { ...BASE_HEADERS, 'Authorization': token };
    }
    
    return BASE_HEADERS;
};

async function fetchAPI(endpoint, options = {}) {
    const token = getTokenFromLocalStorage();
    const headers = API_Headers(token);

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            ...headers,
            ...options.headers,
        },
    });

    const data = await response.json();

    if (data.error) {

        // //Unauthenticated user, Logout the user
        // if (data.error.code === 100401) {
        //     return logout(); 
        // }

        const ErrorCode = data.error.code;
        const ErrorMessage = data.error.message;
        const ErrorMessages = data.error.messages;
        throw {
            name: 'GeneralError',
            code: ErrorCode,
            message: ErrorMessage,
            messages: ErrorMessages
        };
    }

    return data;
}

export default fetchAPI;