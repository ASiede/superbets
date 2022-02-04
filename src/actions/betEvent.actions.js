import { createAction } from 'redux-actions';
import { SNACKBAR_TYPES } from '../components/constants';
import { ManageTabType } from '../Types/StateTypes';
import { SUPERBETS_API_BASE_URL } from '../config';
import { createSnackbar } from '../utils/snackbar/Snackbar';

export const ADD_ANSWER = 'ADD_ANSWER';
export const ADD_QUESTION = 'ADD_QUESTION';
export const CONFIRM_ANSWER = 'CONFIRM_ANSWER';
export const RESET_CURRENT_BET_EVENT = 'RESET_CURRENT_BET_EVENT';
export const SET_EVENT = 'SET_EVENT';
export const SET_NEW_BET_EVENT_NAME = 'SET_NEW_BET_EVENT_NAME';
export const SET_PERSISTING_BET_EVENT = 'SET_PERSISTING_BET_EVENT';
export const UPDATE_ANSWER = 'UPDATE_ANSWER';
export const UPDATE_MANAGE_TAB = 'UPDATE_MANAGE_TAB';
export const UPDATE_ODDS = 'UPDATE_ODDS';
export const UPDATE_QUESTION_TEXT = 'UPDATE_QUESTION_TEXT';
export const addAnswer = createAction(ADD_ANSWER);
export const addQuestion = createAction(ADD_QUESTION);
export const confirmAnswer = createAction(CONFIRM_ANSWER);
export const resetCurrentBetEvent = createAction(RESET_CURRENT_BET_EVENT);
export const setEvent = createAction(SET_EVENT);
export const setNewBetEventName = createAction(SET_NEW_BET_EVENT_NAME);
export const setPersistingBetEvent = createAction(SET_PERSISTING_BET_EVENT);
export const updateAnswer = createAction(UPDATE_ANSWER);
export const updateManageTab = createAction(UPDATE_MANAGE_TAB);
export const updateOdds = createAction(UPDATE_ODDS);
export const updateQuestionText = createAction(UPDATE_QUESTION_TEXT);

export const persistNewEvent =
  (manageSnackbars) => async (dispatch, getState) => {
    const state = getState();
    const { selectedEvent } = state;
    dispatch(setPersistingBetEvent(true));
    try {
      const result = await fetch(`${SUPERBETS_API_BASE_URL}/betevent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...selectedEvent,
          createdBy: state.user.id
        })
      });
      const response = await result.json();
      if (!response || result.status !== 201) {
        manageSnackbars.current.show(
          createSnackbar(SNACKBAR_TYPES.ERROR, response.message)
        );
        dispatch(setPersistingBetEvent(false));
        return;
      } else {
        dispatch(setPersistingBetEvent(false));
        dispatch(setEvent(response));
        dispatch(updateManageTab(ManageTabType.CONFIRM));
        manageSnackbars.current.show(
          createSnackbar(
            SNACKBAR_TYPES.SUCCESS,
            `${response.name} has been created`
          )
        );
        return;
      }
    } catch (error) {
      manageSnackbars.current.show(
        createSnackbar(SNACKBAR_TYPES.ERROR, error.message)
      );
      dispatch(setPersistingBetEvent(false));
    }
  };

export const persistUpdatedEvent =
  (manageSnackbars) => async (dispatch, getState) => {
    const state = getState();
    const { selectedEvent } = state;
    const id = selectedEvent._id || selectedEvent.id;
    dispatch(setPersistingBetEvent(true));
    try {
      const result = await fetch(`${SUPERBETS_API_BASE_URL}/betevent/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...selectedEvent,
          id
        })
      });
      const response = await result.json();
      if (!response || result.status !== 201) {
        manageSnackbars.current.show(
          createSnackbar(SNACKBAR_TYPES.ERROR, response.message)
        );
        dispatch(setPersistingBetEvent(false));
        return;
      } else {
        dispatch(setPersistingBetEvent(false));
        dispatch(updateManageTab(ManageTabType.CONFIRM));
        manageSnackbars.current.show(
          createSnackbar(
            SNACKBAR_TYPES.SUCCESS,
            `${response.name} has been updated`
          )
        );
        return;
      }
    } catch (error) {
      manageSnackbars.current.show(
        createSnackbar(SNACKBAR_TYPES.ERROR, error.message)
      );
      dispatch(setPersistingBetEvent(false));
    }
  };
