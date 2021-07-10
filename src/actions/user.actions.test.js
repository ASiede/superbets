import jwtDecode from 'jwt-decode';
import {
  setLogIn,
  setUsername,
  storeAuthInfo,
  logInUser,
  logOutUser,
  loadUserWithValidJWT
} from './user.actions';
import {
  saveAuthToken,
  clearAuthToken,
  getAuthToken
} from '../utils/user/user';
import { SNACKBAR_MESSAGES, SNACKBAR_TYPES } from '../components/constants';
import { createSnackbar } from '../utils/snackbar/Snackbar';

global.fetch = jest.fn();
jest.mock('jwt-decode');
jest.mock('../utils/user/user');

beforeEach(() => {
  fetch.mockClear();
});

describe('src/actions/user.actions', () => {
  describe('storeAuthInfo', () => {
    it('dispatches setUsername and setLogIn and calls saveAuthToken when there is a username', () => {
      const mockUserName = 'Peyton';
      jwtDecode.mockReturnValue({ user: { username: mockUserName } });
      const authToken = '1a';
      const dispatch = jest.fn();
      storeAuthInfo(authToken)(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenCalledWith(setUsername(mockUserName));
      expect(saveAuthToken).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(setLogIn(true));
    });
  });
  describe('logInUser', () => {
    const username = 'pete';
    const password = 'password';
    const mockShow = jest.fn();
    const loginSnackbars = {
      current: {
        show: mockShow
      }
    };
    it('dispatches storeAuthInfo when there is a successful login', async () => {
      const dispatch = jest.fn();
      fetch.mockResolvedValueOnce({
        status: 200,
        json: jest.fn().mockResolvedValueOnce({
          authToken: '1a'
        })
      });
      await logInUser(username, password, loginSnackbars)(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(3);
      expect(dispatch.mock.calls[0][0].type).toEqual('SET_LOG_IN_IN_PROGRESS');
      expect(dispatch.mock.calls[0][0].payload).toEqual(true);
      expect(dispatch.mock.calls[2][0].type).toEqual('SET_LOG_IN_IN_PROGRESS');
      expect(dispatch.mock.calls[2][0].payload).toEqual(false);
    });
    it('returns an error object when there is not a successful login', async () => {
      const mockStatus = 400;
      const dispatch = jest.fn();
      fetch.mockResolvedValueOnce({
        status: mockStatus
      });
      await logInUser(username, password, loginSnackbars)(dispatch);
      expect(mockShow).toHaveBeenCalled();
      expect(mockShow).toHaveBeenCalledWith(
        createSnackbar(SNACKBAR_TYPES.ERROR, SNACKBAR_MESSAGES.LOGIN_ERROR)
      );
      expect(dispatch.mock.calls[0][0].type).toEqual('SET_LOG_IN_IN_PROGRESS');
      expect(dispatch.mock.calls[0][0].payload).toEqual(true);
      expect(dispatch.mock.calls[1][0].type).toEqual('SET_LOG_IN_IN_PROGRESS');
      expect(dispatch.mock.calls[1][0].payload).toEqual(false);
    });
    it('returns an error object when there is an error storing auth info', async () => {
      const dispatch = jest.fn();
      fetch.mockResolvedValueOnce({
        status: 200,
        json: jest.fn().mockResolvedValueOnce({
          authToken: '1a'
        })
      });
      dispatch.mockImplementationOnce();
      dispatch.mockImplementationOnce(() => {
        throw new Error();
      });
      await logInUser(username, password, loginSnackbars)(dispatch);
      expect(mockShow).toHaveBeenCalledWith(
        createSnackbar(SNACKBAR_TYPES.ERROR, SNACKBAR_MESSAGES.LOGIN_ERROR)
      );
      expect(dispatch.mock.calls[0][0].type).toEqual('SET_LOG_IN_IN_PROGRESS');
      expect(dispatch.mock.calls[0][0].payload).toEqual(true);
      expect(dispatch.mock.calls[2][0].type).toEqual('SET_LOG_IN_IN_PROGRESS');
      expect(dispatch.mock.calls[2][0].payload).toEqual(false);
    });
  });
  describe('logOutUser', () => {
    it('calls clearAuthToken and dispatches setLogIn and setLogIn and setUsername', () => {
      const dispatch = jest.fn();
      logOutUser()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(clearAuthToken).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(setLogIn(false));
      expect(dispatch).toHaveBeenCalledWith(setUsername(null));
    });
  });
  describe('loadUserWithValidJWT', () => {
    it('dispatches storeAuthInfo when token is valid', () => {
      const dispatch = jest.fn();
      const mockToken = '1a';
      getAuthToken.mockReturnValueOnce(mockToken);
      jwtDecode.mockReturnValueOnce({ exp: Date.now() });
      loadUserWithValidJWT()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
    it('dispatches clearAuthToken when token is invalid', () => {
      const dispatch = jest.fn();
      const mockToken = '1a';
      getAuthToken.mockReturnValueOnce(mockToken);
      jwtDecode.mockReturnValueOnce({ exp: 1 });
      loadUserWithValidJWT()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
