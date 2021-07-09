import { SUPERBETS_API_BASE_URL } from '../../config';

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${SUPERBETS_API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const responseJson = await response.json();
    if (!response || response.status !== 201) {
      return {
        status: responseJson.code,
        errorMessage: `Error with ${responseJson.location}: ${responseJson.message}`
      };
    } else {
      return {
        status: response.status
      };
    }
  } catch (err) {
    return {
      status: 500,
      errorMessage: err
    };
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const saveAuthToken = (authToken) => {
  try {
    localStorage.setItem('authToken', authToken);
  } catch (e) {}
};

export const clearAuthToken = () => {
  try {
    localStorage.removeItem('authToken');
  } catch (e) {}
};
