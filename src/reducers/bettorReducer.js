import { CLEAR_BETTOR, UPDATE_BETTOR } from '../actions';

export const bettor = (state = null, { type, payload }) => {
  switch (type) {
    case UPDATE_BETTOR: {
      return payload;
    }
    case CLEAR_BETTOR: {
      return null;
    }
    default:
      return state;
  }
};

export default bettor;
