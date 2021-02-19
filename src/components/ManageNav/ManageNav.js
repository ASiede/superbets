import React from 'react';
import { Link } from 'react-router-dom';
import './ManageNav.css';

export const ManageNav = () => (
  <div className='wrapper-style'>
    <nav className='nav-style'>
      <Link className='link-style' to='/createNew'>CREATE NEW BET EVENT</Link>
      <Link className='link-style' to='/confirmAnswers'>CONFIRM ANSWERS</Link>
      <Link className='link-style' to='/editBetEvent'>EDIT BET EVENT</Link>
    </nav>
  </div>
);

export default ManageNav;