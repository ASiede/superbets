import toast from './toastReducer';

describe('src/reducers/toastReducer', () => {
  describe('toast', () => {
    it('returns initial state as null', () => {
      const state = toast(undefined, {});
      expect(state).toEqual(null);
    });
    // it('sets toast with an SET_TOAST action', () => {
    //   const toast = {};
    //   const toastAction = { type: SET_TOAST, payload: toast };
    //   const action = setToast({});
    //   const updatedState = toast({}, action);
    // });
  });
});
