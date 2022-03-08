import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Manage from './Manage';
import LogIn from '../LogIn/LogIn';
import { EventForm } from '../EventForm/EventForm';
import mockedStore from '../../__mocks__/mockedStore';
import ConfirmAnswers from '../ConfirmAnswers/ConfirmAnswers';
import { SelectButton } from 'primereact/selectbutton';
import { Dropdown } from 'primereact/dropdown';
import { setEvent, setEventMode } from '../../actions';
import { SubmitBet } from '../SubmitBet/SubmitBet';
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

jest.mock('../../actions');

describe('src/components/Mangage', () => {
  it('renders a LogIn component when not logged in', () => {
    const store = mockStore({ ...mockedStore, user: { loggedIn: false } });
    const wrapper = mount(
      <Provider store={store}>
        <Manage />
      </Provider>
    );
    const logIn = wrapper.find(LogIn);
    expect(logIn.length).toEqual(1);
  });

  it('renders SelectButton, Dropdown, and EventForm when tab is CREATE and mode is EDIT', () => {
    const store = mockStore({
      ...mockedStore,
      user: { loggedIn: true },
      eventMode: EventMode.EDIT
    });
    const mockEvent = { name: 'mockEvent' };
    const mode = EventMode.NEW;
    const wrapper = mount(
      <Provider store={store}>
        <Manage />
      </Provider>
    );
    const selectButton: any = wrapper.find(SelectButton);
    const dropdown: any = wrapper.find(Dropdown);
    const eventForm = wrapper.find(EventForm);
    expect(selectButton.length).toEqual(1);
    expect(dropdown.length).toEqual(1);
    expect(eventForm.length).toEqual(1);

    selectButton.props().onChange({ value: mode });
    expect(setEventMode).toHaveBeenCalledWith(mode);

    dropdown.props().onChange({ value: mockEvent });
    expect(setEvent).toHaveBeenCalledWith(mockEvent, EventMode.EDIT);
  });

  it('renders SelectButton and EventForm when tab is CREATE and mode is NEW', () => {
    const store = mockStore({
      ...mockedStore,
      user: { loggedIn: true },
      eventMode: EventMode.NEW
    });
    const wrapper = mount(
      <Provider store={store}>
        <Manage />
      </Provider>
    );
    const selectButton = wrapper.find(SelectButton);
    const dropdown = wrapper.find(Dropdown);
    const eventForm = wrapper.find(EventForm);
    expect(selectButton.length).toEqual(1);
    expect(dropdown.length).toEqual(0);
    expect(eventForm.length).toEqual(1);
  });

  it('renders a ConfirmAnswers component when tab is CONFIRM', () => {
    const store = mockStore({
      ...mockedStore,
      user: { loggedIn: true }
    });
    const wrapper = mount(
      <Provider store={store}>
        <Manage />
      </Provider>
    );
    const confirmAnswers = wrapper.find(ConfirmAnswers);
    expect(confirmAnswers.length).toEqual(1);
  });

  it('renders SubmitBet component when tab is SUBMIT_BET', () => {
    const store = mockStore({
      ...mockedStore,
      user: { loggedIn: true }
    });
    const wrapper = mount(
      <Provider store={store}>
        <Manage />
      </Provider>
    );
    const submitBet = wrapper.find(SubmitBet);
    expect(submitBet.length).toEqual(1);
  });

  it('renders ConfirmAnswers component when tab is undefined', () => {
    const store = mockStore({
      ...mockedStore,
      user: { loggedIn: true }
    });
    const wrapper = mount(
      <Provider store={store}>
        <Manage />
      </Provider>
    );
    const confirmAnswers = wrapper.find(ConfirmAnswers);
    expect(confirmAnswers.length).toEqual(1);
  });
});
