import { registerUser } from './user';

global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear();
});

describe('src/utils/user/user', () => {
  describe('registerUser', () => {
    it('returns success object upon successful registration', async () => {
      const userData = {};
      const mockStatus = 201;
      fetch.mockResolvedValueOnce({
        status: mockStatus,
        json: jest.fn().mockResolvedValueOnce({ status: mockStatus })
      });
      const actual = await registerUser(userData);
      expect(actual).toEqual({ status: mockStatus });
    });
    it('returns error object upon unsuccessful registration', async () => {
      const userData = {};
      const mockStatus = 400;
      fetch.mockResolvedValueOnce({
        status: mockStatus,
        json: jest.fn().mockResolvedValueOnce({
          status: mockStatus,
          location: 'email',
          message: 'you messed up',
          code: mockStatus
        })
      });
      const actual = await registerUser(userData);
      expect(actual).toEqual({
        status: mockStatus,
        errorMessage: 'Error with email: you messed up'
      });
    });
    it('catches and return error when error is thrown', async () => {
      const userData = {};
      fetch.mockRejectedValue('oops');
      let actual;
      actual = await registerUser(userData);
      expect(actual.status).toEqual(500);
      expect(actual.errorMessage).toEqual('oops');
    });
  });
  describe('getAuthToken', () => {
    it('', () => {});
  });
});
