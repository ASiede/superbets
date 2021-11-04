import { ReactElement } from 'react';
import EventAnswer from '../EventAnswer/EventAnswer';
import { EventQuestionType } from '../../Types/StateTypes';
import './EventQuestion.css';

export const EventQuestion = ({
  question
}: {
  question: EventQuestionType;
}) => {
  const answersList = question.answers.reduce<Array<ReactElement>>(
    (answersList, answer) => {
      answersList.push(<EventAnswer answer={answer} key={answer.answerId} />);
      return answersList;
    },
    []
  );

  return (
    <div className='questionStyle' key={question.questionId}>
      <div className='question'>
        <h4 className='login-label'>
          {question.questionId}. {question.text}
        </h4>
      </div>
      {answersList}
    </div>
  );
};

export default EventQuestion;
