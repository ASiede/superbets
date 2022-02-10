import { SET_EVENT_MODE } from '../actions';
import { EventMode } from '../Types';

export const initialState = EventMode.NEW;

export const eventMode = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_EVENT_MODE: {
      return payload;
    }
    default:
      return state;
  }
};

export default eventMode;
