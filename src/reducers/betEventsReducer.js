import { SET_BET_EVENTS } from '../actions/index';

const initialState = {
  betEvents: []
};

export const betEvents = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_BET_EVENTS:
      return {
        ...state,
        betEvents: payload
      };
    default:
      return state;
  }
};

export default betEvents;
