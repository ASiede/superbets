import { useDispatch, useSelector } from 'react-redux';
import {
  EventAnswerType,
  EventQuestionType,
  EventMode,
  StateType
} from '../../Types';
import { selectAnswer } from '../../actions';
import './EventAnswer.css';

const getAnswerColor = (answer: any, mode: any) => {
  if (mode === EventMode.CONFIRM) {
    if (answer.confirmed) {
      return `answer gold-bg mediumblue-border`;
    } else {
      return `answer black-bg mediumblue-border`;
    }
  }
  if (mode === EventMode.GUESS) {
    if (answer.guessed) {
      return `guess green-bg mediumblue-border`;
    } else {
      return `guess black-bg mediumblue-border`;
    }
  }
};

export const EventAnswer = ({
  answer,
  question
}: {
  answer: EventAnswerType;
  question: EventQuestionType;
}) => {
  const showOdds = false;
  const mode = useSelector((state: StateType) => state.eventMode);
  const dispatch = useDispatch();
  const handleSelectAnswer = () => {
    dispatch(
      selectAnswer({
        questionId: question.questionId,
        answerId: answer.answerId,
        type: mode === EventMode.GUESS ? 'guessed' : 'confirmed'
      })
    );
  };

  return (
    <div className='answer-container' key={answer.answerId}>
      <div className='answer-inputs'>
        <div
          className={getAnswerColor(answer, mode)}
          onClick={handleSelectAnswer}
        >
          <h5 className='login-label'>{answer.text}</h5>
        </div>
        {showOdds && (
          <div className='odds'>
            <h5 className='login-label'>{answer.odds}</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventAnswer;
