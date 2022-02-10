import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { getEventFromEncoded } from '../../utils/events/events';
import Event from '../Event/Event';
import { EventMode, SnackbarType, StateType } from '../../Types';
import { setEvent } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

export const PlaceBet = ({
  manageSnackbars
}: {
  manageSnackbars: SnackbarType[];
}) => {
  const [codeInput, setCodeInput] = useState('');
  const event = useSelector((state: StateType) => state.selectedEvent);
  const dispatch = useDispatch();

  const handleSearchForEvent = async () => {
    const event1 = await getEventFromEncoded(codeInput);
    console.log('EVENT', event1);
    dispatch(setEvent(event1, EventMode.GUESS));
  };
  return (
    <div>
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
        {event?.name && <Event manageSnackbars={manageSnackbars as any} />}
      </div>
    </div>
  );
};
