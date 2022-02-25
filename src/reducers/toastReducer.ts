import { SET_TOAST } from '../actions';

export const toast = (state = null, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case SET_TOAST: {
      return payload;
    }
    default:
      return state;
  }
};

export default toast;
