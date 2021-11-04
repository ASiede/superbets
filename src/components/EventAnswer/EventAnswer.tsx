import { EventAnswerType } from '../../Types/StateTypes';
import './EventAnswer.css';

export const EventAnswer = ({ answer }: { answer: EventAnswerType }) => {
  const showOdds = false;
  return (
    <div className='answer-container' key={answer.answerId}>
      <div className='answer-inputs'>
        <div className='answer black-bg mediumblue-border'>
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
