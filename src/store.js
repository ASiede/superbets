import {createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import {reducer as formReducer} from 'redux-form';

import superbetsState from './reducers';


export default createStore(
  combineReducers({
    superbetsState,
    form: formReducer
  }),
  applyMiddleware(thunk)
);