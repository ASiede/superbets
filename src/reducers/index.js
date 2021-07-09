import { combineReducers } from 'redux';
import user from './userReducer';
import betEvents from './betEventsReducer';

export const rootReducer = combineReducers({
  betEvents,
  user
});

export default rootReducer;
