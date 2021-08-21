import { SUPERBETS_API_BASE_URL } from '../config';
import { createAction } from 'redux-actions';

export const ADD_ANSWER = 'ADD_ANSWER';
export const ADD_QUESTION = 'ADD_QUESTION';
export const RESET_NEW_BET_EVENT = 'RESET_NEW_BET_EVENT';
export const SET_BET_EVENTS = 'SET_BET_EVENTS';
export const SET_NEW_BET_EVENT_NAME = 'SET_NEW_BET_EVENT_NAME';
export const SET_PERSISTING_BET_EVENT = 'SET_PERSISTING_BET_EVENT';
export const UPDATE_ANSWER = 'UPDATE_ANSWER';
export const UPDATE_ODDS = 'UPDATE_ODDS';
export const UPDATE_QUESTION_TEXT = 'UPDATE_QUESTION_TEXT';
export const addAnswer = createAction(ADD_ANSWER);
export const addQuestion = createAction(ADD_QUESTION);
export const resetNewBetEvent = createAction(RESET_NEW_BET_EVENT);
export const setNewBetEventName = createAction(SET_NEW_BET_EVENT_NAME);
export const setPersistingBetEvent = createAction(SET_PERSISTING_BET_EVENT);
export const updateAnswer = createAction(UPDATE_ANSWER);
export const updateOdds = createAction(UPDATE_ODDS);
export const updateQuestionText = createAction(UPDATE_QUESTION_TEXT);

// TODO: clean up
// export const getOneBetEvent = () => async (dispatch) => {
//   const response = await fetch(
//     `${SUPERBETS_API_BASE_URL}/5e35eeeaf8dc2833c39c128b`
//   );
//   const newResponse = await response.json();
//   dispatch(setBetEvents(newResponse));
// };

// TODO: put where it belongs
// export const getAllBetEvents = () => async (dispatch) => {
//   const response = await fetch(`${SUPERBETS_API_BASE_URL}/betevent`);
//   const newResponse = await response.json();
//   dispatch(setBetEvents(newResponse.betEvents));
// };

export const persistBetEvent = () => async (dispatch, getState) => {
  // FIXME: IT DOES NOT PERSIST
  const state = getState();
  const { newBetEvent } = state.betEvents;
  dispatch(setPersistingBetEvent(true));
  try {
    const result = await fetch(`${SUPERBETS_API_BASE_URL}/betevent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newBetEvent,
        createdBy: state.user.username,
        password: 'password' // FIXME: this needs to be removed with api update
      })
    });
    await result.json();
  } catch (error) {
    // TODO: on failure
  }
  dispatch(setPersistingBetEvent(false));
  dispatch(resetNewBetEvent());
  // TODO: movie to user bet events
};
