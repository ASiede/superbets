import {
  SET_LOGGED_IN,
  SET_USER,
  RESET_USER,
  SET_LOG_IN_IN_PROGRESS
} from '../actions';

export const initialState = {
  loggedIn: false
};

export const user = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_LOGGED_IN:
      return {
        ...state,
        loggedIn: payload
      };
    case SET_LOG_IN_IN_PROGRESS:
      return {
        ...state,
        logInInProgress: payload
      };
    case SET_USER:
      return {
        ...state,
        username: payload.username,
        id: payload.id,
        events: payload.events
      };
    case RESET_USER:
      return initialState;
    default:
      return state;
  }
};

export default user;
