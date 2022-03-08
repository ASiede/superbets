import { Router, Route } from 'react-router-dom';
import PrimeReact from 'primereact/api';
import { createBrowserHistory } from 'history';
import Landing from '../Landing/Landing';
import Nav from '../Nav/Nav';
import Manage from '../Manage/Manage';
import 'primereact/resources/themes/vela-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.css';
import Leaderboard from '../Leaderboard/Leaderboard';
import ConfirmAnswers from '../ConfirmAnswers/ConfirmAnswers';
import { SubmitBet } from '../SubmitBet/SubmitBet';
import { Toast } from 'primereact/toast';
import LeaderboardSearch from '../LeaderboardSearch/LeaderboardSearch';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setToast } from '../../actions';
import { ROUTES } from '../constants';

PrimeReact.ripple = true;

export const history = createBrowserHistory();

export const App = () => {
  const toast: any = useRef(null);
  const dispatch = useDispatch();
  dispatch(setToast(toast));

  return (
    <Router history={history}>
      <div className='App black-bg'>
        <Toast ref={toast} />
        <header className='App-header'>
          <Nav />
        </header>
        <Route exact path='/' component={Landing} />
        <Route exact path={`/${ROUTES.MANAGE}`} component={Manage} />
        <Route exact path={`/${ROUTES.CONFIRM}`} component={ConfirmAnswers} />
        <Route exact path={`/${ROUTES.SUBMIT}`} component={SubmitBet} />
        <Route
          exact
          path={`/${ROUTES.LEADERBOARD_SEARCH}`}
          component={LeaderboardSearch}
        />
        <Route
          exact
          path={`/${ROUTES.LEADERBOARD}/:id`}
          component={Leaderboard}
        />
      </div>
    </Router>
  );
};

export default App;
