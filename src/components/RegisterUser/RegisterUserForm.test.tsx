import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { createSnackbar } from '../../utils/snackbar/Snackbar';
// import { registerUser } from '../../utils/user/user';
import RegisterUserForm, {
  submitRegistration,
  validateEmail
} from './RegisterUserForm';
import { SNACKBAR_MESSAGES, SNACKBAR_TYPES } from '../constants';

const mockStore = configureMockStore([thunk]);

jest.mock('../../utils/user/user');

describe('RegisterUserForm', () => {
  const mockManageSnackbars: any = [];
  it('renders elements of the RegistrationForm when inProgress false', () => {
    const store = mockStore({ validEmail: false });
    const wrapper = mount(
      <Provider store={store}>
        <RegisterUserForm manageSnackbars={mockManageSnackbars} />
      </Provider>
    );
    const inputs = wrapper.find(InputText);
    const passwordInput = wrapper.find(Password);
    const button = wrapper.find(Button);
    expect(inputs.length).toEqual(5);
    expect(passwordInput.length).toEqual(1);
    expect(button.length).toEqual(1);
  });
  it('renders elements of the RegistrationForm and spinner when inProgress true', () => {
    const store = mockStore({ validEmail: false });
    const wrapper = mount(
      <Provider store={store}>
        <RegisterUserForm manageSnackbars={mockManageSnackbars} />
      </Provider>
    );
    const inputs = wrapper.find(InputText);
    const passwordInput = wrapper.find(Password);
    const button = wrapper.find(Button);
    expect(inputs.length).toEqual(5);
    expect(passwordInput.length).toEqual(1);
    expect(button.length).toEqual(1);
  });
  it('enables button with form complete and valid', () => {
    const store = mockStore({ validEmail: true });
    const wrapper = mount(
      <Provider store={store}>
        <RegisterUserForm manageSnackbars={mockManageSnackbars} />
      </Provider>
    );
    wrapper
      .find(InputText)
      .at(0)
      .simulate('change', { target: { value: 'Doctor' } });
    wrapper
      .find(InputText)
      .at(1)
      .simulate('change', { target: { value: 'Strange' } });
    wrapper
      .find(InputText)
      .at(2)
      .simulate('change', { target: { value: 'ds@gmail.com' } })
      .simulate('blur');
    wrapper
      .find(InputText)
      .at(3)
      .simulate('change', { target: { value: 'drstrange' } });
    wrapper
      .find(InputText)
      .at(4)
      .simulate('change', { target: { value: 'password' } });
    const button = wrapper.find(Button).at(0);
    expect(button.props().disabled).toBe(false);
  });
  it('show warning message with invalid email', () => {
    const store = mockStore({ validEmail: false });
    const wrapper = mount(
      <Provider store={store}>
        <RegisterUserForm manageSnackbars={mockManageSnackbars} />
      </Provider>
    );
    wrapper
      .find(InputText)
      .at(0)
      .simulate('change', { target: { value: 'Doctor' } });
    wrapper
      .find(InputText)
      .at(1)
      .simulate('change', { target: { value: 'Strange' } });
    wrapper
      .find(InputText)
      .at(2)
      .simulate('change', { target: { value: 'ds@gmail' } })
      .simulate('blur');
    const small = wrapper.find('small');
    expect(small.length).toBe(1);
    expect(small.props().children).toBe('Must be a valid email');
  });

  describe('validateEmail', () => {
    it('calls setValidEmail with true with a valid email', () => {
      const email = 'name@domain.com';
      const setValidEmail = jest.fn();
      validateEmail(email, setValidEmail);
      expect(setValidEmail).toBeCalledWith(true);
    });
    it('calls setValidEmail with false with an invalid email', () => {
      const email = 'notavalidemail';
      const setValidEmail = jest.fn();
      validateEmail(email, setValidEmail);
      expect(setValidEmail).toBeCalledWith(false);
    });
  });
  describe('submitRegistration', () => {
    it('shows a success snackbar and resets data on user registration', async () => {
      const mockShow = jest.fn();
      const newUserData = {};
      const manageSnackbars = {
        current: {
          show: mockShow
        }
      };
      const setNewUserData = jest.fn();
      const setInProgress = jest.fn();
      // registerUser.mockResolvedValueOnce({ status: 201 });
      await submitRegistration(
        newUserData,
        manageSnackbars,
        setNewUserData,
        setInProgress
      );
      expect(mockShow).toHaveBeenCalledWith(
        createSnackbar(
          SNACKBAR_TYPES.SUCCESS,
          SNACKBAR_MESSAGES.REGISTRATION_SUCCESS
        )
      );
      expect(setNewUserData).toHaveBeenCalled();
      expect(setInProgress).toHaveBeenCalledWith(true);
      expect(setInProgress).toHaveBeenCalledWith(false);
    });
    it('shows an error snackbar on user registration error', async () => {
      const setInProgress = jest.fn();
      const mockShow = jest.fn();
      const newUserData = {};
      const manageSnackbars = {
        current: {
          show: mockShow
        }
      };
      const setNewUserData = jest.fn();
      const mockErrorMessage = 'bad stuff';
      // registerUser.mockResolvedValueOnce({
      //   status: 400,
      //   errorMessage: mockErrorMessage
      // });
      await submitRegistration(
        newUserData,
        manageSnackbars,
        setNewUserData,
        setInProgress
      );
      expect(mockShow).toHaveBeenCalledWith(
        createSnackbar(SNACKBAR_TYPES.ERROR, mockErrorMessage)
      );
      expect(setNewUserData).not.toHaveBeenCalled();
      expect(setInProgress).toHaveBeenCalledWith(true);
      expect(setInProgress).toHaveBeenCalledWith(false);
    });
  });
});
