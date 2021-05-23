import { createAction } from 'redux-actions';
import jwtDecode from 'jwt-decode';
import {
  saveAuthToken,
  clearAuthToken,
  getAuthToken
} from '../utils/snackbar/localStorage/localStorage';
import { SUPERBETS_API_BASE_URL } from '../config';

export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const SET_USERNAME = 'SET_USERNAME';
export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';

export const setLogIn = createAction(SET_LOGGED_IN);
export const setUsername = createAction(SET_USERNAME);
export const setAuthToken = createAction(SET_AUTH_TOKEN);

const storeAuthInfo = (authToken) => (dispatch) => {
  const decodedToken = jwtDecode(authToken);
  if (decodedToken.user && decodedToken.user.username) {
    dispatch(setUsername(decodedToken.user.username));
    saveAuthToken(authToken);
    dispatch(setLogIn(true));
  }
};

export const registerUser = (userData) => async () => {
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
        errorMessage: responseJson.message
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

export const logInUser = (userData) => async (dispatch) => {
  const response = await fetch(`${SUPERBETS_API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  if (!response || response.status !== 200) {
    return {
      status: response.status,
      errorMessage: 'There was an issue with your username or password'
    };
  } else {
    const responseJson = await response.json();
    try {
      dispatch(storeAuthInfo(responseJson.authToken, responseJson.username));
      dispatch(setLogIn(true));
      dispatch(setUsername(responseJson.username));
    } catch (err) {
      return {
        status: 500,
        errorMessage: 'There was an issue logging in'
      };
    }
    return {
      status: response.status
    };
  }
};

export const logOutUser = () => (dispatch) => {
  clearAuthToken();
  dispatch(setLogIn(false));
  dispatch(setUsername(null));
};

export const loadUserWithValidJWT = () => (dispatch) => {
  const token = getAuthToken();
  if (token) {
    const decoded = jwtDecode(token);
    const currentTimeInSec = parseInt(Date.now().toString().slice(0, -3));
    const valid = decoded.exp && currentTimeInSec < decoded.exp;
    if (valid) {
      dispatch(storeAuthInfo(token));
    } else {
      dispatch(clearAuthToken());
    }
  }
};
