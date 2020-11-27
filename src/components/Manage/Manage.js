import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers, withState } from 'recompose';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CreateBetEventForm from '../CreateBetEventForm/CreateBetEventForm';
import { containerStyle } from './Manage.styles';
import { persistBetEvent } from '../../actions/betEvent.actions.js';
import ManageNav from '../ManageNav/ManageNav';
import LogIn from '../LogIn/LogIn';
import './Manage.css';

export const Manage = ({
  submitHandler,
  loggedIn
}) => (
  <div>
    <ManageNav />
    {!loggedIn
      ? <LogIn />
      : <div className="manage" style={containerStyle}>
        <p>CREATE A NEW BET EVENT</p>
        <CreateBetEventForm onSubmit={submitHandler} />
      </div>
    }
  </div>
);

Manage.propTypes = {
  submitHandler: PropTypes.func,
  loggedIn: PropTypes.bool,
};

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
  withState('loggedIn', 'setLoggedIn', false),
  withHandlers({submitHandler})
);

export default recomposedFunction(Manage);
