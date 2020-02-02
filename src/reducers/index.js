
import * as actions from '../actions/index'

const initialState = {
  betEvents: [],
  test: 'its wired'
};

export const superbetsState = (state=initialState, action) => {
  let expression = action.type
  console.log('ACTION', action) 
	switch (expression) {

		case actions.SET_BET_EVENTS:
      console.log('ACTION', action) 
      // console.log('payload', payload) 
			return {
        ...state, 
				betEvents: [...action.betEvent]
      }		

		default:
		return state;
	}
}

export default superbetsState
