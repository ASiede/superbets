import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  compose,
  withHandlers,
  withState
} from 'recompose';
import { Field, reduxForm } from 'redux-form';
import { formStyle } from './CreateBetEventForm.styles';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faPlusCircle,
//   // faMinusCircle
// } from '@fortawesome/free-solid-svg-icons';

import BetEventFormQuestion from '../BetEventFormQuestion/BetEventFormQuestion';


export let CreateBetEventForm = ({
  handleSubmit,
  numberOfQuestions,
  addQuestion,
}) => {
  const questionsList = [];
  for (let i=0; numberOfQuestions > i; i++) {
    questionsList.push(
      <BetEventFormQuestion
        key={i}
        questionIndex={i}
      />
    );
  }
  return (
    <form onSubmit={handleSubmit}>{
      <div style={formStyle}>
        <label htmlFor="name">Name</label>
        <Field name="name" component="input" type="text" />
        <label htmlFor="password">Password</label>
        <Field name="password" component="input" type="text" />
        <div>
          <p>Questions</p>
          {/* <FontAwesomeIcon
            icon={faPlusCircle}
            onClick={addQuestion}
          /> */}
        </div>
        {questionsList}
        <button onClick={addQuestion}>Add A Question</button>
        <button type="submit">Submit</button>
      </div>
    }</form>
  );
};

CreateBetEventForm.propTypes = {
  numberOfQuestions: PropTypes.number,
  addQuestion: PropTypes.func,
};

const handlers = {
  addQuestion: ({ setNumberOfQuestions, numberOfQuestions }) => () => {
    setNumberOfQuestions(numberOfQuestions + 1);
  }
};

CreateBetEventForm = reduxForm({
  form: 'create-bet-event'
})(CreateBetEventForm);

export const recomposedFunction = compose(
  connect(null, null),
  withState('numberOfQuestions', 'setNumberOfQuestions', 1),
  withHandlers(handlers)
);

export default recomposedFunction(CreateBetEventForm);