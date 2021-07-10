import { createAction } from 'redux-actions';
import jwtDecode from 'jwt-decode';
import {
  saveAuthToken,
  clearAuthToken,
  getAuthToken
} from '../utils/user/user';
import { createSnackbar } from '../utils/snackbar/Snackbar';
import { SNACKBAR_TYPES, SNACKBAR_MESSAGES } from '../components/constants';
import { SUPERBETS_API_BASE_URL } from '../config';

export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const SET_USERNAME = 'SET_USERNAME';
export const SET_LOG_IN_IN_PROGRESS = 'SET_LOG_IN_IN_PROGRESS';

export const setLogIn = createAction(SET_LOGGED_IN);
export const setUsername = createAction(SET_USERNAME);
export const setLogInInProgress = createAction(SET_LOG_IN_IN_PROGRESS);

export const storeAuthInfo = (authToken) => (dispatch) => {
  const decodedToken = jwtDecode(authToken);
  if (decodedToken.user && decodedToken.user.username) {
    dispatch(setUsername(decodedToken.user.username));
    saveAuthToken(authToken);
    dispatch(setLogIn(true));
  }
};

export const logInUser =
  (username, password, loginSnackbars) => async (dispatch) => {
    dispatch(setLogInInProgress(true));
    const response = await fetch(`${SUPERBETS_API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (!response || response.status !== 200) {
      loginSnackbars.current.show(
        createSnackbar(SNACKBAR_TYPES.ERROR, SNACKBAR_MESSAGES.LOGIN_ERROR)
      );
      dispatch(setLogInInProgress(false));
    } else {
      const responseJson = await response.json();
      try {
        dispatch(storeAuthInfo(responseJson.authToken));
      } catch (err) {
        loginSnackbars.current.show(
          createSnackbar(SNACKBAR_TYPES.ERROR, SNACKBAR_MESSAGES.LOGIN_ERROR)
        );
      } finally {
        dispatch(setLogInInProgress(false));
      }
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
