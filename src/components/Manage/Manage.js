import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { bindActionCreators } from 'redux';
import CreateBetEventForm from '../CreateBetEventForm/CreateBetEventForm';
import { containerStyle } from './Manage.styles';
import {persistBetEvent } from '../../actions';
import './Manage.css';

export const Manage = ({
  submitHandler
}) => (
  <div className="manage" style={containerStyle}>
    <p>CREATE A NEW BET EVENT</p>
    <CreateBetEventForm onSubmit={submitHandler} />
  </div>
);
const mapStateToProps = ({
  superbetsState
}) => ({
  superbetsState
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  persistBetEvent
}, dispatch);

const submitHandler = ({ persistBetEvent }) => (values) => {
  persistBetEvent(values);
};

export const recomposedFunction = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({submitHandler})
);

export default recomposedFunction(Manage);
