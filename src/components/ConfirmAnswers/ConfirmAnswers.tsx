import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';
import { getEventsByUser } from '../../utils/events/events';
import Event from '../Event/Event';
import { StateType } from '../../Types/StateTypes';
import { getUserIdFromState } from '../../utils/state/getState';
import { setEvent } from '../../actions';
import { SnackbarType } from '../../Types/MiscTypes';

export const ConfirmAnswers = ({
  manageSnackbars
}: {
  manageSnackbars: SnackbarType[];
}) => {
  const userId = useSelector((state: StateType) => getUserIdFromState(state));
  const event = useSelector((state: StateType) => state.selectedEvent || {});
  const [betEvents, setBetEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState();
  const dispatch = useDispatch();
  useEffect(
    (): any =>
      (async () => {
        const events = await getEventsByUser(userId);
        setBetEvents(events);
      })(),
    []
  );

  return (
    <div id='confirm'>
      <Dropdown
        value={selectedEvent}
        options={betEvents}
        onChange={(target) => {
          dispatch(setEvent(target.value));
          setSelectedEvent(target.value);
        }}
        optionLabel='name'
        filter
        showClear
        filterBy='name'
        placeholder='Select a Country'
      />
      {event.name && <Event manageSnackbars={manageSnackbars as any} />}
    </div>
  );
};

export default ConfirmAnswers;
