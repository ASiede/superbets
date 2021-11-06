import { EventAnswerType, EventQuestionType } from '../../Types/StateTypes';
import { useDispatch } from 'react-redux';
import { confirmAnswer } from '../../actions';
import './EventAnswer.css';

export const EventAnswer = ({
  answer,
  question
}: {
  answer: EventAnswerType;
  question: EventQuestionType;
}) => {
  const showOdds = false;
  const dispatch = useDispatch();
  return (
    <div className='answer-container' key={answer.answerId}>
      <div className='answer-inputs'>
        <div
          className={`answer ${
            answer.confirmed ? 'gold-bg' : 'black-bg'
          } mediumblue-border`}
          onClick={() =>
            dispatch(
              confirmAnswer({
                questionId: question.questionId,
                answerId: answer.answerId
              })
            )
          }
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
