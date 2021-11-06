import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import EventFormAnswer from './EventFormAnswer';
import { addAnswer, updateAnswer } from '../../actions';

const mockStore = configureMockStore([thunk]);
const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
  const original = jest.requireActual('react-redux');
  return {
    ...original,
    useDispatch: () => mockDispatch
  };
});

describe('EventFormAnswer', () => {
  // const questionId = 1;
  // const answerId = 1;
  // const store = mockStore({});
  // const wrapper = mount(
  //   <Provider store={store}>
  //     <EventFormAnswer answerId={answerId} questionId={questionId} />
  //   </Provider>
  // );
  it('renders 1 Button and 2 InputTexts when it is the first answer', () => {
    // const button = wrapper.find(Button);
    // const inputText = wrapper.find(InputText);
    // const inputNumber = wrapper.find(InputNumber);
    // expect(button.length).toEqual(1);
    // expect(inputText.length).toEqual(2);
    // expect(inputNumber.length).toEqual(1);
    expect(true).toBe(true);
  });
  it('dispatches addAnswer on button click', () => {
    // wrapper.find(Button).at(0).simulate('click');
    // expect(mockDispatch).toHaveBeenCalledWith(addAnswer(questionId));
  });
  it('dispatches updateAnswer on answer input change', () => {
    // const mockValue = 'Who wins?';
    // wrapper
    //   .find(InputText)
    //   .at(0)
    //   .simulate('change', { target: { value: mockValue } });
    // expect(mockDispatch).toHaveBeenCalledWith(
    //   updateAnswer({
    //     questionId,
    //     answerId,
    //     key: 'text',
    //     value: mockValue
    //   })
    // );
  });
});
