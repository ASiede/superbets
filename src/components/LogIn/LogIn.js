import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
  compose,
  withHandlers,
  withState
} from 'recompose';
import RegisterUserForm from '../RegisterUser/RegisterUserForm';
import { registerUser, logInUser } from '../../actions/user.actions';
import './LogIn.css';
import { LogInForm } from './LogInForm';
import Modal from '../Modal/Modal';

export const LogIn = ({
  submitHandler,
  submitUserLoginInfo,
  modalText,
  modalType,
  closeModalHandler
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
    {modalType && <Modal type={modalType} text={modalText} closeModal={closeModalHandler} />}
  </div>
);

LogIn.propTypes = {
  submitHandler: PropTypes.func,
  submitUserLoginInfo: PropTypes.func,
  modalType: PropTypes.string,
  modalText: PropTypes.string,
  closeModalHandler: PropTypes.func
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  registerUser,
  logInUser
}, dispatch);

const handlers = {
  submitHandler: ({ registerUser, setModalType, setModalText }) => async(data) => {
    const {status, errorMessage } = await registerUser(data);
    if (status === 201) {
      setModalType('success');
      setModalText('Successfully registered new user! You can now log in.');
    } else {
      setModalType('error');
      setModalText(errorMessage);
    }
  },
  submitUserLoginInfo: ({ logInUser }) => (data) => {
    logInUser(data);
  },
  closeModalHandler: ({ setModalType }) => () => {
    setModalType('');
  }
};

export const recomposedFunction = compose(
  connect(null, mapDispatchToProps),
  withState('modalType', 'setModalType', ''),
  withState('modalText', 'setModalText', ''),
  withHandlers(handlers)
);

export default recomposedFunction(LogIn);

