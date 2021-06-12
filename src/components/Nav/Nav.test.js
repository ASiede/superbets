import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Nav from './Nav';

const mockStore = configureMockStore([thunk]);

describe('Nav', () => {
  it('renders main links', () => {
    const store = mockStore({
      loggedIn: true
    });
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <Nav />
        </Router>
      </Provider>
    );
    const links = wrapper.find(Link);
    const homeLink = wrapper.find(Link).at(0);
    const manageLink = wrapper.find(Link).at(1);
    const submitLink = wrapper.find(Link).at(2);
    const leaderboardLink = wrapper.find(Link).at(3);
    expect(links.length).toBeGreaterThanOrEqual(4);
    expect(homeLink.props().children).toBe('SUPERBETS');
    expect(manageLink.props().children).toBe('MANAGE BET EVENT');
    expect(submitLink.props().children).toBe('SUBMIT BET');
    expect(leaderboardLink.props().children).toBe('LEADERBOARD');
  });

  it('renders log in Link when not logged in', () => {
    const store = mockStore({
      loggedIn: false
    });
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <Nav />
        </Router>
      </Provider>
    );
    const logInLink = wrapper.find(Link).at(1);
    expect(logInLink.props().children).toBe('Log In');
  });
  it('renders log out icon when logged in', () => {
    const store = mockStore({
      loggedIn: true
    });
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <Nav />
        </Router>
      </Provider>
    );
    const logInLink = wrapper.find('i').at(1);
    expect(logInLink.props().className).toBe('pi pi-sign-out');
  });
});
