import { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import EventQuestion from '../EventQuestion/EventQuestion';
import { persistUpdatedEvent, persistSubmission } from '../../actions';
import { EventMode, EventType, StateType, SnackbarType } from '../../Types';
import './Event.css';

export const Event = ({
  manageSnackbars
}: {
  manageSnackbars: SnackbarType[];
}) => {
  const event = useSelector((state: StateType) => state.selectedEvent || {});
  const mode = useSelector((state: StateType) => state.eventMode);
  const bettor = useSelector((state: StateType) => !!state.bettor);
  const dispatch = useDispatch();
  const handleButtonClick = () => {
    document?.getElementById('top-header')?.scrollIntoView();
    mode === EventMode.CONFIRM
      ? dispatch(persistUpdatedEvent(manageSnackbars as any))
      : dispatch(persistSubmission(manageSnackbars as any));
  };

  return (
    <div>
      <div>
        <div className='event-container'>
          <div className='card login-card'>{constructQuestionsList(event)}</div>
        </div>
      </div>
      <div>
        <Button
          disabled={EventMode.GUESS && !bettor}
          label={mode === EventMode.CONFIRM ? 'Confirm Answers' : 'Place Bet'}
          onClick={handleButtonClick}
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
