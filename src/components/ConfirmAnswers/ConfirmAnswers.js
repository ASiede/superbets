import React, {
  // useRef,
  useEffect,
  useState
} from 'react';
import {
  useSelector
  // useDispatch
} from 'react-redux';
import { Dropdown } from 'primereact/dropdown';
import { getEventsByUser } from '../../utils/events/events';
// import { Messages } from 'primereact/messages';

export const ConfirmAnswers = () => {
  // const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);
  // const persistingBetEvent = useSelector((state) => state.persistingBetEvent);
  const [betEvents, setBetEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState();
  useEffect(
    () =>
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
    </div>
  );
};

export default ConfirmAnswers;
