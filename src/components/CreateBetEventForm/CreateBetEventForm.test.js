import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import CreateBetEventForm, {
  betEventFormCompleted,
  constructQuestionsList
} from './CreateBetEventForm';
import { setNewBetEventName } from '../../actions';
import BetEventFormQuestion from '../BetEventFormQuestion/BetEventFormQuestion';
import { ProgressSpinner } from 'primereact/progressspinner';

const mockStore = configureMockStore([thunk]);
const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
  const original = jest.requireActual('react-redux');
  return {
    ...original,
    useDispatch: () => mockDispatch
  };
});

beforeEach(() => {
  jest.resetAllMocks();
});

describe('CreateBetEventForm', () => {
  const mockNewBetEvent = {
    name: 'world cup',
    questions: [
      {
        questionId: 1,
        text: 'who wins',
        answers: [{ answerId: 1, text: 'france', odds: 1 }]
      },
      {
        questionId: 2,
        text: 'who loses',
        answers: [{ answerId: 1, text: 'spain', odds: 0.5 }]
      }
    ]
  };
  it('renders 1 Button, 1 InputText, and 2 BetEventFormQuestion', () => {
    const store = mockStore({
      newBetEvent: {
        event: mockNewBetEvent
      }
    });
    const wrapper = mount(
      <Provider store={store}>
        <CreateBetEventForm />
      </Provider>
    );
    const button = wrapper.find(Button);
    const inputText = wrapper.find(InputText);
    const betEventFormQuestion = wrapper.find(BetEventFormQuestion);
    expect(button.length).toBeGreaterThan(1);
    expect(inputText.length).toBeGreaterThan(0);
    expect(betEventFormQuestion.length).toEqual(2);
  });
  it('renders 1 Spinner when persistingBetEvent is true', () => {
    const store = mockStore({
      newBetEvent: {
        persistingBetEvent: true,
        event: { questions: [] }
      }
    });
    const wrapper = mount(
      <Provider store={store}>
        <CreateBetEventForm />
      </Provider>
    );
    const progressSpinner = wrapper.find(ProgressSpinner);
    expect(progressSpinner.length).toEqual(1);
  });
  it('dispatches setNewBetEventName on question input change', () => {
    const mockValue = 'The Best';
    const store = mockStore({
      newBetEvent: {
        event: mockNewBetEvent
      }
    });
    const wrapper = mount(
      <Provider store={store}>
        <CreateBetEventForm />
      </Provider>
    );
    wrapper
      .find(InputText)
      .at(0)
      .simulate('change', { target: { value: mockValue } });
    expect(mockDispatch).toHaveBeenCalledWith(setNewBetEventName(mockValue));
  });
  it('dispatches persistBetEvent on button click', () => {
    const store = mockStore({
      newBetEvent: {
        event: mockNewBetEvent
      }
    });
    const wrapper = mount(
      <Provider store={store}>
        <CreateBetEventForm />
      </Provider>
    );
    wrapper.find(Button).at(3).simulate('click');
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
  describe('betEventFormCompleted', () => {
    it('returns true when all the elements of the form are filled in', () => {
      const newBetEvent = {
        name: 'world cup',
        questions: [
          {
            questionId: 1,
            text: 'who wins',
            answers: [{ answerId: 1, text: 'france', odds: 1 }]
          },
          {
            questionId: 2,
            text: 'who loses',
            answers: [{ answerId: 1, text: 'spain', odds: 0.5 }]
          }
        ]
      };
      const actual = betEventFormCompleted(newBetEvent);
      expect(actual).toBe(true);
    });
    it('returns false when all the elements of the form are not filled in', () => {
      const newBetEvent = {
        name: 'world cup',
        questions: [
          {
            questionId: 1,
            text: 'who wins',
            answers: [{ answerId: 1, text: 'france', odds: 1 }]
          },
          {
            questionId: 2,
            text: 'who loses',
            answers: [{ answerId: 1, text: 'spain', odds: undefined }]
          }
        ]
      };
      const actual = betEventFormCompleted(newBetEvent);
      expect(actual).toBe(false);
    });
  });
  describe('constructQuestionsList', () => {
    it('returns a list of BetEventFormQuestions based on questions', () => {
      const newBetEvent = {
        name: 'world cup',
        questions: [
          {
            questionId: 1,
            text: 'who wins',
            answers: [{ answerId: 1, text: 'france', odds: 1 }]
          },
          {
            questionId: 2,
            text: 'who loses',
            answers: [{ answerId: 1, text: 'spain', odds: 0.5 }]
          }
        ]
      };
      const actual = constructQuestionsList(newBetEvent);
      expect(actual.length).toEqual(newBetEvent.questions.length);
      expect(actual).toEqual(expect.any(Array));
    });
  });
});
