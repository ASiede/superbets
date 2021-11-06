import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import BetEventFormAnswer from '../BetEventFormAnswer/BetEventFormAnswer';
import { addQuestion, updateQuestionText } from '../../actions';
import './BetEventFormQuestion.css';

export const BetEventFormQuestion = ({ questionId }) => {
  const answers = useSelector(
    (state) =>
      state.selectedEvent.questions.find(
        (question) => question.questionId === questionId
      ).answers
  );
  const questionLength = useSelector(
    (state) => state.selectedEvent.questions.length
  );
  const dispatch = useDispatch();

  const answersList =
    answers &&
    answers.reduce((answersList, answer) => {
      answersList.push(
        <BetEventFormAnswer
          key={answer.answerId}
          questionId={questionId}
          answerId={answer.answerId}
        />
      );
      return answersList;
    }, []);

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

BetEventFormQuestion.propTypes = {
  questionId: PropTypes.number
};

export default BetEventFormQuestion;
