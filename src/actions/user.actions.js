import { createAction } from 'redux-actions';
import jwtDecode from 'jwt-decode';
import {
  saveAuthToken,
  // clearAuthToken,
  getAuthToken,
  getUsername
} from '../local-storage';

export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const SET_USERNAME = 'SET_USERNAME';
export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';


export const setLogIn = createAction(SET_LOGGED_IN);
export const setUsername = createAction(SET_USERNAME);
export const setAuthToken = createAction(SET_AUTH_TOKEN);

// export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
// export const setAuthToken = authToken => ({
//   type: SET_AUTH_TOKEN,
//   authToken
// });

export const CLEAR_AUTH = 'CLEAR_AUTH';
export const clearAuth = () => ({
  type: CLEAR_AUTH
});

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => ({
  type: AUTH_REQUEST
});

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = currentUser => ({
  type: AUTH_SUCCESS,
  currentUser
});

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = error => ({
  type: AUTH_ERROR,
  error
});

export const baseUrl = 'https://cors-anywhere.herokuapp.com/https://superbets-api.herokuapp.com';

const storeAuthInfo = (authToken, username) => (dispatch) => {
  const decodedToken = jwtDecode(authToken);
  dispatch(setAuthToken(authToken));
  dispatch(authSuccess(decodedToken.user));
  saveAuthToken(authToken, username);
};

export const registerUser = (userData) => async () => {
  const response = await fetch(`${baseUrl}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  // const newResponse = await response.json(); // body

  if(!response || !response.status === 201) {
    // TODO: something with the error
  } else {
    // TODO: something with the response
  }
};

export const logInUser = (userData) => async (dispatch) => {
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  const newResponse = await response.json(); // body

  if(!response || !response.status === 200) {
    // TODO: something with the error
  } else {
    dispatch(storeAuthInfo(newResponse.authToken, newResponse.username));
    dispatch(setLogIn(true));
    dispatch(setUsername(newResponse.username));
  }
};

export const loadUser = () => (dispatch) => {
  const token = getAuthToken();
  const username = getUsername();
  if (token) {
    dispatch(storeAuthInfo(token));
    dispatch(setLogIn(true));
    dispatch(setUsername(username));
  }
};
