import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Messages } from 'primereact/messages';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import BetEventFormQuestion from '../BetEventFormQuestion/BetEventFormQuestion';
import { setNewBetEventName } from '../../actions';
import { persistBetEvent } from '../../actions/betEvent.actions.js';
import './CreateBetEventForm.css';

export const CreateBetEventForm = () => {
  const dispatch = useDispatch();
  const loginSnackbars = useRef(null);
  const newBetEvent = useSelector((state) => state.betEvents.newBetEvent);
  const persistingBetEvent = useSelector((state) => state.persistingBetEvent);
  return (
    <div>
      <Messages ref={loginSnackbars} />
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
          <div className='card login-card'>
            {constructQuestionsList(newBetEvent)}
          </div>
        </div>
      </div>
      <div>
        {persistingBetEvent ? (
          <ProgressSpinner />
        ) : (
          <Button
            disabled={!betEventFormCompleted(newBetEvent)}
            label='Create Bet Event'
            onClick={() => dispatch(persistBetEvent(loginSnackbars))}
          />
        )}
      </div>
    </div>
  );
};

export const betEventFormCompleted = (newBetEvent) => {
  const { name, questions } = newBetEvent;
  const questionsComplete = questions.every(
    (question) =>
      question.text.length &&
      question.answers.every((answer) => answer.text.length && answer.odds)
  );
  return name && questionsComplete;
};

export const constructQuestionsList = (newBetEvent) => {
  return newBetEvent.questions.reduce((questionsList, question) => {
    questionsList.push(
      <div key={question.questionId} className='question-container darkblue-bg'>
        <BetEventFormQuestion questionId={question.questionId} />
      </div>
    );
    return questionsList;
  }, []);
};

export default CreateBetEventForm;
