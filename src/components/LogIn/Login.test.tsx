import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import LogInForm from '../LogInForm/LogInForm';
import RegisterUserForm from '../RegisterUser/RegisterUserForm';
import mockedStore from '../../__mocks__/mockedStore';
import LogIn from './LogIn';

const mockStore = configureMockStore([thunk]);

describe('src/components/Login', () => {
  it('renders Messages, LogInForm, and RegistrationForm', () => {
    const store = mockStore(mockedStore);
    const wrapper = mount(
      <Provider store={store}>
        <LogIn />
      </Provider>
    );
    const logInForm = wrapper.find(LogInForm);
    const registrationUserForm = wrapper.find(RegisterUserForm);
    expect(logInForm.length).toEqual(1);
    expect(registrationUserForm.length).toEqual(1);
  });
});
