import { createAction } from 'redux-actions';
import { SNACKBAR_TYPES } from '../components/constants';
import { ManageTab } from '../Types/StateTypes';
import { SUPERBETS_API_BASE_URL } from '../config';
import { createSnackbar } from '../utils/snackbar/Snackbar';

export const ADD_ANSWER = 'ADD_ANSWER';
export const ADD_QUESTION = 'ADD_QUESTION';
export const RESET_NEW_BET_EVENT = 'RESET_NEW_BET_EVENT';
export const SET_BET_EVENTS = 'SET_BET_EVENTS';
export const SET_NEW_BET_EVENT_NAME = 'SET_NEW_BET_EVENT_NAME';
export const SET_PERSISTING_BET_EVENT = 'SET_PERSISTING_BET_EVENT';
export const UPDATE_ANSWER = 'UPDATE_ANSWER';
export const UPDATE_MANAGE_TAB = 'UPDATE_MANAGE_TAB';
export const UPDATE_ODDS = 'UPDATE_ODDS';
export const UPDATE_QUESTION_TEXT = 'UPDATE_QUESTION_TEXT';
export const addAnswer = createAction(ADD_ANSWER);
export const addQuestion = createAction(ADD_QUESTION);
export const resetNewBetEvent = createAction(RESET_NEW_BET_EVENT);
export const setNewBetEventName = createAction(SET_NEW_BET_EVENT_NAME);
export const setPersistingBetEvent = createAction(SET_PERSISTING_BET_EVENT);
export const updateAnswer = createAction(UPDATE_ANSWER);
export const updateManageTab = createAction(UPDATE_MANAGE_TAB);
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

export const persistBetEvent =
  (loginSnackbars) => async (dispatch, getState) => {
    const state = getState();
    const { newBetEvent } = state.betEvents;
    dispatch(setPersistingBetEvent(true));
    try {
      const result = await fetch(`${SUPERBETS_API_BASE_URL}/betevent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newBetEvent,
          createdBy: state.user.id
        })
      });
      const response = await result.json();
      if (!response || result.status !== 201) {
        loginSnackbars.current.show(
          createSnackbar(SNACKBAR_TYPES.ERROR, response.message)
        );
        dispatch(setPersistingBetEvent(false));
        return;
      } else {
        dispatch(setPersistingBetEvent(false));
        dispatch(resetNewBetEvent());
        dispatch(updateManageTab(ManageTab.CONFIRM));
        loginSnackbars.current.show(
          createSnackbar(
            SNACKBAR_TYPES.SUCCESS,
            `${response.name} has been created`
          )
        );
        return;
      }
    } catch (error) {
      loginSnackbars.current.show(
        createSnackbar(SNACKBAR_TYPES.ERROR, error.message)
      );
      dispatch(setPersistingBetEvent(false));
    }
  };
