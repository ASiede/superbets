import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import mockedStore from '../../__mocks__/mockedStore';
import { Button } from 'primereact/button';
import Event from '../Event/Event';
import { persistSubmission, persistUpdatedEvent } from '../../actions';
import { EventMode } from '../../Types';
import EventQuestion from '../EventQuestion/EventQuestion';

const mockStore = configureMockStore([thunk]);
const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
  const original = jest.requireActual('react-redux');
  return {
    ...original,
    useDispatch: () => mockDispatch
  };
});

jest.mock('../../actions');

beforeEach(() => {
  jest.resetAllMocks();
});

describe('Event', () => {
  it('renders 1 Button', () => {
    const store = mockStore({
      ...mockedStore,
      selectedEvent: {
        name: 'superbowl',
        questions: [
          {
            questionId: 1,
            text: 'What Color?',
            answers: [{ answerId: 1, text: 'blue' }]
          }
        ]
      }
    });
    const wrapper = mount(
      <Provider store={store}>
        <Event />
      </Provider>
    );
    const button = wrapper.find(Button);
    const eventQuestion = wrapper.find(EventQuestion);
    expect(button.length).toBe(1);
    expect(eventQuestion.length).toBe(1);
  });
  it('calls handleButtonClick on button click', () => {
    const store = mockStore({ ...mockedStore, eventMode: EventMode.GUESS });
    const wrapper: any = mount(
      <Provider store={store}>
        <Event />
      </Provider>
    );
    wrapper.find(Button).props().onClick();
    expect(mockDispatch).toBeCalledTimes(1);
    expect(persistSubmission).toBeCalled();
  });
  it('calls handleButtonClick on button click', () => {
    const store = mockStore({ ...mockedStore, eventMode: EventMode.CONFIRM });
    const wrapper: any = mount(
      <Provider store={store}>
        <Event />
      </Provider>
    );
    wrapper.find(Button).props().onClick();
    expect(mockDispatch).toBeCalledTimes(1);
    expect(persistUpdatedEvent).toBeCalled();
  });
});
