import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { formStyle } from './CreateBetEventForm.styles';

export let CreateBetEventForm = ({
  handleSubmit,
}) =>{
  return (
    <form onSubmit={handleSubmit}>{
      <div style={formStyle}>
        <label htmlFor="name">Name</label>
        <Field name="name" component="input" type="text" />
        <label htmlFor="password">Password</label>
        <Field name="password" component="input" type="text" />
        <button type="submit" >Submit</button>
      </div>
    }</form>
  );
};

CreateBetEventForm = reduxForm({
  form: 'create-bet-event'
})(CreateBetEventForm);

export default CreateBetEventForm;