import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CreateBetEventForm from '../CreateBetEventForm/CreateBetEventForm';
import { containerStyle } from './Manage.styles';
import { persistBetEvent } from '../../actions/betEvent.actions.js';
import ManageNav from '../ManageNav/ManageNav';
import LogIn from '../LogIn/LogIn';
import './Manage.css';
import { loadUserWithValidJWT } from '../../actions/user.actions.js';

class Manage extends React.Component {
  componentDidMount() {
    const { loadUserWithValidJWT } = this.props;
    loadUserWithValidJWT();
  }

  render() {
    const {
      superbetsState,
      submitHandler
    } =this.props;
    return (
      <div>
        <ManageNav />
        {!superbetsState.loggedIn
          ? <LogIn />
          : <div className="manage" style={containerStyle}>
            <p>CREATE A NEW BET EVENT</p>
            <CreateBetEventForm onSubmit={submitHandler} />
          </div>
        }
      </div>
    );
  }
}

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
  persistBetEvent,
  loadUserWithValidJWT
}, dispatch);

const submitHandler = ({ persistBetEvent }) => (values) => {
  persistBetEvent(values);
};

export const recomposedFunction = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({submitHandler})
);

export default recomposedFunction(Manage);
