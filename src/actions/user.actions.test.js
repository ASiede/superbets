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
    it('dispatches storeAuthInfo when there is a successful login', async () => {
      const mockUserData = {};
      const dispatch = jest.fn();
      fetch.mockResolvedValueOnce({
        status: 200,
        json: jest.fn().mockResolvedValueOnce({
          authToken: '1a'
        })
      });
      const actual = await logInUser(mockUserData)(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(actual).toEqual({ status: 200 });
    });
    it('returns an error object when there is not a successful login', async () => {
      const mockUserData = {};
      const mockStatus = 400;
      const dispatch = jest.fn();
      fetch.mockResolvedValueOnce({
        status: mockStatus
      });
      const actual = await logInUser(mockUserData)(dispatch);
      expect(actual).toEqual({
        status: mockStatus,
        errorMessage: 'There was an issue with your username or password'
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
});
