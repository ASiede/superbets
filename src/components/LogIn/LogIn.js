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
import { registerUser } from '../../actions/user.actions';
import './LogIn.css';

export const LogIn = ({
  submitHandler
}) => (
  <div className='log-in-div'>
    <p className='access'>You must be logged in to access this area</p>
    <div className='box'>
      <div className='log-in-section'>
        <p>Log In</p>
        <div className='log-in-input'>
          <label>Username:</label>
          <input></input>
        </div>
        <div className='log-in-input'>
          <label>Password:</label>
          <input></input>
        </div>
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
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  registerUser
}, dispatch);

const submitHandler = ({ registerUser }) => (data) => {
  registerUser(data);
};

export const recomposedFunction = compose(
  connect(null, mapDispatchToProps),
  withState('numberOfQuestions', 'setNumberOfQuestions', 1),
  withHandlers({submitHandler})
);

export default recomposedFunction(LogIn);

