
import * as actions from '../actions/index'

const initialState = {
  betEvents: [],
  currentTab: 'HOME'
};

export const superbetsState = (state=initialState, { type, payload }) => {
	switch (type) {
		case actions.SET_BET_EVENTS:
			return {
        ...state, 
				betEvents: [...payload]
      }
  case actions.UPDATE_CURRENT_TAB:
    console.log('ACTION', payload) 
    return {
      ...state, 
      currentTab: payload
    }		
		default:
		return state;
	}
}

export default superbetsState
