import { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import EventQuestion from '../EventQuestion/EventQuestion';
import { EventMode, EventType, StateType } from '../../Types';
import { persistUpdatedEvent } from '../../actions';
import { SnackbarType } from '../../Types/MiscTypes';
import './Event.css';

export const Event = ({
  manageSnackbars
}: {
  manageSnackbars: SnackbarType[];
}) => {
  const event = useSelector((state: StateType) => state.selectedEvent || {});
  const mode = useSelector((state: StateType) => state.eventMode);
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <div className='event-container'>
          <div className='card login-card'>{constructQuestionsList(event)}</div>
        </div>
      </div>
      <div>
        <Button
          label={mode === EventMode.CONFIRM ? 'Confirm Answers' : 'Place Bet'}
          onClick={() => {
            document?.getElementById('top-header')?.scrollIntoView();
            mode === EventMode.CONFIRM
              ? dispatch(persistUpdatedEvent(manageSnackbars as any))
              : console.log('place bet');
          }}
        />
      </div>
    </div>
  );
};

export const constructQuestionsList = (event: EventType) => {
  return event?.questions?.reduce<Array<ReactElement>>(
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
