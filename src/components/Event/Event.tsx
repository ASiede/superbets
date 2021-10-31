import { ReactElement } from 'react';
import { Button } from 'primereact/button';
import EventQuestion from '../EventQuestion/EventQuestion';
import { EventType } from '../Types/StateTypes';

export const Event = ({ event }: { event: EventType }) => {
  return (
    <div>
      <div>
        <div className='name'>
          <h5 className='login-label'>{event.name}</h5>
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
