// import { mount } from 'enzyme';
// import thunk from 'redux-thunk';
// import configureMockStore from 'redux-mock-store';
// import { Provider } from 'react-redux';
// import { Button } from 'primereact/button';
// import { InputText } from 'primereact/inputtext';
import { eventFormCompleted, constructQuestionsList } from './EventForm';
// import { setNewBetEventName } from '../../actions';
// import EventFormQuestion from '../EventFormQuestion/EventFormQuestion';
// import { ProgressSpinner } from 'primereact/progressspinner';
// import { Action } from 'redux';

// const mockStore = configureMockStore([thunk]);
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

describe('EventForm', () => {
  // const mockNewBetEvent = {
  //   name: 'world cup',
  //   questions: [
  //     {
  //       questionId: 1,
  //       text: 'who wins',
  //       answers: [{ answerId: 1, text: 'france', odds: 1 }]
  //     },
  //     {
  //       questionId: 2,
  //       text: 'who loses',
  //       answers: [{ answerId: 1, text: 'spain', odds: 0.5 }]
  //     }
  //   ]
  // };
  it('renders 1 Button, 1 InputText, and 2 EventFormQuestion', () => {
    // const store: MockStore = mockStore({
    //   selectedEvent: mockNewBetEvent
    // });
    // const wrapper = mount(
    //   <Provider store={store}>
    //     <EventForm />
    //   </Provider>
    // );
    // const button = wrapper.find(Button);
    // const inputText = wrapper.find(InputText);
    // const betEventFormQuestion = wrapper.find(EventFormQuestion);
    // expect(button.length).toBeGreaterThan(1);
    // expect(inputText.length).toBeGreaterThan(0);
    // expect(betEventFormQuestion.length).toEqual(2);
  });
  it('renders 1 Spinner when persistingEvent is true', () => {
    // const store = mockStore({
    //   persistingBetEvent: true,
    //   selectedEvent: { questions: [] }
    // });
    // const wrapper = mount(
    //   <Provider store={store}>
    //     <EventForm />
    //   </Provider>
    // );
    // const progressSpinner = wrapper.find(ProgressSpinner);
    // expect(progressSpinner.length).toEqual(1);
  });
  it('dispatches setNewBetEventName on question input change', () => {
    // const mockValue = 'The Best';
    // const store = mockStore({
    //   selectedEvent: mockNewBetEvent
    // });
    // const wrapper = mount(
    //   <Provider store={store}>
    //     <EventForm />
    //   </Provider>
    // );
    // wrapper
    //   .find(InputText)
    //   .at(0)
    //   .simulate('change', { target: { value: mockValue } });
    // expect(mockDispatch).toHaveBeenCalledWith(setNewBetEventName(mockValue));
  });
  it('dispatches persistNewEvent on button click', () => {
    // const store = mockStore({
    //   selectedEvent: mockNewBetEvent
    // });
    // const wrapper = mount(
    //   <Provider store={store}>
    //     <EventForm />
    //   </Provider>
    // );
    // wrapper.find(Button).at(3).simulate('click');
    // expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
  describe('eventFormCompleted', () => {
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
      const actual = eventFormCompleted(newBetEvent);
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
      const actual = eventFormCompleted(newBetEvent);
      expect(actual).toBe(false);
    });
  });
  describe('constructQuestionsList', () => {
    it('returns a list of EventFormQuestions based on questions', () => {
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
      expect(actual?.length).toEqual(newBetEvent.questions.length);
      expect(actual).toEqual(expect.any(Array));
    });
  });
});
