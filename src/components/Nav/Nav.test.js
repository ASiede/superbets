import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Nav from './Nav';

jest.mock('../../actions/user.actions');
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
  it('renders main links', () => {
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
    expect(links.length).toBe(1);
  });
});
