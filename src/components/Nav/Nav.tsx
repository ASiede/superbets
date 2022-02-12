import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TabMenu } from 'primereact/tabmenu';
import { loadUserWithValidJWT, logOutUser } from '../../actions/user.actions';
import {
  resetCurrentBetEvent,
  setEventMode,
  updateManageTab
} from '../../actions';
import { ManageTabType, StateType, EventMode } from '../../Types';
import { history } from '../App/App';
import './Nav.css';

export const Nav = () => {
  const loggedIn = useSelector((state: StateType) => state.user.loggedIn);
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    // TODO: change numbers to enum
    switch (activeIndex) {
      case 0:
        dispatch(resetCurrentBetEvent());
        history.push('/');
        break;
      case 1:
        if (loggedIn) {
          dispatch(logOutUser());
        }
        dispatch(updateManageTab(ManageTabType.CREATE));
        history.push('/manage');
        break;
      case 2:
        dispatch(resetCurrentBetEvent());
        dispatch(setEventMode(EventMode.NEW));
        dispatch(updateManageTab(ManageTabType.CREATE));
        history.push('/manage');
        break;
      case 3:
        dispatch(resetCurrentBetEvent());
        dispatch(setEventMode(EventMode.CONFIRM));
        dispatch(updateManageTab(ManageTabType.CONFIRM));
        history.push('/manage');
        break;
      case 4:
        dispatch(resetCurrentBetEvent());
        dispatch(setEventMode(EventMode.GUESS));
        dispatch(updateManageTab(ManageTabType.PLACE_BET));
        history.push('/manage');
        break;
      default:
        break;
    }
    dispatch(loadUserWithValidJWT());
  }, [activeIndex, dispatch]);

  useEffect(() => {
    dispatch(loadUserWithValidJWT());
  }, [loggedIn, dispatch]);

  const navItems = [
    { label: 'Home', icon: 'pi pi-fw pi-home' },
    {
      label: `${loggedIn ? 'Log Out' : 'Log In'}`,
      icon: 'pi pi-fw pi-user'
    },
    { label: 'New/Edit Event', icon: 'pi pi-fw pi-pencil' },
    { label: 'Confirm Answer', icon: 'pi pi-fw pi-check' },
    { label: 'Place bet', icon: 'pi pi-fw pi-list' }
  ];

  return (
    <div id='top-header' className='nav-container'>
      <header className='nav-header'>
        <Link className='nav-header-link' to='/'>
          SUPERBETS
        </Link>
      </header>
      <nav className='nav'>
        <TabMenu
          model={navItems}
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        />
      </nav>
    </div>
  );
};

export default Nav;
