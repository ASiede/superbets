import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, withHandlers, withState } from 'recompose';
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
  username
}) => {
  const questionsList = [];
  for (let i = 0; numberOfQuestions > i; i++) {
    questionsList.push(<BetEventFormQuestion key={i} questionIndex={i} />);
  }
  return (
    <form onSubmit={handleSubmit}>
      {
        <div>
          <div>
            <div className='main-input'>
              <label className='label' htmlFor='name'>
                Name of Betting Event:{' '}
              </label>
              <Field
                required
                className='field'
                name='name'
                component='input'
                type='text'
              />
            </div>
            <div className='main-input'>
              <label className='label' htmlFor='password'>
                Password (optional):{' '}
              </label>
              <Field
                required
                className='field'
                name='password'
                component='input'
                type='password'
              />
            </div>
            <div className='main-input'>
              <label className='label' htmlFor='createdBy'>
                CreatedBy:{' '}
              </label>
              <p>{username}</p>
              {/* <Field value='hello' required className='field' name="createdBy" component="input" type="text" /> */}
            </div>
            <div>
              <p className='main-input'>Questions: </p>
              {/* <FontAwesomeIcon
              icon={faPlusCircle}
              onClick={addQuestion}
            /> */}
            </div>
            {questionsList}
            <button
              className='add-question-button'
              type='button'
              onClick={addQuestion}
            >
              Add A Question
            </button>
          </div>
          <button type='submit'>Submit</button>
        </div>
      }
    </form>
  );
};

CreateBetEventForm.propTypes = {
  numberOfQuestions: PropTypes.number,
  addQuestion: PropTypes.func
};

const mapStateToProps = ({ username }) => ({
  username
});

const handlers = {
  addQuestion: ({ setNumberOfQuestions, numberOfQuestions }) => () => {
    setNumberOfQuestions(numberOfQuestions + 1);
  }
};

CreateBetEventForm = reduxForm({
  form: 'create-bet-event'
})(CreateBetEventForm);

export const recomposedFunction = compose(
  connect(mapStateToProps, null),
  withState('numberOfQuestions', 'setNumberOfQuestions', 1),
  withHandlers(handlers)
);

export default recomposedFunction(CreateBetEventForm);
