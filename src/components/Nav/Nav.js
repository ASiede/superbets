import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadUserWithValidJWT, logOutUser } from '../../actions/user.actions';
import './Nav.css';

export const Nav = () => {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUserWithValidJWT());
  }, [loggedIn, dispatch]);
  const handleLogOut = () => dispatch(logOutUser());
  return (
    <div className='nav-container'>
      <header className='nav-header'>
        <Link className='nav-header-link' to='/'>
          SUPERBETS
        </Link>
        <div>
          {loggedIn ? (
            <div className='logged-in-div'>
              <i className='pi pi-user'></i>
              <p className='logged-in'>{username}</p>
              <div className='sign-out'>
                <i className='pi pi-sign-out' onClick={handleLogOut}></i>
              </div>
            </div>
          ) : (
            <div className='logged-in-div'>
              <i className='pi pi-user'></i>
              <Link className='not-logged-in' to='/manage'>
                Log In
              </Link>
            </div>
          )}
        </div>
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
};

export default Nav;
