import { initialize } from 'redux-form';
import { idText } from 'typescript';
import { setLogIn, setUsername } from '../actions';
import user, { initialState } from './userReducer';

describe('src/reducers/userReducer.js', () => {
  describe('user', () => {
    it('returns initial state', () => {
      const state = user(undefined, {});
      expect(state).toEqual(initialState);
    });
    it('updates the state with a SET_LOGGED_IN action', () => {
      const state = {
        loggedIn: false
      };
      const action = setLogIn(true);
      const updatedState = user(state, action);
      expect(updatedState.loggedIn).toEqual(true);
    });
    it('updates the state with a SET_USERNAME action', () => {
      const state = {};
      const action = setUsername('rosa');
      const updatedState = user(state, action);
      expect(updatedState.username).toEqual('rosa');
    });
  });
});
