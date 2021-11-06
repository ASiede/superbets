import { combineReducers } from 'redux';
import navigation from './navigationReducer';
import persistingEvent from './persistingReducer';
import selectedEvent from './eventReducer';
import user from './userReducer';

export const rootReducer = combineReducers({
  navigation,
  persistingEvent,
  selectedEvent,
  user
});

export default rootReducer;
