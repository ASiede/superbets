import React from 'react';
import { mount } from 'enzyme';
import { Messages } from 'primereact/messages';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import LogInForm from './LogInForm';
import RegisterUserForm from '../RegisterUser/RegisterUserForm';
import LogIn from './LogIn';

const mockStore = configureMockStore([thunk]);

describe('LogIn', () => {
  it('renders Messages, LogInForm, and RegistrationForm', () => {
    const store = mockStore({});
    const wrapper = mount(
      <Provider store={store}>
        <LogIn />
      </Provider>
    );
    const messages = wrapper.find(Messages);
    const logInForm = wrapper.find(LogInForm);
    const registrationUserForm = wrapper.find(RegisterUserForm);
    expect(messages.length).toEqual(1);
    expect(logInForm.length).toEqual(1);
    expect(registrationUserForm.length).toEqual(1);
  });
});
