import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ConfirmAnswers from './ConfirmAnswers';
import mockedStore from '../../__mocks__/mockedStore';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import Event from '../Event/Event';
import { InputText } from 'primereact/inputtext';
import { setEvent } from '../../actions';
import { EventMode } from '../../Types';

const mockStore = configureMockStore([thunk]);
const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
  const original = jest.requireActual('react-redux');
  return {
    ...original,
    useDispatch: () => mockDispatch
  };
});

const mockWriteText = jest.fn();
Object.assign(navigator, {
  clipboard: {
    writeText: mockWriteText
  }
});

jest.mock('../../actions');

beforeEach(() => {
  jest.resetAllMocks();
});

describe('ConfirmAnswers', () => {
  it('renders 1 Drop down prior to event selection', () => {
    const store = mockStore({ ...mockedStore, selectedEvent: null });
    const mockSnackBars: any = [];
    const wrapper = mount(
      <Provider store={store}>
        <ConfirmAnswers manageSnackbars={mockSnackBars} />
      </Provider>
    );
    const dropdown = wrapper.find(Dropdown);
    expect(dropdown.length).toBe(1);
  });
  it('renders 1 Event, 2 Input Text, 3 Button after to event selection', () => {
    const store = mockStore({
      ...mockedStore,
      selectedEvent: { name: 'superbowl' }
    });
    const mockSnackBars: any = [];
    const wrapper = mount(
      <Provider store={store}>
        <ConfirmAnswers manageSnackbars={mockSnackBars} />
      </Provider>
    );
    const event = wrapper.find(Event);
    const inputText = wrapper.find(InputText);
    const button = wrapper.find(Button);
    expect(event.length).toBe(1);
    expect(inputText.length).toBe(2);
    expect(button.length).toBeGreaterThanOrEqual(3);
  });

  it('dispatches setEvent on dropdown change', () => {
    const store = mockStore({
      ...mockedStore,
      user: { events: [{ name: 'superbowl' }] }
    });
    const mockSnackBars: any = [];
    const mockValue: any = 'superbowl';
    const wrapper: any = mount(
      <Provider store={store}>
        <ConfirmAnswers manageSnackbars={mockSnackBars} />
      </Provider>
    );
    wrapper.find(Dropdown).at(0).props().onChange({ value: mockValue });
    expect(mockDispatch).toHaveBeenCalled();
    expect(setEvent).toHaveBeenCalledWith(mockValue, EventMode.CONFIRM);
  });

  it('copies to clipboard', () => {
    const store = mockStore({
      ...mockedStore,
      selectedEvent: { name: 'superbowl' }
    });
    const mockSnackBars: any = [];
    const wrapper: any = mount(
      <Provider store={store}>
        <ConfirmAnswers manageSnackbars={mockSnackBars} />
      </Provider>
    );
    wrapper.find(Button).at(1).props().onClick();
    wrapper.find(Button).at(2).props().onClick();
    expect(mockWriteText).toHaveBeenCalledTimes(2);
    expect(mockWriteText).toHaveBeenCalledWith(expect.anything());
  });
});
