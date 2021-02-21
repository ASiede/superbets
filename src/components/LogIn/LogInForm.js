import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'recompose';
// import { Button } from 'primereact/button';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import PrimeReact from 'primereact/api';
// import './LogIn.css';
// import 'primereact/resources/themes/saga-blue/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';

export let LogInForm = ({ handleSubmit }) => (
  <div>
    <form onSubmit={handleSubmit}>
      <div className='log-in-input'>
        <label htmlFor='username'>Username:</label>
        <Field
          className='field'
          name='username'
          component='input'
          type='text'
          required
        />
      </div>
      <div className='log-in-input'>
        <label htmlFor='password'>Password:</label>
        <Field
          className='field'
          name='password'
          component='input'
          type='password'
          required
        />
      </div>
      <div>
        <Button label='Submit'>Log</Button>
        <button type='submit' className='log-in-button'>
          Log In
        </button>
      </div>
    </form>
  </div>
);

LogInForm.propTypes = {
  submitHandler: PropTypes.func,
  submitUserLoginInfo: PropTypes.func,
};

LogInForm = reduxForm({
  form: 'login-user',
})(LogInForm);

export const recomposedFunction = compose(connect(null, null));

export default recomposedFunction(LogInForm);
