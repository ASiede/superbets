import { UPDATE_MANAGE_TAB } from '../actions/index';
import { ManageTabType } from '../Types/StateTypes';

export const initialState = {
  manageTab: ManageTabType.CONFIRM
};

export const navigation = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_MANAGE_TAB: {
      return {
        ...state,
        manageTab: payload
      };
    }
    default:
      return state;
  }
};

export default navigation;
