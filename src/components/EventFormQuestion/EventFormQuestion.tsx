import { ReactElement } from 'react';
import EventFormAnswer from '../EventFormAnswer/EventFormAnswer';
import { EventQuestionType } from '../Types/StateTypes';

export const EventFormQuestion = ({
  question
}: {
  question: EventQuestionType;
}) => {
  const answersList = question.answers.reduce<Array<ReactElement>>(
    (answersList, answer) => {
      answersList.push(
        <EventFormAnswer answer={answer} key={answer.answerId} />
      );
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

export default EventFormQuestion;
