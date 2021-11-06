import { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import EventQuestion from '../EventQuestion/EventQuestion';
import { EventType, StateType } from '../../Types/StateTypes';
import './Event.css';
import { persistUpdatedEvent } from '../../actions';

export const Event = ({ manageSnackbars }) => {
  const event = useSelector((state: StateType) => state.selectedEvent);
  const dispatch = useDispatch();
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
          onClick={() => dispatch(persistUpdatedEvent(manageSnackbars))}
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
