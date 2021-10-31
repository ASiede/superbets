import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';
import EventFormQuestion from '../EventFormQuestion/EventFormQuestion';

export const EventForm = ({ event }) => {
  return (
    <div>
      <div>
        <div className='name'>
          <h5 className='login-label'>{event && event.name}</h5>
        </div>
        <div className='bet-event-form '>
          <div className='card login-card'>{constructQuestionsList(event)}</div>
        </div>
      </div>
      <div>
        {/* {persistingBetEvent ? (
          <ProgressSpinner />
        ) : ( */}
        <Button
          // disabled={!betEventFormCompleted(newBetEvent)}
          label='Save'
          // onClick={() => dispatch(persistBetEvent(loginSnackbars))}
        />
        {/* )} */}
      </div>
    </div>
  );
};

EventForm.propTypes = {
  event: PropTypes.object
};

export const constructQuestionsList = (event) => {
  return (
    event &&
    event.questions.reduce((questionsList, question) => {
      questionsList.push(
        <div
          key={question.questionId}
          className='question-container darkblue-bg'
        >
          <EventFormQuestion question={question} />
        </div>
      );
      return questionsList;
    }, [])
  );
};

export default EventForm;
