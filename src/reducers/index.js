import { combineReducers } from 'redux';
import bettor from './bettorReducer';
import eventMode from './eventModeReducer';
import navigation from './navigationReducer';
import persistingEvent from './persistingReducer';
import selectedEvent from './eventReducer';
import user from './userReducer';

export const rootReducer = combineReducers({
  bettor,
  eventMode,
  navigation,
  persistingEvent,
  selectedEvent,
  user
});

export default rootReducer;
