import { SET_PERSISTING_BET_EVENT } from '../actions';

export const initialState = false;

export const persistingEvent = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PERSISTING_BET_EVENT: {
      return payload;
    }
    default:
      return state;
  }
};

export default persistingEvent;
