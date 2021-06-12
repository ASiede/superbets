import { SUPERBETS_API_BASE_URL } from '../config';
import { createAction } from 'redux-actions';

export const SET_BET_EVENTS = 'SET_BET_EVENTS';
export const setBetEvents = createAction(SET_BET_EVENTS);

// TODO: clean up
export const getOneBetEvent = () => async (dispatch) => {
  const response = await fetch(
    `${SUPERBETS_API_BASE_URL}/5e35eeeaf8dc2833c39c128b`
  );
  const newResponse = await response.json();
  dispatch(setBetEvents(newResponse));
};

// TODO: put where it belongs
export const getAllBetEvents = () => async (dispatch) => {
  const response = await fetch(`${SUPERBETS_API_BASE_URL}/betevent`);
  const newResponse = await response.json();
  dispatch(setBetEvents(newResponse.betEvents));
};

export const persistBetEvent = (variables) => async (dispatch) => {
  const questionKeys = Object.keys(variables).reduce((acc, cur) => {
    if (cur.includes('q') && !cur.includes(':')) {
      acc.push(cur);
    }
    return acc;
  }, []);
  const numberOfQuestions = questionKeys.length;
  const questions = [];
  for (let i = 0; i < numberOfQuestions; i++) {
    const answers = Object.keys(variables).reduce((acc, cur) => {
      if (cur.includes(`q${i}:a`) && !cur.includes('odds')) {
        acc.push({
          answerId: parseInt(cur.split(':')[1].substring(1)) + 1,
          text: variables[cur],
          odds: variables[`${cur}:odds`],
          confirmed: false
        });
      }
      return acc;
    }, []);
    questions.push({
      questionId: i + 1,
      text: variables[`q${i}`],
      answers
    });
  }
  const body = {
    name: variables.name,
    password: variables.password,
    questions: questions
  };
  // return body;
  await fetch(`${SUPERBETS_API_BASE_URL}/betevent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  // const newResponse = await response.json();
  // console.log('POSTING BET EVENT', newResponse);
  // TODO: on success and on failter
};
