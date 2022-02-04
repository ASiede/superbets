import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';
import Event from '../Event/Event';
import { StateType } from '../../Types/StateTypes';
import { setEvent } from '../../actions';
import { SnackbarType } from '../../Types/MiscTypes';

export const ConfirmAnswers = ({
  manageSnackbars
}: {
  manageSnackbars: SnackbarType[];
}) => {
  const event = useSelector((state: StateType) => state.selectedEvent || {});
  const events = useSelector((state: StateType) => state.user.events || []);
  const [selectedEvent, setSelectedEvent] = useState();
  const dispatch = useDispatch();

  return (
    <div id='confirm'>
      <Dropdown
        value={selectedEvent}
        options={events}
        onChange={(target) => {
          dispatch(setEvent(target.value));
          setSelectedEvent(target.value);
        }}
        optionLabel='name'
        filter
        showClear
        filterBy='name'
        placeholder='Select an Event'
      />
      <p>{event.name}</p>
      {event.name && <Event manageSnackbars={manageSnackbars as any} />}
    </div>
  );
};

export default ConfirmAnswers;
