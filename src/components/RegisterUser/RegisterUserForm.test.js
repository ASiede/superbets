import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { snackbar } from '../../utils/snackbar/Snackbar';
import { registerUser } from '../../utils/user/user';
import RegisterUserForm, {
  submitRegistration,
  validateEmail
} from './RegisterUserForm';

const mockStore = configureMockStore([thunk]);

jest.mock('../../utils/user/user');

describe('RegisterUserForm', () => {
  it('renders elements of the RegistrationForm', () => {
    const store = mockStore({ validEmail: false });
    const wrapper = mount(
      <Provider store={store}>
        <RegisterUserForm />
      </Provider>
    );
    const inputs = wrapper.find(InputText);
    const passwordInput = wrapper.find(Password);
    const button = wrapper.find(Button);
    expect(inputs.length).toEqual(5);
    expect(passwordInput.length).toEqual(1);
    expect(button.length).toEqual(1);
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
      const loginSnackbarMessages = {
        current: {
          show: mockShow
        }
      };
      const setNewUserData = jest.fn();
      registerUser.mockResolvedValueOnce({ status: 201 });
      await submitRegistration(
        newUserData,
        loginSnackbarMessages,
        setNewUserData
      );
      expect(mockShow).toHaveBeenCalledWith(
        snackbar('success', 'Registration Successful!')
      );
      expect(setNewUserData).toHaveBeenCalled();
    });
    it('shows an error snackbar on user registration error', async () => {
      const mockShow = jest.fn();
      const newUserData = {};
      const loginSnackbarMessages = {
        current: {
          show: mockShow
        }
      };
      const setNewUserData = jest.fn();
      const mockErrorMessage = 'bad stuff';
      registerUser.mockResolvedValueOnce({
        status: 400,
        errorMessage: mockErrorMessage
      });
      await submitRegistration(
        newUserData,
        loginSnackbarMessages,
        setNewUserData
      );
      expect(mockShow).toHaveBeenCalledWith(
        snackbar('error', mockErrorMessage)
      );
      expect(setNewUserData).not.toHaveBeenCalled();
    });
  });
});
