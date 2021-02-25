import React, { useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { compose, withHandlers, withState } from 'recompose';
import RegisterUserForm from '../RegisterUser/RegisterUserForm';
import LogInForm from './LogInForm';
import { registerUser, logInUser } from '../../actions/user.actions';
import './LogIn.css';
import { Messages } from 'primereact/messages';

export const LogIn = ({ submitHandler }) => {
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
          <h4 className='blue-text'>Register</h4>
          {/* <RegisterUserForm onSubmit={submitHandler} ref={loginSnackbarMessages}/> */}
        </div>
      </div>
    </div>
  );
};

LogIn.propTypes = {
  submitHandler: PropTypes.func
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      registerUser,
      logInUser
    },
    dispatch
  );

// TODO: replace this in register form component with new snackbars
const handlers = {
  submitHandler: ({ registerUser, setModalType, setModalText }) => async (
    data
  ) => {
    const { status, errorMessage } = await registerUser(data);
    if (status === 201) {
      setModalType('success');
      setModalText('Successfully registered new user! You can now log in.');
    } else {
      setModalType('error');
      setModalText(errorMessage);
    }
  }
};

export const recomposedFunction = compose(
  connect(null, mapDispatchToProps),
  withState('modalType', 'setModalType', ''),
  withState('modalText', 'setModalText', ''),
  withHandlers(handlers)
);

export default recomposedFunction(LogIn);
