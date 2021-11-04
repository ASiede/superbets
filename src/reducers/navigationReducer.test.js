import { updateManageTab } from '../actions';
import { ManageTabType } from '../Types/StateTypes';
import navigation, { initialState } from './navigationReducer';

describe('src/reducers/navigationReducer', () => {
  describe('navigation', () => {
    it('returns initial state', () => {
      const state = navigation(undefined, {});
      expect(state).toEqual(initialState);
    });
    it('updates manageTab with an UPDATE_MANAGE_TAB action', () => {
      const tab = ManageTabType.CONFIRM;
      const action = updateManageTab(tab);
      const updatedState = navigation(initialState, action);
      expect(updatedState.manageTab).toEqual(tab);
    });
  });
});
