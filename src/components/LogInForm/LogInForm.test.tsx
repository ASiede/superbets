import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import LoginForm from './LogInForm';
import { logInUser } from '../../actions/user.actions';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
  const original = jest.requireActual('react-redux');
  return {
    ...original,
    useDispatch: () => mockDispatch
  };
});

jest.mock('../../actions/user.actions');

const mockStore = configureMockStore([thunk]);

describe('src/components/LoginForm', () => {
  const mockSnackbars: any = [];
  it('renders LogInForm when logInInProgress false', () => {
    const store = mockStore({ user: { logInInProgress: false } });
    const wrapper = mount(
      <Provider store={store}>
        <LoginForm manageSnackbars={mockSnackbars} />
      </Provider>
    );
    const inputs = wrapper.find(InputText);
    const passwordInput = wrapper.find(Password);
    const button = wrapper.find(Button);
    expect(inputs.length).toEqual(2);
    expect(passwordInput.length).toEqual(1);
    expect(button.length).toEqual(1);
  });

  it.skip('renders LogInForm when logInInProgress true', () => {
    const store = mockStore({ user: { logInInProgress: true } });
    const wrapper = mount(
      <Provider store={store}>
        <LoginForm manageSnackbars={mockSnackbars} />
      </Provider>
    );
    const inputs = wrapper.find(InputText);
    const passwordInput = wrapper.find(Password);
    const button = wrapper.find(Button);
    expect(inputs.length).toEqual(2);
    expect(passwordInput.length).toEqual(1);
    expect(button.length).toEqual(0);
  });

  it('enables button when username and password are set', () => {
    const store = mockStore({ user: { logInInProgress: false } });
    const wrapper = mount(
      <Provider store={store}>
        <LoginForm manageSnackbars={mockSnackbars} />
      </Provider>
    );
    wrapper
      .find(InputText)
      .at(0)
      .simulate('change', { target: { value: 'June' } });
    wrapper
      .find(InputText)
      .at(1)
      .simulate('change', { target: { value: 'password' } });
    wrapper.find(Button).at(0).simulate('click');
    expect(mockDispatch).toHaveBeenCalledWith(logInUser());
  });
});
