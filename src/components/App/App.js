import React from 'react';
import { Router, Route } from 'react-router-dom';
import PrimeReact from 'primereact/api';
import { createBrowserHistory } from 'history';
import Landing from '../Landing/Landing';
import Nav from '../Nav/Nav';
import Manage from '../Manage/Manage';
import SubmitBet from '../SubmitBet/SubmitBet';
import Leaderboard from '../Leaderboard/Leaderboard';
import './App.css';
import 'primereact/resources/themes/vela-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

PrimeReact.ripple = true;

export const history = createBrowserHistory();

export const App = () => (
  <Router history={history}>
    <div className='App black-bg'>
      <p style={{color:'white'}}>This works</p>
      {/* <header className='App-header'>
        <Nav />
      </header> */}
      {/* <Route exact path="/" component={Landing} /> */}
      {/* <Route exact path="/manage" component={Manage} /> */}
      {/* <Route exact path="/submit" component={SubmitBet} /> */}
      {/* <Route exact path="/leaderboard" component={Leaderboard} /> */}
    </div>
  </Router>
);

export default App;
