import { SNACKBAR_MESSAGES } from '../../components/constants';
import { createSnackbar } from './Snackbar';

describe('src/utils/snackbar/Snackbar', () => {
  describe('createSnackbar', () => {
    it('returns a snackbar array', () => {
      const type = SNACKBAR_MESSAGES.LOGIN_ERROR;
      const text = 'oopsie daisy';
      const actual = createSnackbar(type, text);
      const expected = [
        {
          severity: SNACKBAR_MESSAGES.LOGIN_ERROR,
          summary: text,
          sticky: true
        }
      ];
      expect(actual).toEqual(expected);
    });
  });
});
