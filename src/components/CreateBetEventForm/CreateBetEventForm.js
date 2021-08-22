import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BetEventFormQuestion from '../BetEventFormQuestion/BetEventFormQuestion';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { setNewBetEventName } from '../../actions';
import { persistBetEvent } from '../../actions/betEvent.actions.js';
import './CreateBetEventForm.css';

export const CreateBetEventForm = () => {
  const questions = useSelector(
    (state) => state.betEvents.newBetEvent.questions
  );
  const persistingBetEvent = useSelector((state) => state.persistingBetEvent);
  const dispatch = useDispatch();
  const questionsList =
    questions &&
    questions.reduce((questionsList, question) => {
      questionsList.push(
        <div
          key={question.questionId}
          className='question-container darkblue-bg'
        >
          <BetEventFormQuestion questionId={question.questionId} />
        </div>
      );
      return questionsList;
    }, []);
  return (
    <div>
      <div>
        <div className='name'>
          <h5 className='login-label'>Name of Betting Event</h5>
          <InputText
            className='p-inputtext-sm'
            onChange={(event) =>
              dispatch(setNewBetEventName(event.target.value))
            }
          />
        </div>
        <div className='bet-event-form '>
          <div className='card login-card'>{questionsList}</div>
        </div>
      </div>
      <div>
        {persistingBetEvent ? (
          <ProgressSpinner />
        ) : (
          <Button
            label='Create Bet Event'
            onClick={() => dispatch(persistBetEvent())}
          />
        )}
      </div>
    </div>
  );
};

export default CreateBetEventForm;
