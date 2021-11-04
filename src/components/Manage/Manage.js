import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Messages } from 'primereact/messages';
import CreateBetEventForm from '../CreateBetEventForm/CreateBetEventForm';
import ManageNav from '../ManageNav/ManageNav';
import LogIn from '../LogIn/LogIn';
import ConfirmAnswers from '../ConfirmAnswers/ConfirmAnswers';
import './Manage.css';
import { ManageTabType } from '../../Types/StateTypes';

export const Manage = () => {
  const loginSnackbars = useRef(null);
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const manageTab = useSelector((state) => state.navigation.manageTab);

  const renderCurrentTab = (tab) => {
    switch (tab) {
      case ManageTabType.CREATE:
        return (
          <div className='manage'>
            <h2 className='blue-text'>Create New Bet Event</h2>
            <CreateBetEventForm loginSnackbars={loginSnackbars} />
          </div>
        );
      case ManageTabType.CONFIRM:
        return (
          <div className='manage'>
            <h2 className='blue-text'>Confirm Answers</h2>
            <ConfirmAnswers />
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
            <ConfirmAnswers />
          </div>
        );
    }
  };

  return (
    <div>
      <ManageNav />
      <Messages ref={loginSnackbars} />
      {!loggedIn ? <LogIn /> : renderCurrentTab(manageTab)}
    </div>
  );
};

export default Manage;
