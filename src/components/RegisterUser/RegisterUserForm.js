import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

export let RegisterUserForm = ({
  handleSubmit
}) => (
  <form onSubmit={handleSubmit}>{
    <div>
      <div className='main-input'>
        <label className='label' htmlFor="first-name">First Name: </label>
        <Field
          className='field'
          name="firstName"
          component="input"
          type="text" 
          required
        />
      </div>
      <div className='main-input'>
        <label className='label' htmlFor="last-name">Last Name: </label>
        <Field
          className='field'
          name="lastName"
          component="input"
          type="text"
          required
        />
      </div>
      <div className='main-input'>
        <label className='label' htmlFor="email">Email: </label>
        <Field
          className='field'
          name="email"
          component="input"
          type="email" 
          required
        />
      </div>
      <div className='main-input'>
        <label className='label' htmlFor="username">Username: </label>
        <Field
          className='field'
          name="username"
          component="input"
          type="text"
          required
        />
      </div>
      <div className='main-input'>
        <label className='label' htmlFor="password">Password: </label>
        <Field
          className='field'
          name="password"
          component="input"
          type="password"
          required
        />
      </div>
      <button type="submit">Submit</button>
    </div>
  }</form>
);

RegisterUserForm.propTypes = {
  handleSubmit: PropTypes.func
};

RegisterUserForm = reduxForm({
  form: 'register-user'
})(RegisterUserForm);

export const recomposedFunction = compose(
  connect(null, null),
);

export default recomposedFunction(RegisterUserForm);

