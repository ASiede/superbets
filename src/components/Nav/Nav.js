import React from 'react';
import { connect } from 'react-redux';
import { compose, withProps, withState, lifecycle } from "recompose";
// import {getOneBetEvent, setBetEvents} from '../actions'
import { bindActionCreators } from 'redux';
import { navStyle } from './Nav.styles'

export const Nav = ({

}) => (
    <nav style={navStyle}>
      <p>SUPERBETS</p>
      <a href="/html/">MANAGE BET EVENT | </a>
      <a href="/html/">SUBMIT BET | </a>
      <a href="/html/">LEADERBOARD</a>
    </nav>
  );

const mapStateToProps = ({
  superbetsState
}) => ({
    // betEvents: state.betEvents,
    superbetsState
});

// const mapDispatchToProps = (dispatch) => bindActionCreators({
//   getOneBetEvent,
//   setBetEvents
// }, dispatch);


export const recomposedFunction = compose(
  connect(mapStateToProps, null),
);

export default recomposedFunction(Nav)

