import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { getEventFromEncoded } from '../../utils/events/events';
import Event from '../Event/Event';
import { setEvent, updateBettor } from '../../actions';
import { EventMode, StateType } from '../../Types';

export const SubmitBet = () => {
  const [codeInput, setCodeInput] = useState('');
  const event = useSelector((state: StateType) => state.selectedEvent);
  const dispatch = useDispatch();

  const handleSearchForEvent = async () => {
    const decodedEvent = await getEventFromEncoded(codeInput);
    dispatch(setEvent(decodedEvent, EventMode.GUESS));
  };
  return (
    <div className='manage'>
      <h2 className='blue-text'>Place Bet</h2>
      <div>
        <InputText
          placeholder='Event Code'
          onChange={(e) => setCodeInput(e.target.value)}
        />
        <Button
          icon='pi pi-search'
          className='p-button-warning'
          onClick={handleSearchForEvent}
        />
        {event?.name && (
          <div>
            <h2>{event.name}</h2>
            <h5 className='login-label'>Your Name</h5>
            <InputText
              onChange={(e) => dispatch(updateBettor(e.target.value))}
            />
            <Event />
          </div>
        )}
      </div>
    </div>
  );
};
