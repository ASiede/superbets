import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Nav from './Nav';
import { TabMenu } from 'primereact/tabmenu';
import { resetCurrentBetEvent } from '../../actions';
import { history } from '../App/App';
import React from 'react';

jest.mock('../../actions');
jest.mock('../App/App');

const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
  const original = jest.requireActual('react-redux');
  return {
    ...original,
    useDispatch: () => mockDispatch
  };
});

const mockStore = configureMockStore([thunk]);

describe('Nav', () => {
  it('renders main link and TabMenu', () => {
    const store = mockStore({
      user: { loggedIn: true }
    });
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <Nav />
        </Router>
      </Provider>
    );
    const links = wrapper.find(Link);
    const tabMenu = wrapper.find(TabMenu);
    expect(links.length).toBe(1);
    expect(tabMenu.length).toBe(1);
  });

  it('dispatches and updates history with Home tab selected', () => {
    const store = mockStore({
      user: { loggedIn: true }
    });
    const wrapper: any = mount(
      <Provider store={store}>
        <Router>
          <Nav />
        </Router>
      </Provider>
    );
    wrapper.find(TabMenu).props().onTabChange({ index: 0 });
    expect(resetCurrentBetEvent).toHaveBeenCalled();
    expect(history.push).toHaveBeenCalledWith('/');
  });
});
