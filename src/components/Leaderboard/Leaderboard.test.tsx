import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Leaderboard from './Leaderboard';

const mockStore = configureMockStore([thunk]);

describe('Leaderboard', () => {
  it('renders something', () => {
    const store = mockStore({});
    const wrapper = mount(
      <Provider store={store}>
        <Leaderboard match={{ params: { id: 'abcs' } }} />
      </Provider>
    );
    const div = wrapper.find('div');
    expect(div.length).toBe(1);
  });
});
