import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TabMenu } from 'primereact/tabmenu';
import { history } from '../App/App';
import {
  resetCurrentBetEvent,
  setEventMode,
  loadUserWithValidJWT,
  logOutUser
} from '../../actions';
import { ROUTES } from '../constants';
import { StateType, EventMode } from '../../Types';
import './Nav.css';

const tabMap: any = {
  [ROUTES.HOME]: 0,
  [ROUTES.MANAGE]: 2,
  [ROUTES.CONFIRM]: 3,
  [ROUTES.SUBMIT]: 4,
  [ROUTES.LEADERBOARD_SEARCH]: 5,
  [ROUTES.LEADERBOARD]: 5
};

export const Nav = () => {
  const endpoint: string = location.pathname.split('/')[1];
  const defaultTab = tabMap[endpoint];

  const loggedIn = useSelector((state: StateType) => state.user.loggedIn);
  const [activeIndex, setActiveIndex] = useState(defaultTab);
  const dispatch = useDispatch();

  useEffect(() => {
    switch (activeIndex) {
      case tabMap.home:
        history.push('/');
        dispatch(resetCurrentBetEvent());
        break;
      case 1:
        if (loggedIn) {
          dispatch(logOutUser());
        }
        history.push('/');
        break;
      case tabMap.manage:
        dispatch(resetCurrentBetEvent());
        dispatch(setEventMode(EventMode.NEW));
        history.push(`/${ROUTES.MANAGE}`);
        break;
      case tabMap.confirm:
        dispatch(resetCurrentBetEvent());
        dispatch(setEventMode(EventMode.CONFIRM));
        history.push(`/${ROUTES.CONFIRM}`);
        break;
      case tabMap.submit:
        dispatch(resetCurrentBetEvent());
        dispatch(setEventMode(EventMode.GUESS));
        history.push(`/${ROUTES.SUBMIT}`);
        break;
      case tabMap.leaderboard:
        if (endpoint === ROUTES.LEADERBOARD) {
          break;
        }
        dispatch(resetCurrentBetEvent());
        history.push(`/${ROUTES.LEADERBOARD_SEARCH}`);
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
    { label: 'Manage Event', icon: 'pi pi-fw pi-pencil' },
    { label: 'Confirm Answers', icon: 'pi pi-fw pi-check' },
    { label: 'Submit Bet', icon: 'pi pi-fw pi-list' },
    { label: 'Leaderboard', icon: 'pi pi-fw pi-star' }
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
