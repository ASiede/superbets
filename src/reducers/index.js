
import * as actions from '../actions/index';

const initialState = {
  betEvents: [],
};

export const superbetsState = (state=initialState, { type, payload }) => {
  switch (type) {
  case actions.SET_BET_EVENTS:
    console.log('reducer', payload);
    return {
      ...state, 
      betEvents: payload
    };
  default:
    return state;
  }
};

export default superbetsState;
