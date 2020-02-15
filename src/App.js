import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Thing from './components/thing';
import Nav from './components/Nav/Nav';
import Manage from './components/Manage/Manage';
import SubmitBet from './components/SubmitBet/SubmitBet';
import Leaderbaord from './components/Leaderboard/Leaderboard';
import './App.css';

export const App = ({ currentTab }) => (
  <div className="App">
    <header className="App-header">
      <Nav />
    </header>
    {currentTab === 'HOME' &&
      <Thing />
    }
    {currentTab === 'MANAGE' &&
      <Manage />
    }
    {currentTab === 'SUBMIT' &&
      <SubmitBet />
    }
    {currentTab === 'LEADERBOARD' &&
      <Leaderbaord />
    }     
  </div>
);

App.propTypes = {
  currentTab: PropTypes.string
};

export const mapStateToProps = ({
  superbetsState: { currentTab }
}) => ({
  currentTab
});

export const recomposedFunction = compose(
  connect(mapStateToProps)
);  

export default recomposedFunction(App);
