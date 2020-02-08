import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from "recompose";
import { bindActionCreators } from 'redux';
// import {getOneBetEvent, setBetEvents} from '../actions'
import { updateCurrentTab } from '../../actions';
import { navStyle } from './Nav.styles'

export const Nav = ({
  handleTabClick
}) => (
  <nav style={navStyle}>
    <p onClick={() => handleTabClick('HOME')}>SUPERBETS</p>
    <p onClick={() => handleTabClick('MANAGE')}>MANAGE BET EVENT | </p>
    <p onClick={() => handleTabClick('SUBMIT')}>SUBMIT BET | </p>
    <p onClick={() => handleTabClick('LEADERBOARD')}>LEADERBOARD | </p>
  </nav>
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
}

export const recomposedFunction = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({handleTabClick})
);

export default recomposedFunction(Nav)

