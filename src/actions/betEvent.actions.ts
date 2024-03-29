import { createAction } from 'redux-actions';
import { ROUTES, TOAST_TYPES } from '../components/constants';
import { EventType, EventMode, StateType } from '../Types';
import { SUPERBETS_API_BASE_URL } from '../config';
import { createToast } from '../utils/toast/Toast';
import { history } from '../components/App/App';

export const ADD_ANSWER = 'ADD_ANSWER';
export const ADD_QUESTION = 'ADD_QUESTION';
export const SELECT_ANSWER = 'SELECT_ANSWER';
export const RESET_CURRENT_BET_EVENT = 'RESET_CURRENT_BET_EVENT';
export const SET_EVENT_MODE = 'SET_EVENT_MODE';
export const SET_SELECTED_EVENT = 'SET_SELECTED_EVENT';
export const SET_NEW_BET_EVENT_NAME = 'SET_NEW_BET_EVENT_NAME';
export const SET_PERSISTING_BET_EVENT = 'SET_PERSISTING_BET_EVENT';
export const UPDATE_ANSWER = 'UPDATE_ANSWER';
export const UPDATE_MANAGE_TAB = 'UPDATE_MANAGE_TAB';
export const UPDATE_ODDS = 'UPDATE_ODDS';
export const UPDATE_QUESTION_TEXT = 'UPDATE_QUESTION_TEXT';
export const addAnswer = createAction(ADD_ANSWER);
export const addQuestion = createAction(ADD_QUESTION);
export const selectAnswer = createAction(SELECT_ANSWER);
export const resetCurrentBetEvent = createAction(RESET_CURRENT_BET_EVENT);
export const setEventMode = createAction(SET_EVENT_MODE);
export const setSelecteEvent = createAction(SET_SELECTED_EVENT);
export const setNewBetEventName = createAction(SET_NEW_BET_EVENT_NAME);
export const setPersistingBetEvent = createAction(SET_PERSISTING_BET_EVENT);
export const updateAnswer = createAction(UPDATE_ANSWER);
export const updateOdds = createAction(UPDATE_ODDS);
export const updateQuestionText = createAction(UPDATE_QUESTION_TEXT);

export const persistNewEvent = () => async (dispatch: any, getState: any) => {
  const state = getState();
  const { selectedEvent, toast } = state;
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
      toast?.current?.show(createToast(TOAST_TYPES.ERROR, response.message));
      dispatch(setPersistingBetEvent(false));
      return;
    } else {
      dispatch(setPersistingBetEvent(false));
      dispatch(setEvent(response, EventMode.CONFIRM));
      history.push(`/${ROUTES.CONFIRM}`);
      toast?.current?.show(
        createToast(TOAST_TYPES.SUCCESS, `${response.name} has been created`)
      );
      return;
    }
  } catch (error: any) {
    toast?.current?.show(createToast(TOAST_TYPES.ERROR, error.message));
    dispatch(setPersistingBetEvent(false));
  }
};

export const persistUpdatedEvent =
  () => async (dispatch: any, getState: any) => {
    const state: StateType = getState();
    const { selectedEvent, toast } = state;
    const id = selectedEvent?._id;
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
        toast?.current?.show(createToast(TOAST_TYPES.ERROR, response.message));
        dispatch(setPersistingBetEvent(false));
        return;
      } else {
        dispatch(setPersistingBetEvent(false));
        history.push(`/${ROUTES.CONFIRM}`);
        toast?.current?.show(
          createToast(TOAST_TYPES.SUCCESS, `${response.name} has been updated`)
        );
        return;
      }
    } catch (error: any) {
      toast?.current?.show(createToast(TOAST_TYPES.ERROR, error.message));
      dispatch(setPersistingBetEvent(false));
    }
  };

export const setEvent =
  (event: EventType, mode: EventMode) => (dispatch: any) => {
    dispatch(setSelecteEvent(event));
    dispatch(setEventMode(mode));
  };
