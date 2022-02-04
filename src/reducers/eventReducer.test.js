import {
  addAnswer,
  addQuestion,
  resetCurrentBetEvent,
  setNewBetEventName,
  updateAnswer,
  updateQuestionText
} from '../actions';
import selectedEvent, { initialState } from './eventReducer';

describe('src/reducers/newBetEventReducer', () => {
  describe('user', () => {
    it('returns initial state', () => {
      const state = selectedEvent(undefined, {});
      expect(state).toEqual(initialState);
    });
    it('resets the newBetEvent with a RESET_CURRENT_BET_EVENT action', () => {
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
      const action = resetCurrentBetEvent(true);
      const updatedState = selectedEvent(state, action);
      expect(updatedState.event).toEqual(initialState.event);
    });
    it('updates newBetEvent name with a SET_NEW_BET_EVENT_NAME action', () => {
      const name = 'World Cup';
      const action = setNewBetEventName(name);
      const updatedState = selectedEvent(initialState, action);
      expect(updatedState.name).toEqual(name);
    });
    it('updates question text with an UPDATE_QUESTION_TEXT action', () => {
      const questionId = 2;
      const text = 'Who loses?';
      const state = {
        ...initialState,
        questions: [...initialState.questions, { questionId: 2 }]
      };
      const action = updateQuestionText({ questionId, text });
      const updatedState = selectedEvent(state, action);
      const updatedQuestion = updatedState.questions.find(
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
      };
      const action = updateAnswer({
        questionId,
        answerId,
        key,
        value
      });
      const updatedState = selectedEvent(state, action);
      const updatedAnswer = updatedState.questions
        .find((question) => question.questionId === questionId)
        .answers.find((answer) => answer.answerId === answerId);
      expect(updatedAnswer.text).toEqual(value);
    });
    it('adds a question with an ADD_QUESTION action', () => {
      const action = addQuestion();
      const updatedState = selectedEvent(initialState, action);
      expect(updatedState.questions.length).toEqual(
        initialState.questions.length + 1
      );
    });
    it('adds an answer with an ADD_ANSWER action', () => {
      const questionId = 1;
      const action = addAnswer(questionId);
      const state = {
        ...initialState,
        questions: [...initialState.questions, { questionId: 2 }]
      };
      const updatedState = selectedEvent(state, action);
      const updatedQuestion = updatedState.questions.find(
        (question) => question.questionId === questionId
      );
      expect(updatedQuestion.answers.length).toEqual(2);
    });
  });
});
