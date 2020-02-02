import React from 'react';
import { connect } from 'react-redux';
import { compose, withProps, withState, lifecycle } from "recompose";
import {getOneBetEvent, setBetEvents} from '../actions'
import { bindActionCreators } from 'redux';

export const Thing = ({
  betEvents,
  test,
  props,
  constantProp,
  state,
  superbetsState
}) => (
    <div className="Thing">
      {console.log('constant Prop', superbetsState)}
      <p>HERE IS A NAME OF A BET EVENT</p>
        {/* <p>{test}</p> */}
      <p>{superbetsState.betEvents}</p>
    </div>
  );

const mapStateToProps = ({
  superbetsState
}) => ({
    // betEvents: state.betEvents,
    superbetsState
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getOneBetEvent,
  setBetEvents
}, dispatch);


export const recomposedFunction = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('state', 'setState', 'something'),
  lifecycle({
    componentDidMount() {
      // this.props.getOneBetEvent()
      // this.props.setBetEvents({name: 'pains'})
    }})
);

export default recomposedFunction(Thing)

