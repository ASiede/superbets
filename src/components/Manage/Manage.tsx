import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SelectButton } from 'primereact/selectbutton';
import { Dropdown } from 'primereact/dropdown';
import EventForm from '../EventForm/EventForm';
import LogIn from '../LogIn/LogIn';
import { resetCurrentBetEvent, setEvent, setEventMode } from '../../actions';
import { StateType, EventMode } from '../../Types';
import './Manage.css';

export const Manage = () => {
  const dispatch = useDispatch();
  const events = useSelector((state: StateType) => state.user.events || []);
  const loggedIn = useSelector((state: StateType) => state.user.loggedIn);
  const eventMode = useSelector((state: StateType) => state.eventMode);
  const event = useSelector((state: StateType) => state.selectedEvent);

  useEffect(() => {
    dispatch(resetCurrentBetEvent());
  }, [eventMode, dispatch]);

  const options = [EventMode.NEW, EventMode.EDIT];

  return (
    <div>
      {!loggedIn ? (
        <LogIn />
      ) : (
        <div className='manage'>
          <h2 className='blue-text'>Create New Bet Event</h2>
          <SelectButton
            value={eventMode}
            options={options}
            onChange={(e) => dispatch(setEventMode(e.value))}
          />
          {eventMode === EventMode.EDIT && (
            <div className='dropdown'>
              <Dropdown
                value={event}
                options={events}
                onChange={(target) => {
                  dispatch(setEvent(target.value, EventMode.EDIT));
                }}
                optionLabel='name'
                filter
                filterBy='name'
                placeholder='Select an Event'
              />
            </div>
          )}
          <EventForm />
        </div>
      )}
    </div>
  );
};

export default Manage;
