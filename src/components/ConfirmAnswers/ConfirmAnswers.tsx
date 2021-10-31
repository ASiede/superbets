import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';
import { getEventsByUser } from '../../utils/events/events';
import EventForm from '../EventForm/EventForm';
import { StateType } from '../Types/StateTypes';
import { getUserIdFromState } from '../../utils/state/getState';

export const ConfirmAnswers = () => {
  const userId = useSelector((state: StateType) => getUserIdFromState(state));
  const [betEvents, setBetEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState();
  useEffect(
    (): any =>
      (async () => {
        const events = await getEventsByUser(userId);
        setBetEvents(events);
      })(),
    []
  );

  return (
    <div>
      <p>CONFIRMING ANSWERS</p>
      <Dropdown
        value={selectedEvent}
        options={betEvents}
        onChange={(target) => setSelectedEvent(target.value)}
        optionLabel='name'
        filter
        showClear
        filterBy='name'
        placeholder='Select a Country'
      />
      {selectedEvent && <EventForm event={selectedEvent} />}
    </div>
  );
};

export default ConfirmAnswers;
