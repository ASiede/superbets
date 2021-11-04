import { ReactElement } from 'react';
import { Button } from 'primereact/button';
import EventQuestion from '../EventQuestion/EventQuestion';
import { EventType } from '../../Types/StateTypes';
import './Event.css';

export const Event = ({ event }: { event: EventType }) => {
  return (
    <div>
      <div>
        <div className='event-container'>
          <div className='card login-card'>{constructQuestionsList(event)}</div>
        </div>
      </div>
      <div>
        {/* {persistingBetEvent ? (
          <ProgressSpinner />
        ) : ( */}
        <Button
          // disabled={!betEventFormCompleted(newBetEvent)}
          label='Confirm'
          // onClick={() => dispatch(persistBetEvent(loginSnackbars))}
        />
        {/* )} */}
      </div>
    </div>
  );
};

export const constructQuestionsList = (event: EventType) => {
  return event.questions.reduce<Array<ReactElement>>(
    (questionsList, question) => {
      questionsList.push(
        <div
          key={question.questionId}
          className='question-container darkblue-bg'
        >
          <EventQuestion question={question} />
        </div>
      );
      return questionsList;
    },
    []
  );
};

export default Event;
