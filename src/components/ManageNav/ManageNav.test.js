import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { updateManageTab } from '../../actions';
import mockedStore from '../../__mocks__/mockedStore';
import ManageNav from './ManageNav';
import { MANAGE_TABS } from '../constants';

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

describe('ManageNav', () => {
  it('renders a nav with three selections', () => {
    const store = mockStore({ mockedStore });
    const wrapper = mount(
      <Provider store={store}>
        <ManageNav />
      </Provider>
    );
    const nav = wrapper.find('nav');
    const p = wrapper.find('p');
    expect(nav.length).toBe(1);
    expect(p.length).toBe(3);
  });
  it('dispatches updateManageTab with create tab', () => {
    const store = mockStore({ mockedStore });
    const wrapper = mount(
      <Provider store={store}>
        <ManageNav />
      </Provider>
    );
    wrapper.find('p').at(0).simulate('click');
    expect(mockDispatch).toHaveBeenCalledWith(
      updateManageTab(MANAGE_TABS.CREATE)
    );
  });
  it('dispatches updateManageTab with confirm tab', () => {
    const store = mockStore({ mockedStore });
    const wrapper = mount(
      <Provider store={store}>
        <ManageNav />
      </Provider>
    );
    wrapper.find('p').at(1).simulate('click');
    expect(mockDispatch).toHaveBeenCalledWith(
      updateManageTab(MANAGE_TABS.CONFIRM)
    );
  });
  it('dispatches updateManageTab with edit tab', () => {
    const store = mockStore({ mockedStore });
    const wrapper = mount(
      <Provider store={store}>
        <ManageNav />
      </Provider>
    );
    wrapper.find('p').at(2).simulate('click');
    expect(mockDispatch).toHaveBeenCalledWith(
      updateManageTab(MANAGE_TABS.EDIT)
    );
  });
});
