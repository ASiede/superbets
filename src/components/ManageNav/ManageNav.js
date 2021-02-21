import React from 'react';
import { Link } from 'react-router-dom';
import './ManageNav.css';

export const ManageNav = () => (
  <div className='manage-nav-container'>
    <nav className='manage-nav'>
      <Link className='manage-link' to='/createNew'>
        CREATE NEW BET EVENT
      </Link>
      <Link className='manage-link' to='/confirmAnswers'>
        CONFIRM ANSWERS
      </Link>
      <Link className='manage-link' to='/editBetEvent'>
        EDIT BET EVENT
      </Link>
    </nav>
  </div>
);

export default ManageNav;
