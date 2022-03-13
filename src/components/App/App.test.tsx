import { Router, Route } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import App from './App';
import Nav from '../Nav/Nav';
import { Provider } from 'react-redux';
import mockedStore from '../../__mocks__/mockedStore';

const mockStore = configureMockStore([thunk]);

describe('App', () => {
  it('renders a Router, a Nav, and 4 Routes', () => {
    const store = mockStore(mockedStore);
    const app = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const router = app.find(Router);
    const nav = app.find(Nav);
    const route = app.find(Route);
    expect(router.length).toEqual(1);
    expect(nav.length).toEqual(1);
    expect(route.length).toEqual(6);
  });
});
