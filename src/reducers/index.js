import * as actions from '../actions/index';
import {
  SET_AUTH_TOKEN,
  SET_LOGGED_IN,
  SET_USERNAME
} from '../actions/user.actions';

const initialState = {
  loggedIn: false,
  betEvents: []
};

export const superbetsState = (state = initialState, { type, payload }) => {
  switch (type) {
    // TODO: fix imports from one index
    case actions.SET_BET_EVENTS:
      return {
        ...state,
        betEvents: payload
      };
    case SET_LOGGED_IN:
      return {
        ...state,
        loggedIn: payload
      };
    case SET_USERNAME:
      return {
        ...state,
        username: payload
      };
    case SET_AUTH_TOKEN:
      return {
        ...state,
        authToken: payload
      };
    default:
      return state;
  }
};

export default superbetsState;
