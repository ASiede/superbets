import { createAction } from 'redux-actions';
import { setPersistingBetEvent } from '.';
import { TOAST_TYPES } from '../components/constants';
import { SUPERBETS_API_BASE_URL } from '../config';
import { EventAnswerType, EventQuestionType, StateType } from '../Types';
import { createToast } from '../utils/toast/Toast';

export const UPDATE_BETTOR = 'UPDATE_BETTOR';
export const CLEAR_BETTOR = 'CLEAR_BETTOR';
export const updateBettor = createAction(UPDATE_BETTOR);
export const clearBettor = createAction(CLEAR_BETTOR);

export const persistSubmission = () => async (dispatch: any, getState: any) => {
  const state: StateType = getState();
  const { selectedEvent, bettor, toast } = state;
  dispatch(setPersistingBetEvent(true));
  const bets = selectedEvent?.questions?.reduce(
    (acc: any, cur: EventQuestionType) => {
      const guessedAnswer = cur.answers.find(
        (answer: EventAnswerType) => !!answer.guessed
      );
      acc.push({
        questionId: cur.questionId,
        answerId: guessedAnswer?.answerId
      });
      return acc;
    },
    []
  );
  try {
    const result = await fetch(`${SUPERBETS_API_BASE_URL}/submission`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bettor,
        betEvent: selectedEvent?._id,
        bets
      })
    });
    const response = await result.json();
    if (!response || result.status !== 201) {
      toast?.current?.show(createToast(TOAST_TYPES.ERROR, response.message));
      dispatch(setPersistingBetEvent(false));
      return;
    } else {
      dispatch(setPersistingBetEvent(false));
      // TODO: move to leaderboard tab
      toast?.current?.show(
        createToast(TOAST_TYPES.SUCCESS, `Submission successful`)
      );
      return;
    }
  } catch (error: any) {
    toast?.current?.show(createToast(TOAST_TYPES.ERROR, error.message));
    dispatch(setPersistingBetEvent(false));
  }
};
