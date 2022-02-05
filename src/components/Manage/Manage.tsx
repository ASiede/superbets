import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Messages } from 'primereact/messages';
import { SelectButton } from 'primereact/selectbutton';
import { Dropdown } from 'primereact/dropdown';
import EventForm from '../EventForm/EventForm';
import LogIn from '../LogIn/LogIn';
import ConfirmAnswers from '../ConfirmAnswers/ConfirmAnswers';
import { ManageTabType, StateType } from '../../Types/StateTypes';
import { resetCurrentBetEvent, setEvent } from '../../actions';
import './Manage.css';

export const Manage = () => {
  const manageSnackbars = useRef(null);
  const [newOrEditMode, setNewOrEditMode] = useState('New');
  const events = useSelector((state: StateType) => state.user.events || []);
  const loggedIn = useSelector((state: StateType) => state.user.loggedIn);
  const [selectedEvent, setSelectedEvent] = useState();
  const manageTab = useSelector(
    (state: StateType) => state.navigation.manageTab
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetCurrentBetEvent());
    setSelectedEvent(undefined);
  }, [newOrEditMode, dispatch]);

  const options = ['New', 'Edit'];

  const renderCurrentTab = (tab: ManageTabType) => {
    switch (tab) {
      case ManageTabType.CREATE:
        return (
          <div className='manage'>
            <h2 className='blue-text'>Create New Bet Event</h2>
            <SelectButton
              value={newOrEditMode}
              options={options}
              onChange={(e) => setNewOrEditMode(e.value)}
            />
            {newOrEditMode === 'Edit' && (
              <div className='dropdown'>
                <Dropdown
                  value={selectedEvent}
                  options={events}
                  onChange={(target) => {
                    dispatch(setEvent(target.value));
                    setSelectedEvent(target.value);
                  }}
                  optionLabel='name'
                  filter
                  filterBy='name'
                  placeholder='Select an Event'
                />
              </div>
            )}
            <EventForm
              manageSnackbars={manageSnackbars as any}
              newOrEditMode={newOrEditMode}
            />
          </div>
        );
      case ManageTabType.CONFIRM:
        return (
          <div className='manage'>
            <h2 className='blue-text'>Confirm Answers</h2>
            <ConfirmAnswers manageSnackbars={manageSnackbars as any} />
          </div>
        );
      case ManageTabType.EDIT:
        return (
          <div className='manage'>
            <h2 className='blue-text'>Edit Bet Event</h2>
            {/* <CreateBetEventForm /> */}
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
        <LogIn manageSnackbars={manageSnackbars} />
      ) : (
        renderCurrentTab(manageTab)
      )}
    </div>
  );
};

export default Manage;
