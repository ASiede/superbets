import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { bindActionCreators } from 'redux';
// import {getOneBetEvent, setBetEvents} from '../actions'
import { updateCurrentTab } from '../../actions';
import { navStyle, navWrapperStyle } from './Nav.styles';

export const Nav = ({
  handleTabClick
}) => (
  <div style={navWrapperStyle}>
    <header style={{textAlign: 'start'}} onClick={() => handleTabClick('HOME')}>SUPERBETS</header>
    <nav style={navStyle}>
      <p onClick={() => handleTabClick('MANAGE')}>MANAGE BET EVENT</p>
      <p onClick={() => handleTabClick('SUBMIT')}>SUBMIT BET</p>
      <p onClick={() => handleTabClick('LEADERBOARD')}>LEADERBOARD</p>
    </nav>
  </div>
);

const mapStateToProps = ({
  superbetsState
}) => ({
  superbetsState
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateCurrentTab
}, dispatch);

const handleTabClick = ({ updateCurrentTab }) => (tab) => {
  updateCurrentTab(tab);
};

export const recomposedFunction = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({handleTabClick})
);

export default recomposedFunction(Nav);

