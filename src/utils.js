export function getAuthToken() {
  return `Bearer ${localStorage.getItem('jwtToken')}`;
}
