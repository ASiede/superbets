import React, { useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { compose, withState } from 'recompose';
import RegisterUserForm from '../RegisterUser/RegisterUserForm';
import LogInForm from './LogInForm';
import { logInUser } from '../../actions/user.actions';
import { Messages } from 'primereact/messages';
import { registerUser } from '../../utils/user/user';
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

export const recomposedFunction = compose(
  connect(null, mapDispatchToProps),
  withState('modalType', 'setModalType', ''),
  withState('modalText', 'setModalText', '')
);

export default recomposedFunction(LogIn);
