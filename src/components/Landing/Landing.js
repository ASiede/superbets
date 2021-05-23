import React from 'react';
import { connect } from 'react-redux';
import { compose, withState, lifecycle } from 'recompose';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

export const Thing = ({ betEvents }) => (
  <div className='Thing'>
    <p>HERE IS THE LANDING PAGE</p>
    {/* <p>{test}</p> */}
    <p>{betEvents}</p>
  </div>
);

Thing.propTypes = {
  betEvents: PropTypes.array
};

const mapStateToProps = ({ betEvents }) => ({
  betEvents
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getOneBetEvent,
      // setBetEvents
    },
    dispatch
  );

export const recomposedFunction = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('state', 'setState', 'something'),
  lifecycle({
    componentDidMount() {
      // this.props.getOneBetEvent();
      // this.props.setBetEvents({name: 'pains'})
    }
  })
);

export default recomposedFunction(Thing);
