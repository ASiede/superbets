import React from 'react';
import {Router, Route} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Landing from './components/Landing/Landing';
import Nav from './components/Nav/Nav';
import Manage from './components/Manage/Manage';
import SubmitBet from './components/SubmitBet/SubmitBet';
import Leaderboard from './components/Leaderboard/Leaderboard';
import './App.css';

export const history = createBrowserHistory();

export const App = () => (
  <Router history={history}>
    <div className="App">
      <header className="App-header">
        <Nav />
      </header>
      <Route exact path="/" component={Landing} />
      <Route exact path="/manage" component={Manage} />
      <Route exact path="/submit" component={SubmitBet} />
      <Route exact path="/leaderboard" component={Leaderboard} />
    </div>
  </Router>
); 

export default App;
