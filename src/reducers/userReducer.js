import {
  // SET_AUTH_TOKEN,
  SET_LOGGED_IN,
  SET_USERNAME
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
    case SET_USERNAME:
      return {
        ...state,
        username: payload
      };
    // TODO: need this?
    // case SET_AUTH_TOKEN:
    //   return {
    //     ...state,
    //     authToken: payload
    //   };
    default:
      return state;
  }
};

export default user;
