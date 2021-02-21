import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

export const Nav = () => (
  <div className='nav-container'>
    <header className='nav-header'>
      <Link className='nav-header-link' to='/'>
        SUPERBETS
      </Link>
    </header>
    <nav className='nav'>
      <Link className='nav-link blue-text' to='/manage'>
        MANAGE BET EVENT
      </Link>
      <Link className='nav-link blue-text' to='/submit'>
        SUBMIT BET
      </Link>
      <Link className='nav-link blue-text' to='/leaderboard'>
        LEADERBOARD
      </Link>
    </nav>
  </div>
);

export default Nav;
