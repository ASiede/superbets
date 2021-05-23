import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import superbetsState from './reducers';

export default createStore(superbetsState, applyMiddleware(thunk));
