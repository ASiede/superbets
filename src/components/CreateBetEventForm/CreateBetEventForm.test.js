import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import CreateBetEventForm from './CreateBetEventForm';
import { setNewBetEventName } from '../../actions';
import BetEventFormQuestion from '../BetEventFormQuestion/BetEventFormQuestion';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Messages } from 'primereact/messages';

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
    questions: [
      {
        questionId: 1,
        answers: [{ answerId: 1 }]
      },
      {
        questionId: 2,
        answers: [{ answerId: 1 }]
      }
    ]
  };
  it('renders 1 Button, 1 InputText, 1 Messages, and 2 BetEventFormQuestion', () => {
    const store = mockStore({
      betEvents: {
        newBetEvent: mockNewBetEvent
      }
    });
    const wrapper = mount(
      <Provider store={store}>
        <CreateBetEventForm />
      </Provider>
    );
    const button = wrapper.find(Button);
    const inputText = wrapper.find(InputText);
    const messages = wrapper.find(Messages);
    const betEventFormQuestion = wrapper.find(BetEventFormQuestion);
    expect(button.length).toBeGreaterThan(1);
    expect(inputText.length).toBeGreaterThan(0);
    expect(betEventFormQuestion.length).toEqual(2);
    expect(messages.length).toEqual(1);
  });
  it('renders 1 Spinner when persistingBetEvent is true', () => {
    const store = mockStore({
      persistingBetEvent: true,
      betEvents: {
        newBetEvent: {
          questions: []
        }
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
      betEvents: {
        newBetEvent: mockNewBetEvent
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
      betEvents: {
        newBetEvent: mockNewBetEvent
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
});
