import { ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import EventFormAnswer from '../EventFormAnswer/EventFormAnswer';
import { addQuestion, updateQuestionText } from '../../actions';
import { getAnswer } from '../../utils/state/getState';
import { EventQuestionType, StateType } from '../../Types/StateTypes';
import './EventFormQuestion.css';

export const EventFormQuestion = ({
  question
}: {
  question: EventQuestionType;
}) => {
  const answers = useSelector((state: StateType) =>
    getAnswer(state, question.questionId)
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
          questionId={question.questionId}
          answer={answer}
        />
      );
      return answersList;
    },
    []
  );

  return (
    <div className='form-question-container'>
      {question.questionId === questionLength && (
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
        <h4 className='login-label'>Question {question.questionId}: </h4>
        <InputText
          value={question.text}
          className='p-inputtext-sm extra-wide-input'
          onChange={(event) =>
            dispatch(
              updateQuestionText({
                questionId: question.questionId,
                text: event.target.value
              })
            )
          }
        />
      </div>
      {answersList}
    </div>
  );
};

export default EventFormQuestion;
