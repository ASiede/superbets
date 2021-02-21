import { createAction } from 'redux-actions';
import { reset } from 'redux-form';
import jwtDecode from 'jwt-decode';
import {
  saveAuthToken,
  clearAuthToken,
  getAuthToken
} from '../local-storage';
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

export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await fetch(`${SUPERBETS_API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    console.log('response', response);
    if (!response || response.status !== 201) {
      const json = await response.json();
      console.log('json', json);
      return {
        status: response.status,
        errorMessage: `Error with ${json.location}: ${json.message}`
      };
    } else {
      dispatch(reset('register-user'));
      return {
        status: response.status
      };
    }
  } catch (e) { }
};

export const logInUser = (userData) => async (dispatch) => {
  const response = await fetch(`${SUPERBETS_API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  console.log('response', response);
  const responseJSON = await response.json();
  console.log('JSON', responseJSON);
  if (!response || !response.status === 200) {
    return {
      status: response.status,
      errorMessage: responseJSON.message
    };
  } else {
    dispatch(storeAuthInfo(responseJSON.authToken, responseJSON.username));
    dispatch(setLogIn(true));
    dispatch(setUsername(responseJSON.username));
    return {
      status: response.status
    };
  }
};

export const loadUserWithValidJWT = () => (dispatch) => {
  const token = getAuthToken();
  if (token) {
    const decoded = jwtDecode(token);
    const currentTimeInSec = parseInt(Date.now().toString().slice(0, -3));
    const valid = decoded.exp && (currentTimeInSec < decoded.exp);
    if (valid) {
      dispatch(storeAuthInfo(token));
    } else {
      dispatch(clearAuthToken());
    }
  }
};
