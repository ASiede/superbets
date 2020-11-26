import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose, withHandlers, withState } from 'recompose';
import BetEventFormAnswer from '../BetEventFormAnswer/BetEventFormAnswer';
import './BetEventFormQuestion.css';

export const BetEventFormQuestion = ({
  numberOfAnswers,
  addAnswer,
  questionIndex,
}) => {
  const answersList = [];
  for (let i=0; numberOfAnswers > i; i++) {
    answersList.push(
      <BetEventFormAnswer
        key={i}
        questionIndex={questionIndex}
        answerIndex={i}
      />);
  }
  
  return (
    <div className='questionStyle'>
      <label className='question-label' htmlFor={`q${questionIndex}`}>#{questionIndex + 1} Question Text: </label>
      <Field name={`q${questionIndex}`} component="input" type="text" />
      <p>Answers: </p>
      {answersList}
      <button type='button' onClick={addAnswer}>Add An Answer</button>

    </div>
  );
};

BetEventFormQuestion.propTypes = {
  numberOfAnswers: PropTypes.number,
  addAnswer: PropTypes.func,
};

const handlers = {
  addAnswer: ({ setNumberOfAnswers, numberOfAnswers }) => () => {
    setNumberOfAnswers(numberOfAnswers + 1);
  }
};



export const recomposedFunction = compose(
  connect(null, null),
  withState('numberOfAnswers', 'setNumberOfAnswers', 1),
  withHandlers(handlers)
);

export default recomposedFunction(BetEventFormQuestion);