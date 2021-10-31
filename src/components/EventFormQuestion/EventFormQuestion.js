import React from 'react';
import PropTypes from 'prop-types';
import EventFormAnswer from '../EventFormAnswer/EventFormAnswer';

export const EventFormQuestion = ({ question }) => {
  const answersList =
    question &&
    question.answers &&
    question.answers.reduce((answersList, answer) => {
      answersList.push(
        <EventFormAnswer answer={answer} key={answer.answerId} />
      );
      return answersList;
    }, []);

  return (
    <div className='questionStyle' key={question.questionId}>
      <div className='question'>
        <h4 className='login-label'>
          {question.questionId}. {question && question.text}
        </h4>
      </div>
      {answersList}
    </div>
  );
};

EventFormQuestion.propTypes = {
  question: PropTypes.object
};

export default EventFormQuestion;
