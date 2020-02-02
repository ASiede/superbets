import { createAction } from 'redux-actions';

export const SET_BET_EVENTS = 'SET_BET_EVENTS';
export const setBetEvents = createAction(SET_BET_EVENTS)

// export const setBetEvents = betEvents => ({
//   type: SET_BET_EVENTS,
// 	betEvents
// })

const proxy = 'https://cors-anywhere.herokuapp.com/'

export const getOneBetEvent = async(dispatch) => {
  const response = await fetch('https://cors-anywhere.herokuapp.com/https://superbets-api.herokuapp.com/betevent/5e35eeeaf8dc2833c39c128b')
  const newResponse = await response.json()
  console.log('response', newResponse)
  // setBetEvents(newResponse)
  dispatch(setBetEvents(newResponse));
}