import {
  SET_NEW_BET_EVENT_NAME,
  ADD_QUESTION,
  ADD_ANSWER,
  UPDATE_QUESTION_TEXT,
  UPDATE_ANSWER,
  SET_PERSISTING_BET_EVENT,
  RESET_NEW_BET_EVENT
} from '../actions/index';

export const initialState = {
  betEvents: [],
  persistingBetEvent: false,
  newBetEvent: {
    name: '',
    questions: [
      {
        questionId: 1,
        text: '',
        answers: [{ answerId: 1, text: '', odds: '', confirmed: false }]
      }
    ]
  }
};

export const betEvents = (state = initialState, { type, payload }) => {
  switch (type) {
    case RESET_NEW_BET_EVENT:
      return {
        ...state,
        newBetEvent: {
          name: '',
          questions: [
            {
              questionId: 1,
              text: '',
              answers: [{ answerId: 1, text: '', odds: '', confirmed: false }]
            }
          ]
        }
      };
    case SET_PERSISTING_BET_EVENT:
      return {
        ...state,
        persistingBetEvent: payload
      };
    case SET_NEW_BET_EVENT_NAME:
      return {
        ...state,
        newBetEvent: { ...state.newBetEvent, name: payload }
      };
    case UPDATE_QUESTION_TEXT: {
      const { questionId, text } = payload;
      const questionsWithUpdatedText = state.newBetEvent.questions.map(
        (question) => {
          if (question.questionId === questionId) {
            return {
              ...question,
              text: text
            };
          } else return question;
        }
      );
      return {
        ...state,
        newBetEvent: {
          ...state.newBetEvent,
          questions: questionsWithUpdatedText
        }
      };
    }
    case UPDATE_ANSWER: {
      const questionsWithUpdatedAnswer = state.newBetEvent.questions.map(
        (question) => {
          if (question.questionId === payload.questionId) {
            const updatedAnswers = question.answers.map((answer) => {
              if (answer.answerId === payload.answerId) {
                return {
                  ...answer,
                  [payload.key]: payload.value
                };
              } else return answer;
            });
            return {
              ...question,
              answers: updatedAnswers
            };
          } else return question;
        }
      );
      return {
        ...state,
        newBetEvent: {
          ...state.newBetEvent,
          questions: questionsWithUpdatedAnswer
        }
      };
    }
    case ADD_QUESTION: {
      const questionsLength = state.newBetEvent.questions.length;
      const updatedQuestions = [
        ...state.newBetEvent.questions,
        {
          questionId: questionsLength + 1,
          text: '',
          answers: [{ answerId: 1, text: '', odds: '', confirmed: false }]
        }
      ];
      return {
        ...state,
        newBetEvent: {
          ...state.newBetEvent,
          questions: updatedQuestions
        }
      };
    }
    case ADD_ANSWER: {
      const answersLength = state.newBetEvent.questions.find(
        (question) => question.questionId === payload
      ).answers.length;
      return {
        ...state,
        newBetEvent: {
          ...state.newBetEvent,
          questions: state.newBetEvent.questions.map((question) => {
            if (question.questionId === payload) {
              return {
                ...question,
                answers: [
                  ...question.answers,
                  {
                    answerId: answersLength + 1,
                    text: '',
                    odds: '',
                    confirmed: false
                  }
                ]
              };
            } else return question;
          })
        }
      };
    }
    default:
      return state;
  }
};

export default betEvents;
