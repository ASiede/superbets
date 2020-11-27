export const loadAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const getUsername = () => {
  return localStorage.getItem('username');
};

export const saveAuthToken = (authToken, username) => {
  try {
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('username', username);
  } catch (e) {}
};

export const clearAuthToken = () => {
  try {
    localStorage.removeItem('authToken');
  } catch (e) {}
};