import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Messages } from 'primereact/messages';
import { SelectButton } from 'primereact/selectbutton';
import { Dropdown } from 'primereact/dropdown';
import EventForm from '../EventForm/EventForm';
import LogIn from '../LogIn/LogIn';
import ConfirmAnswers from '../ConfirmAnswers/ConfirmAnswers';
import { ManageTabType, StateType, EventMode } from '../../Types';
import { resetCurrentBetEvent, setEvent, setEventMode } from '../../actions';
import { PlaceBet } from '../PlaceBet/PlaceBet';
import './Manage.css';

export const Manage = () => {
  const manageSnackbars = useRef(null);
  const events = useSelector((state: StateType) => state.user.events || []);
  const loggedIn = useSelector((state: StateType) => state.user.loggedIn);
  const eventMode = useSelector((state: StateType) => state.eventMode);
  const event = useSelector((state: StateType) => state.selectedEvent);
  const manageTab = useSelector(
    (state: StateType) => state.navigation.manageTab
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetCurrentBetEvent());
  }, [eventMode, dispatch]);

  const options = [EventMode.NEW, EventMode.EDIT];

  const renderCurrentTab = (tab: ManageTabType) => {
    switch (tab) {
      case ManageTabType.CREATE:
        return (
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
            <EventForm manageSnackbars={manageSnackbars as any} />
          </div>
        );
      case ManageTabType.CONFIRM:
        return (
          <div className='manage'>
            <h2 className='blue-text'>Confirm Answers</h2>
            <ConfirmAnswers manageSnackbars={manageSnackbars as any} />
          </div>
        );
      case ManageTabType.PLACE_BET:
        return (
          <div className='manage'>
            <h2 className='blue-text'>Place Bet</h2>
            <PlaceBet manageSnackbars={manageSnackbars as any} />
          </div>
        );
      default:
        return (
          <div className='manage'>
            <h2 className='blue-text'>Confirm Answers</h2>
            <ConfirmAnswers manageSnackbars={manageSnackbars as any} />
          </div>
        );
    }
  };

  return (
    <div>
      <Messages ref={manageSnackbars} />
      {!loggedIn ? (
        <LogIn manageSnackbars={manageSnackbars as any} />
      ) : (
        renderCurrentTab(manageTab)
      )}
    </div>
  );
};

export default Manage;
