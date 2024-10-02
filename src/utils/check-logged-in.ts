export const checkLoggedIn = () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) return false;
  return true;
};
