import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Messages } from 'primereact/messages';
import EventForm from '../EventForm/EventForm';
import ManageNav from '../ManageNav/ManageNav';
import LogIn from '../LogIn/LogIn';
import ConfirmAnswers from '../ConfirmAnswers/ConfirmAnswers';
import { ManageTabType, StateType } from '../../Types/StateTypes';
import './Manage.css';

export const Manage = () => {
  const manageSnackbars = useRef(null);
  const loggedIn = useSelector((state: StateType) => state.user.loggedIn);
  const manageTab = useSelector(
    (state: StateType) => state.navigation.manageTab
  );

  const renderCurrentTab = (tab: ManageTabType) => {
    switch (tab) {
      case ManageTabType.CREATE:
        return (
          <div className='manage'>
            <h2 className='blue-text'>Create New Bet Event</h2>
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
      <ManageNav />
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
