import { combineReducers } from 'redux';
import navigation from './navigationReducer';
import persistingEvent from './persistingReducer';
import eventMode from './eventModeReducer';
import selectedEvent from './eventReducer';
import user from './userReducer';

export const rootReducer = combineReducers({
  navigation,
  persistingEvent,
  selectedEvent,
  eventMode,
  user
});

export default rootReducer;
