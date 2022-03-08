import { combineReducers } from 'redux';
import bettor from './bettorReducer';
import eventMode from './eventModeReducer';
import persistingEvent from './persistingReducer';
import selectedEvent from './eventReducer';
import user from './userReducer';
import toast from './toastReducer';

export const rootReducer = combineReducers({
  bettor,
  eventMode,
  persistingEvent,
  selectedEvent,
  toast,
  user
});

export default rootReducer;
