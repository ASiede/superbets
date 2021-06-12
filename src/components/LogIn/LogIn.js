import React, { useRef } from 'react';
import RegisterUserForm from '../RegisterUser/RegisterUserForm';
import LogInForm from './LogInForm';
import { Messages } from 'primereact/messages';
import './LogIn.css';

export const LogIn = () => {
  const loginSnackbarMessages = useRef(null);
  return (
    <div className='login-container'>
      <Messages ref={loginSnackbarMessages} />
      <div className='forms-container'>
        <div className='login darkblue-bg'>
          <h4 className='blue-text'>Log In</h4>
          <LogInForm loginSnackbarMessages={loginSnackbarMessages} />
        </div>
        <div className='register darkblue-bg'>
          <h4 className='blue-text'>Register as New User</h4>
          <RegisterUserForm loginSnackbarMessages={loginSnackbarMessages} />
        </div>
      </div>
    </div>
  );
};

export default LogIn;
