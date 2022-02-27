import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import LeaderboardSearch from './LeaderboardSearch';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { history } from '../App/App';

const mockStore = configureMockStore([thunk]);

jest.mock('../App/App', () => ({
  history: {
    push: jest.fn()
  }
}));

describe('LeaderboardSearch', () => {
  it('renders an InputText and Button', () => {
    const store = mockStore({});
    const wrapper = mount(
      <Provider store={store}>
        <LeaderboardSearch />
      </Provider>
    );
    const inputText = wrapper.find(InputText);
    const button = wrapper.find(Button);
    expect(inputText.length).toBe(1);
    expect(button.length).toBe(1);
  });

  it('updates the inputText and then pushes it to history', () => {
    const store = mockStore({});
    const mockInput = 'abc';
    const wrapper = mount(
      <Provider store={store}>
        <LeaderboardSearch />
      </Provider>
    );
    wrapper
      .find(InputText)
      .at(0)
      .simulate('change', { target: { value: mockInput } });
    wrapper.find(Button).at(0).simulate('click');
    expect(history.push).toHaveBeenCalledWith(`/leaderboard/${mockInput}`);
  });
});
