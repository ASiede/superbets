import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ConfirmAnswers from './ConfirmAnswers';
import mockedStore from '../../__mocks__/mockedStore';

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

describe('ConfirmAnswers', () => {
  it('renders 1 Button, 1 InputText, 1 Messages, and 2 BetEventFormQuestion', () => {
    const store = mockStore(mockedStore);
    const wrapper = mount(
      <Provider store={store}>
        <ConfirmAnswers />
      </Provider>
    );
    const div = wrapper.find('div');
    expect(div.length).toBe(1);
  });
});
