import { combineReducers } from 'redux';
import user from './userReducer';
import newBetEvent from './newBetEventReducer';
import navigation from './navigationReducer';

export const rootReducer = combineReducers({
  navigation,
  newBetEvent,
  user
});

export default rootReducer;
