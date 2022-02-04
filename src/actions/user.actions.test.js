import jwtDecode from 'jwt-decode';
import {
  setLogIn,
  storeAuthInfo,
  logInUser,
  logOutUser,
  loadUserWithValidJWT,
  setUser,
  resetUser
} from './user.actions';
import {
  saveAuthToken,
  clearAuthToken,
  getAuthToken
} from '../utils/user/user';
import { SNACKBAR_MESSAGES, SNACKBAR_TYPES } from '../components/constants';
import { createSnackbar } from '../utils/snackbar/Snackbar';
import { getEventsByUser } from '../utils/events/events';

global.fetch = jest.fn();
jest.mock('jwt-decode');
jest.mock('../utils/user/user');
jest.mock('../utils/events/events');

beforeEach(() => {
  fetch.mockClear();
});

describe('src/actions/user.actions', () => {
  describe('storeAuthInfo', () => {
    it('dispatches setUsername and setLogIn and calls saveAuthToken when there is a username', async () => {
      const mockUser = { username: 'Peyton', id: '123' };
      const mockEvents = [{ name: 'event' }];
      jwtDecode.mockReturnValue({ user: mockUser });
      getEventsByUser.mockResolvedValueOnce(mockEvents);
      const authToken = '1a';
      const dispatch = jest.fn();
      await storeAuthInfo(authToken)(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenCalledWith(
        setUser({ ...mockUser, events: mockEvents })
      );
      expect(saveAuthToken).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(setLogIn(true));
    });
  });
  describe('logInUser', () => {
    const username = 'pete';
    const password = 'password';
    const mockShow = jest.fn();
    const manageSnackbars = {
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
      await logInUser(username, password, manageSnackbars)(dispatch);
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
      await logInUser(username, password, manageSnackbars)(dispatch);
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
      await logInUser(username, password, manageSnackbars)(dispatch);
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
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(clearAuthToken).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(resetUser());
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
