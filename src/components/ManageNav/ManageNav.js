import React from 'react';
import { useDispatch } from 'react-redux';
import { updateManageTab } from '../../actions';
import { MANAGE_TABS } from '../constants';
import './ManageNav.css';

export const ManageNav = () => {
  const dispatch = useDispatch();

  return (
    <div className='manage-nav-container'>
      <nav className='manage-nav'>
        <p
          onClick={() => dispatch(updateManageTab(MANAGE_TABS.CREATE))}
          className='manage-link'
        >
          CREATE NEW BET EVENT
        </p>
        <p
          onClick={() => dispatch(updateManageTab(MANAGE_TABS.CONFIRM))}
          className='manage-link'
        >
          CONFIRM ANSWERS
        </p>
        <p
          onClick={() => dispatch(updateManageTab(MANAGE_TABS.EDIT))}
          className='manage-link'
        >
          EDIT BET EVENT
        </p>
      </nav>
    </div>
  );
};

export default ManageNav;
