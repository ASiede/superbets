import React, { useRef } from 'react';
import RegisterUserForm from '../RegisterUser/RegisterUserForm';
import LogInForm from '../LoginForm/LogInForm';
import { Messages } from 'primereact/messages';
import './LogIn.css';

export const LogIn = () => {
  const loginSnackbars = useRef(null);
  return (
    <div className='login-container'>
      <Messages ref={loginSnackbars} />
      <div className='forms-container'>
        <div className='login darkblue-bg'>
          <h4 className='blue-text'>Log In</h4>
          <LogInForm loginSnackbars={loginSnackbars} />
        </div>
        <div className='register darkblue-bg'>
          <h4 className='blue-text'>Register as New User</h4>
          <RegisterUserForm loginSnackbars={loginSnackbars} />
        </div>
      </div>
    </div>
  );
};

export default LogIn;
