import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'recompose';

export const BetEventFormAnswer = ({
  answerIndex,
  questionIndex
}) => {
  return (
    <div key={answerIndex}>
      <label htmlFor={`q${questionIndex}:a${answerIndex}`}>Answer</label>
      <Field name={`q${questionIndex}:a${answerIndex}`} component="input" type="text" />
      <label htmlFor={`q${questionIndex}:a${answerIndex}:odds`}>Odds</label>
      <Field name={`q${questionIndex}:a${answerIndex}:odds`} component="input" type="text" />
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