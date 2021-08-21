import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import Manage from './Manage';
import ManageNav from '../ManageNav/ManageNav';
import LogIn from '../LogIn/LogIn';
import CreateBetEventForm from '../CreateBetEventForm/CreateBetEventForm';
import mockedStore from '../../__mocks__/mockedStore';

const mockStore = configureMockStore([thunk]);

describe('src/components/Mangage', () => {
  it('renders a ManageNav and LogIn when not logged in', () => {
    const store = mockStore({ ...mockedStore, user: { loggedIn: false } });
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <Manage />
        </Router>
      </Provider>
    );
    const manageNav = wrapper.find(ManageNav);
    const logIn = wrapper.find(LogIn);
    const createBetEventForm = wrapper.find(CreateBetEventForm);
    expect(manageNav.length).toEqual(1);
    expect(logIn.length).toEqual(1);
    expect(createBetEventForm.length).toEqual(0);
  });
  it('renders a ManageNav and CreateBetEventForm when logged in', () => {
    const store = mockStore({ ...mockedStore, user: { loggedIn: true } });
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <Manage />
        </Router>
      </Provider>
    );
    const manageNav = wrapper.find(ManageNav);
    const logIn = wrapper.find(LogIn);
    const createBetEventForm = wrapper.find(CreateBetEventForm);
    expect(manageNav.length).toEqual(1);
    expect(logIn.length).toEqual(0);
    expect(createBetEventForm.length).toEqual(1);
  });
});
