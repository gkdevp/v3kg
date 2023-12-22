export function getToken() {
  const access_token = localStorage.getItem('access_token');
  const token_type = localStorage.getItem('token_type');
  if (access_token && token_type) {
      return `${token_type} ${access_token}`;
  }
  return null; 
}