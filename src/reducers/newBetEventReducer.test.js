import {
  addAnswer,
  addQuestion,
  resetNewBetEvent,
  setNewBetEventName,
  setPersistingBetEvent,
  updateAnswer,
  updateQuestionText
} from '../actions';
import newBetEvent, { initialState } from './newBetEventReducer';

describe('src/reducers/newBetEventReducer', () => {
  describe('user', () => {
    it('returns initial state', () => {
      const state = newBetEvent(undefined, {});
      expect(state).toEqual(initialState);
    });
    it('resets the newBetEvent with a RESET_NEW_BET_EVENT action', () => {
      const state = {
        newBetEvent: {
          name: 'World Cup',
          questions: [
            {
              questionId: 1,
              text: 'Who wins?',
              answers: [{ answerId: 1, text: 'France', odds: 0.5 }]
            }
          ]
        }
      };
      const action = resetNewBetEvent(true);
      const updatedState = newBetEvent(state, action);
      expect(updatedState.event).toEqual(initialState.event);
    });
    it('sets persistingBetEvent with a SET_PERSISTING_BET_EVENT action', () => {
      const state = {
        persistingBetEvent: false
      };
      const action = setPersistingBetEvent(true);
      const updatedState = newBetEvent(state, action);
      expect(updatedState.persistingBetEvent).toEqual(true);
    });
    it('updates newBetEvent name with a SET_NEW_BET_EVENT_NAME action', () => {
      const name = 'World Cup';
      const action = setNewBetEventName(name);
      const updatedState = newBetEvent(initialState, action);
      expect(updatedState.event.name).toEqual(name);
    });
    it('updates question text with an UPDATE_QUESTION_TEXT action', () => {
      const questionId = 2;
      const text = 'Who loses?';
      const state = {
        ...initialState,
        event: {
          ...initialState.event,
          questions: [...initialState.event.questions, { questionId: 2 }]
        }
      };
      const action = updateQuestionText({ questionId, text });
      const updatedState = newBetEvent(state, action);
      const updatedQuestion = updatedState.event.questions.find(
        (question) => question.questionId === questionId
      );
      expect(updatedQuestion.text).toEqual(text);
    });
    it('updates answer text with an UPDATE_ANSWER action', () => {
      const questionId = 1;
      const answerId = 2;
      const key = 'text';
      const value = 'Spain';
      const state = {
        event: {
          name: 'World Cup',
          questions: [
            {
              questionId: 1,
              text: 'Who wins?',
              answers: [
                { answerId: 1, text: 'France' },
                { answerId: 2, text: 'England' }
              ]
            },
            { questionId: 2 }
          ]
        }
      };
      const action = updateAnswer({
        questionId,
        answerId,
        key,
        value
      });
      const updatedState = newBetEvent(state, action);
      const updatedAnswer = updatedState.event.questions
        .find((question) => question.questionId === questionId)
        .answers.find((answer) => answer.answerId === answerId);
      expect(updatedAnswer.text).toEqual(value);
    });
    it('adds a question with an ADD_QUESTION action', () => {
      const action = addQuestion();
      const updatedState = newBetEvent(initialState, action);
      expect(updatedState.event.questions.length).toEqual(
        initialState.event.questions.length + 1
      );
    });
    it('adds an answer with an ADD_ANSWER action', () => {
      const questionId = 1;
      const action = addAnswer(questionId);
      const state = {
        ...initialState,
        event: {
          ...initialState.newBetEvent,
          questions: [...initialState.event.questions, { questionId: 2 }]
        }
      };
      const updatedState = newBetEvent(state, action);
      const updatedQuestion = updatedState.event.questions.find(
        (question) => question.questionId === questionId
      );
      expect(updatedQuestion.answers.length).toEqual(2);
    });
  });
});
