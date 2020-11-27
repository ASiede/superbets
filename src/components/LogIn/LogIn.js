import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
  compose,
  withHandlers,
} from 'recompose';
import RegisterUserForm from '../RegisterUser/RegisterUserForm';
import { registerUser, logInUser } from '../../actions/user.actions';
import './LogIn.css';
import { LogInForm } from './LogInForm';

export const LogIn = ({
  submitHandler,
  submitUserLoginInfo
}) => (
  <div className='log-in-div'>
    <p className='access'>You must be logged in to access this area</p>
    <div className='box'>
      <div className='log-in-section'>
        <p>Log In</p>
        <LogInForm onSubmit={submitUserLoginInfo} />
      </div>
      <div className='register-section'>
        <p>Register</p>
        <RegisterUserForm onSubmit={submitHandler} />
      </div>
    </div>
  </div>
);

LogIn.propTypes = {
  submitHandler: PropTypes.func,
  submitUserLoginInfo: PropTypes.func
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  registerUser,
  logInUser
}, dispatch);

const handlers = {
  submitHandler: ({ registerUser }) => (data) => {
    registerUser(data);
  },
  submitUserLoginInfo: ({ logInUser }) => (data) => {
    logInUser(data);
  }
};

export const recomposedFunction = compose(
  connect(null, mapDispatchToProps),
  withHandlers(handlers)
);

export default recomposedFunction(LogIn);

