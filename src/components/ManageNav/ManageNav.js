import React from 'react';
import { useDispatch } from 'react-redux';
import { updateManageTab } from '../../actions';
import { ManageTabType } from '../../Types/StateTypes';
import './ManageNav.css';

export const ManageNav = () => {
  const dispatch = useDispatch();

  return (
    <div className='manage-nav-container'>
      <nav className='manage-nav'>
        <p
          onClick={() => dispatch(updateManageTab(ManageTabType.CREATE))}
          className='manage-link'
        >
          CREATE NEW BET EVENT
        </p>
        <p
          onClick={() => dispatch(updateManageTab(ManageTabType.CONFIRM))}
          className='manage-link'
        >
          CONFIRM ANSWERS
        </p>
        <p
          onClick={() => dispatch(updateManageTab(ManageTabType.EDIT))}
          className='manage-link'
        >
          EDIT BET EVENT
        </p>
      </nav>
    </div>
  );
};

export default ManageNav;
