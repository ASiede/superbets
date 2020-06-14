import { createAction } from 'redux-actions';

export const SET_BET_EVENTS = 'SET_BET_EVENTS';
export const setBetEvents = createAction(SET_BET_EVENTS);

export const UPDATE_CURRENT_TAB = 'UPDATE_CURRENT_TAB';
export const updateCurrentTab = createAction(UPDATE_CURRENT_TAB);

const proxy = 'https://cors-anywhere.herokuapp.com/';
const baseUrl = 'https://cors-anywhere.herokuapp.com/https://superbets-api.herokuapp.com/betevent/';

export const getOneBetEvent = () => async(dispatch) => {
  const response = await fetch(`${baseUrl}5e35eeeaf8dc2833c39c128b`);
  const newResponse = await response.json();
  dispatch(setBetEvents(newResponse));
};

export const getAllBetEvents = () => async(dispatch) => {
  const response = await fetch(`${baseUrl}`);
  const newResponse = await response.json();
  dispatch(setBetEvents(newResponse.betEvents));
};

export const persistBetEvent = (variables) => async(dispatch) => {
  const response = await fetch(`${baseUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(variables)

  });
  const newResponse = await response.json();
  console.log('POSTING BET EVENT', newResponse);
};