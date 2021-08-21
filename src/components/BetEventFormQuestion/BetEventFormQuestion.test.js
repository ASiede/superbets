import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import BetEventFormQuestion from './BetEventFormQuestion';
import BetEventFormAnswer from '../BetEventFormAnswer/BetEventFormAnswer';
import { addQuestion, updateAnswer, updateQuestionText } from '../../actions';

const mockStore = configureMockStore([thunk]);
const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
  const original = jest.requireActual('react-redux');
  return {
    ...original,
    useDispatch: () => mockDispatch
  };
});

describe('BetEventFormQuestion', () => {
  const questionId = 1;
  const store = mockStore({
    betEvents: {
      newBetEvent: {
        questions: [
          {
            questionId: 1,
            answers: [{ answerId: 1 }, { answerId: 2 }]
          }
        ]
      }
    }
  });
  const wrapper = mount(
    <Provider store={store}>
      <BetEventFormQuestion questionId={questionId} />
    </Provider>
  );
  it('renders 1 Button, 1 InputText, and 2 BetEventFormAnswer', () => {
    const button = wrapper.find(Button);
    const inputText = wrapper.find(InputText);
    const betEventFormAnswer = wrapper.find(BetEventFormAnswer);
    expect(button.length).toBeGreaterThan(1);
    expect(inputText.length).toBeGreaterThan(0);
    expect(betEventFormAnswer.length).toEqual(2);
  });
  it('dispatches addQuestion on button click', () => {
    wrapper.find(Button).at(0).simulate('click');
    expect(mockDispatch).toHaveBeenCalledWith(addQuestion());
  });
  it('dispatches updateQuestionText on question input change', () => {
    const mockValue = 'Who wins?';
    wrapper
      .find(InputText)
      .at(0)
      .simulate('change', { target: { value: mockValue } });
    expect(mockDispatch).toHaveBeenCalledWith(
      updateQuestionText({
        questionId,
        text: mockValue
      })
    );
  });
});
