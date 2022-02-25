import { TOAST_MESSAGES } from '../../components/constants';
import { createToast } from './Toast';

describe('src/utils/toast/Toast', () => {
  describe('createToast', () => {
    it('returns a toast array', () => {
      const type = TOAST_MESSAGES.LOGIN_ERROR;
      const text = 'oopsie daisy';
      const actual = createToast(type, text);
      const expected = [
        {
          severity: TOAST_MESSAGES.LOGIN_ERROR,
          summary: text,
          sticky: true
        }
      ];
      expect(actual).toEqual(expected);
    });
  });
});
