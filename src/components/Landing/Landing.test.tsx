import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Landing from './Landing';

const mockStore = configureMockStore([thunk]);

describe('Landing', () => {
  it('renders header', () => {
    const store = mockStore();
    const wrapper = mount(
      <Provider store={store}>
        <Landing />
      </Provider>
    );
    const h2 = wrapper.find('h2').at(0);
    expect(h2.text()).toBe('SUPERBETS');
  });
});
