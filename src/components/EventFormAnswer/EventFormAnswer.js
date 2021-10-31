import React from 'react';
import PropTypes from 'prop-types';

export const EventFormAnswer = ({ answer }) => {
  return (
    <div className='answer-container' key={answer.answerId}>
      <div className='answer-inputs'>
        <div className='answer'>
          <h5 className='login-label'>{answer.text}</h5>
        </div>
        <div className='odds'>
          <h5 className='login-label'>{answer.odds}</h5>
        </div>
      </div>
    </div>
  );
};

EventFormAnswer.propTypes = {
  answer: PropTypes.object
};

export default EventFormAnswer;
