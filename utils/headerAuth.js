export const BASE_HEADERS = {
    'Content-Type': 'application/json',
    'X-Gaming-Key': 'b3oxWUlRdmk1M25SVDdOSVNDaU41MXFE',
    'Accept': 'application/json',
  };
  
  export const headerAuth = (token = null) => {
    if (token) {
        return { ...BASE_HEADERS, 'Authorization': token };
    }
    return BASE_HEADERS;
};