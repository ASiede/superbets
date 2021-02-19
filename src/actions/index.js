import { createAction } from 'redux-actions';
import { SUPERBETS_API_BASE_URL } from '../config';

export const SET_BET_EVENTS = 'SET_BET_EVENTS';
export const setBetEvents = createAction(SET_BET_EVENTS);

export const UPDATE_CURRENT_TAB = 'UPDATE_CURRENT_TAB';
export const updateCurrentTab = createAction(UPDATE_CURRENT_TAB);

export const getOneBetEvent = () => async(dispatch) => {
  const response = await fetch(`${SUPERBETS_API_BASE_URL}/5e35eeeaf8dc2833c39c128b`);
  const newResponse = await response.json();
  dispatch(setBetEvents(newResponse));
};

export const getAllBetEvents = () => async(dispatch) => {
  const response = await fetch(`${SUPERBETS_API_BASE_URL}/betevent`);
  const newResponse = await response.json();
  dispatch(setBetEvents(newResponse.betEvents));
};
