import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import CreateBetEventForm from '../CreateBetEventForm/CreateBetEventForm';
import { containerStyle } from './Manage.styles';
import { persistBetEvent } from '../../actions/betEvent.actions.js';
import ManageNav from '../ManageNav/ManageNav';
import LogIn from '../LogIn/LogIn';
import './Manage.css';

export const Manage = () => {
  const loggedIn = useSelector((state) => state.loggedIn);
  const dispatch = useDispatch();
  return (
    <div>
      <ManageNav />
      {!loggedIn ? (
        <LogIn />
      ) : (
        <div className='manage' style={containerStyle}>
          <p>CREATE A NEW BET EVENT</p>
          <CreateBetEventForm
            onSubmit={(values) => dispatch(persistBetEvent(values))}
          />
        </div>
      )}
    </div>
  );
};

Manage.propTypes = {
  loggedIn: PropTypes.bool
};

export default Manage;
