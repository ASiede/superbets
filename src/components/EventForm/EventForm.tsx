import { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import EventFormQuestion from '../EventFormQuestion/EventFormQuestion';
import {
  setNewBetEventName,
  persistNewEvent,
  persistUpdatedEvent
} from '../../actions';
import { SnackbarType } from '../../Types/MiscTypes';
import { EventType, StateType } from '../../Types/StateTypes';
import './EventForm.css';

export const EventForm = ({
  manageSnackbars,
  newOrEditMode
}: {
  manageSnackbars: SnackbarType[];
  newOrEditMode: string;
}) => {
  const dispatch = useDispatch();
  const event = useSelector((state: StateType) => state.selectedEvent || {});
  const persistingBetEvent = useSelector(
    (state: StateType) => state.persistingBetEvent
  );
  return (
    <div>
      <div>
        <div className='name'>
          <h5 className='login-label'>Name of Betting Event</h5>
          <InputText
            value={event.name}
            className='p-inputtext-sm'
            onChange={(changeEvent) =>
              dispatch(setNewBetEventName(changeEvent.target.value))
            }
          />
        </div>
        <div className='bet-event-form '>
          <div className='card login-card'>{constructQuestionsList(event)}</div>
        </div>
      </div>
      <div>
        {persistingBetEvent ? (
          <ProgressSpinner />
        ) : (
          <Button
            disabled={!eventFormCompleted(event)}
            label={
              newOrEditMode === 'New' ? 'Create Bet Event' : 'Update Bet Event'
            }
            onClick={() => {
              newOrEditMode === 'New'
                ? dispatch(persistNewEvent(manageSnackbars))
                : dispatch(persistUpdatedEvent(manageSnackbars));
            }}
          />
        )}
      </div>
    </div>
  );
};

export const eventFormCompleted = (event: EventType) => {
  const { name, questions } = event;
  const questionsComplete = questions?.every(
    (question) =>
      question?.text?.length &&
      question?.answers?.every((answer) => answer?.text?.length && answer.odds)
  );
  return name && questionsComplete;
};

export const constructQuestionsList = (event: EventType) => {
  return event?.questions?.reduce<Array<ReactElement>>(
    (questionsList, question) => {
      questionsList.push(
        <div
          key={question.questionId}
          className='question-container darkblue-bg'
        >
          <EventFormQuestion question={question} />
        </div>
      );
      return questionsList;
    },
    []
  );
};

export default EventForm;
