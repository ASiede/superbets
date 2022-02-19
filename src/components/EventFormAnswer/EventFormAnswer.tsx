import { useDispatch } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { addAnswer, updateAnswer } from '../../actions';
import './EventFormAnswer.css';

export const EventFormAnswer = ({
  answer,
  questionId
}: {
  answer: any;
  questionId: number;
}) => {
  const dispatch = useDispatch();
  return (
    <div className='form-answer-container' key={answer.answerId}>
      {answer.answerId === 1 && (
        <div className='plus'>
          <Button
            icon='pi pi-plus'
            className='p-button-rounded p-button-success p-button-outlined'
            tooltip='Add Answer'
            tooltipOptions={{ position: 'right' }}
            style={{ width: '1.5em', height: '1.5em' }}
            onClick={() => dispatch(addAnswer(questionId))}
          />
        </div>
      )}
      <div className='form-answer-inputs'>
        <div className='form-answer'>
          <h5 className='login-label'>Answer {answer.answerId}</h5>
          <InputText
            value={answer.text}
            className='p-inputtext-sm wide-input'
            onChange={(event) =>
              dispatch(
                updateAnswer({
                  questionId,
                  answerId: answer.answerId,
                  key: 'text',
                  value: event.target.value
                })
              )
            }
          />
        </div>
        <div className='form-odds'>
          <h5 className='login-label'>Odds</h5>
          <InputNumber
            value={answer.odds}
            size={5}
            mode='decimal'
            minFractionDigits={2}
            onChange={(event) =>
              dispatch(
                updateAnswer({
                  questionId,
                  answerId: answer.answerId,
                  key: 'odds',
                  value: event.value
                })
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default EventFormAnswer;
