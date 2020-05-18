import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  compose,
  lifecycle
} from 'recompose';
import {getAllBetEvents, setBetEvents} from '../../actions';

export const SubmitBet = ({
  betEvents
}) => (
  <div>
    <p>THIS IS THE SUBMIT BET AREA</p>
    <p>Look at all the Bet Events below:</p>
    {console.log('betevets', betEvents)}
    {betEvents.map((be) => {
      return <p key={be.name} >{be.name}</p>;
    })}
  </div>
);

const mapStateToProps = ({
  superbetsState: { betEvents }
}) => ({
  betEvents
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAllBetEvents,
  setBetEvents
}, dispatch);

export const recomposedFunction = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.getAllBetEvents();
    }})
);

export default recomposedFunction(SubmitBet);
