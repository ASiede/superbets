import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import './BetEventFormAnswer.css';

export const BetEventFormAnswer = ({
  answerIndex,
  questionIndex
}) => {
  return (
    <div key={answerIndex}>
      <div>
        <label className='answer-label' htmlFor={`q${questionIndex}:a${answerIndex}`}>#{answerIndex + 1} Answer Text: </label>
        <Field name={`q${questionIndex}:a${answerIndex}`} component="input" type="text" />
      </div>
      <div className='odds-div'>
        <label className='answer-label' htmlFor={`q${questionIndex}:a${answerIndex}:odds`}>#{answerIndex + 1} Answer Odds: </label>
        <Field name={`q${questionIndex}:a${answerIndex}:odds`} component="input" type="text" />
      </div>
    </div>
  );
};

BetEventFormAnswer.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.object),
  addAnswer: PropTypes.func,
};

export const recomposedFunction = compose(
  connect(null, null),
);

export default recomposedFunction(BetEventFormAnswer);