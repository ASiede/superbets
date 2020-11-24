import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  compose,
  withHandlers,
  withState
} from 'recompose';
import { Field, reduxForm } from 'redux-form';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faPlusCircle,
//   // faMinusCircle
// } from '@fortawesome/free-solid-svg-icons';

import BetEventFormQuestion from '../BetEventFormQuestion/BetEventFormQuestion';
import './CreateBetEventForm.css';


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
      <div>
        <div className='main-input'>
          <label className='label' htmlFor="name">Name of Betting Event: </label>
          <Field className='field' name="name" component="input" type="text" />
        </div>
        <div className='main-input'>
          <label className='label' htmlFor="password">Password (optional): </label>
          <Field className='field' name="password" component="input" type="password" />
        </div>
        <div>
          <p className='main-input'>Questions: </p>
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