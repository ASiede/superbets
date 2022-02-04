import React from 'react';
import { useDispatch } from 'react-redux';
import { resetCurrentBetEvent, updateManageTab } from '../../actions';
import { ManageTabType } from '../../Types/StateTypes';
import './ManageNav.css';

export const ManageNav = () => {
  const dispatch = useDispatch();

  return (
    <div className='manage-nav-container'>
      <nav className='manage-nav'>
        <p
          onClick={() => {
            dispatch(resetCurrentBetEvent());
            dispatch(updateManageTab(ManageTabType.CREATE));
          }}
          className='manage-link'
        >
          CREATE/EDIT
        </p>
        <p
          onClick={() => {
            dispatch(resetCurrentBetEvent());
            dispatch(updateManageTab(ManageTabType.CONFIRM));
          }}
          className='manage-link'
        >
          CONFIRM ANSWERS
        </p>
      </nav>
    </div>
  );
};

export default ManageNav;
