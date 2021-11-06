import { setPersistingBetEvent } from '../actions';
import persistingEvent, { initialState } from './persistingReducer';

describe('src/reducers/persistingReducer', () => {
  describe('persistingEvent', () => {
    it('returns initial state', () => {
      const state = persistingEvent(undefined, {});
      expect(state).toEqual(initialState);
    });
    it('sets persistingBetEvent with a SET_PERSISTING_BET_EVENT action', () => {
      const state = false;
      const action = setPersistingBetEvent(true);
      const updatedState = persistingEvent(state, action);
      expect(updatedState).toEqual(true);
    });
  });
});
