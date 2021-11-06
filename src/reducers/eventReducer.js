import {
  SET_NEW_BET_EVENT_NAME,
  ADD_QUESTION,
  ADD_ANSWER,
  UPDATE_QUESTION_TEXT,
  UPDATE_ANSWER,
  RESET_NEW_BET_EVENT,
  SET_EVENT,
  CONFIRM_ANSWER
} from '../actions/index';

export const initialState = {
  name: '',
  questions: [
    {
      questionId: 1,
      text: '',
      answers: [{ answerId: 1, text: '', odds: undefined, confirmed: false }]
    }
  ]
};

export const selectedEvent = (state = initialState, { type, payload }) => {
  switch (type) {
    case RESET_NEW_BET_EVENT:
      return {
        name: '',
        questions: [
          {
            questionId: 1,
            text: '',
            answers: [
              { answerId: 1, text: '', odds: undefined, confirmed: false }
            ]
          }
        ]
      };
    case SET_EVENT: {
      return {
        ...payload
      };
    }
    case SET_NEW_BET_EVENT_NAME:
      return {
        ...state,
        name: payload
      };
    case UPDATE_QUESTION_TEXT: {
      const { questionId, text } = payload;
      const questionsWithUpdatedText = state.questions.map((question) => {
        if (question.questionId === questionId) {
          return {
            ...question,
            text: text
          };
        } else return question;
      });
      return {
        ...state,
        questions: questionsWithUpdatedText
      };
    }
    case UPDATE_ANSWER: {
      const questionsWithUpdatedAnswer = state.questions.map((question) => {
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
      });
      return {
        ...state,
        questions: questionsWithUpdatedAnswer
      };
    }
    case CONFIRM_ANSWER: {
      const questionsWithUpdatedAnswer = state.questions.map((question) => {
        if (question.questionId === payload.questionId) {
          const updatedAnswers = question.answers.map((answer) => {
            if (answer.answerId === payload.answerId) {
              return {
                ...answer,
                confirmed: !answer.confirmed
              };
            } else return { ...answer, confirmed: false };
          });
          return {
            ...question,
            answers: updatedAnswers
          };
        } else return question;
      });
      return {
        ...state,
        questions: questionsWithUpdatedAnswer
      };
    }
    case ADD_QUESTION: {
      const questionsLength = state.questions.length;
      const updatedQuestions = [
        ...state.questions,
        {
          questionId: questionsLength + 1,
          text: '',
          answers: [
            { answerId: 1, text: '', odds: undefined, confirmed: false }
          ]
        }
      ];
      return {
        ...state,
        questions: updatedQuestions
      };
    }
    case ADD_ANSWER: {
      const answersLength = state.questions.find(
        (question) => question.questionId === payload
      ).answers.length;
      return {
        ...state,
        questions: state.questions.map((question) => {
          if (question.questionId === payload) {
            return {
              ...question,
              answers: [
                ...question.answers,
                {
                  answerId: answersLength + 1,
                  text: '',
                  odds: undefined,
                  confirmed: false
                }
              ]
            };
          } else return question;
        })
      };
    }
    default:
      return state;
  }
};

export default selectedEvent;
