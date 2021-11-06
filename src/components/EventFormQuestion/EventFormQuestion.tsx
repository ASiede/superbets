import { ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import EventFormAnswer from '../EventFormAnswer/EventFormAnswer';
import { addQuestion, updateQuestionText } from '../../actions';
import { StateType } from '../../Types/StateTypes';
import { getAnswer } from '../../utils/state/getState';
import './EventFormQuestion.css';

export const EventFormQuestion = ({ questionId }: { questionId: number }) => {
  const answers = useSelector((state: StateType) =>
    getAnswer(state, questionId)
  );
  const questionLength = useSelector(
    (state: StateType) => state.selectedEvent?.questions?.length
  );
  const dispatch = useDispatch();

  const answersList = answers?.reduce<Array<ReactElement>>(
    (answersList, answer) => {
      answersList.push(
        <EventFormAnswer
          key={answer.answerId}
          questionId={questionId}
          answerId={answer.answerId}
        />
      );
      return answersList;
    },
    []
  );

  return (
    <div className='form-question-container'>
      {questionId === questionLength && (
        <div className='plus'>
          <Button
            icon='pi pi-plus'
            className='p-button-rounded p-button-success'
            tooltip='Add Question'
            tooltipOptions={{ position: 'right' }}
            style={{ width: '1.5em', height: '1.5em' }}
            onClick={() => dispatch(addQuestion())}
          />
        </div>
      )}
      <div className='form-question'>
        <h4 className='login-label'>Question {questionId}: </h4>
        <InputText
          className='p-inputtext-sm extra-wide-input'
          onChange={(event) =>
            dispatch(
              updateQuestionText({ questionId, text: event.target.value })
            )
          }
        />
      </div>
      {answersList}
    </div>
  );
};

export default EventFormQuestion;
