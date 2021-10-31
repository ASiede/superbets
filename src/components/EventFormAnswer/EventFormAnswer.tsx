import { EventAnswerType } from '../Types/StateTypes';

export const EventFormAnswer = ({ answer }: { answer: EventAnswerType }) => {
  return (
    <div className='answer-container' key={answer.answerId}>
      <div className='answer-inputs'>
        <div className='answer'>
          <h5 className='login-label'>{answer.text}</h5>
        </div>
        <div className='odds'>
          <h5 className='login-label'>{answer.odds}</h5>
        </div>
      </div>
    </div>
  );
};

export default EventFormAnswer;
