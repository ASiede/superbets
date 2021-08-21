import React from 'react';
import { useSelector } from 'react-redux';
import CreateBetEventForm from '../CreateBetEventForm/CreateBetEventForm';
import ManageNav from '../ManageNav/ManageNav';
import LogIn from '../LogIn/LogIn';
import './Manage.css';

export const Manage = () => {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  return (
    <div>
      <ManageNav />
      {!loggedIn ? (
        <LogIn />
      ) : (
        <div className='manage'>
          <h2 className='blue-text'>Create New Bet Event</h2>
          <CreateBetEventForm />
        </div>
      )}
    </div>
  );
};

export default Manage;
