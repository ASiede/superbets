import React from 'react';
import { Link } from 'react-router-dom';
import {
  navStyle,
  navWrapperStyle,
  linkStyle,
  headerStyle,
  headerLinkStyle
} from './Nav.styles';

export const Nav = () => (
  <div style={navWrapperStyle}>
    <header style={headerStyle}>
      <Link style={headerLinkStyle} to='/'>SUPERBETS</Link>
    </header>
    <nav style={navStyle}>
      <Link style={linkStyle} to='/manage'>MANAGE BET EVENT</Link>
      <Link style={linkStyle} to='/submit'>SUBMIT BET</Link>
      <Link style={linkStyle} to='/leaderboard'>LEADERBOARD</Link>
    </nav>
  </div>
);

export default Nav;

