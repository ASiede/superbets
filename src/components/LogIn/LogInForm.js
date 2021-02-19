import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import {
  compose,
} from 'recompose';
import './LogIn.css';

export let LogInForm = ({
  handleSubmit
}) => (
  <div>
    <form onSubmit={handleSubmit}>
      <div className='log-in-input'>
        <label htmlFor='username'>Username:</label>
        <Field
          className='field'
          name="username"
          component="input"
          type="text" 
          required
        />
      </div>
      <div className='log-in-input'>
        <label htmlFor='password'>Password:</label>
        <Field
          className='field'
          name="password"
          component="input"
          type="password" 
          required
        />
      </div>
      <div>
        <button type='submit' className='log-in-button'>Log In</button>
      </div>
    </form>
  </div>
);

LogInForm.propTypes = {
  submitHandler: PropTypes.func,
  submitUserLoginInfo: PropTypes.func
};

LogInForm = reduxForm({
  form: 'login-user'
})(LogInForm);

export const recomposedFunction = compose(
  connect(null, null),
);

export default recomposedFunction(LogInForm);

