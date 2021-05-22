import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, withHandlers, withState } from 'recompose';
import { registerUser } from '../../../src/actions/user.actions';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { snackbar } from '../../utils/snackbar/Snackbar';

const defaultUserData = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: ''
};

export const RegisterUserForm = ({
  submitRegistrationDataHandler,
  newUserData,
  setNewUserData
}) => (
  <div>
    <div className='card login-card'>
      <div>
        <h5 className='login-label'>First Name</h5>
        <InputText
          className='p-inputtext-sm'
          value={newUserData.firstName}
          onChange={(e) =>
            setNewUserData({ ...newUserData, firstName: e.target.value })
          }
        />
      </div>
      <div>
        <h5 className='login-label'>Last Name</h5>
        <InputText
          className='p-inputtext-sm'
          value={newUserData.lastName}
          onChange={(e) =>
            setNewUserData({ ...newUserData, lastName: e.target.value })
          }
        />
      </div>
      <div>
        <h5 className='login-label'>Email</h5>
        <InputText
          className='p-inputtext-sm'
          value={newUserData.email}
          onChange={(e) =>
            setNewUserData({ ...newUserData, email: e.target.value })
          }
        />
      </div>
      <div>
        <h5 className='login-label'>Username</h5>
        <InputText
          className='p-inputtext-sm'
          value={newUserData.username}
          onChange={(e) =>
            setNewUserData({ ...newUserData, username: e.target.value })
          }
        />
      </div>
      <div>
        <h5 className='login-label'>Password</h5>
        <Password
          className='p-inputtext-sm'
          value={newUserData.password}
          feedback={true}
          toggleMask={true}
          onChange={(e) =>
            setNewUserData({ ...newUserData, password: e.target.value })
          }
        />
      </div>
      <div className='login-submit'>
        <Button
          label='Register User'
          onClick={submitRegistrationDataHandler}
          disabled={Object.values(newUserData).some((v) => v === '')}
        />
      </div>
    </div>
  </div>
);

RegisterUserForm.propTypes = {
  handleSubmit: PropTypes.func,
  newUserData: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string
  }),
  setNewUserData: PropTypes.func,
  submitRegistrationDataHandler: PropTypes.func
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ registerUser }, dispatch);

export const submitRegistrationDataHandler = ({
  registerUser,
  newUserData,
  loginSnackbarMessages,
  setNewUserData
}) => async () => {
  const { status, errorMessage } = await registerUser(newUserData);
  if (status === 201) {
    loginSnackbarMessages.current.show(
      snackbar('success', 'Registration Successful!')
    );
    // TODO: passwork doesn't clear?
    setNewUserData(defaultUserData);
  } else {
    loginSnackbarMessages.current.show(snackbar('error', errorMessage));
  }
};

export const recomposedFunction = compose(
  connect(null, mapDispatchToProps),
  withState('newUserData', 'setNewUserData', defaultUserData),
  withHandlers({ submitRegistrationDataHandler })
);

export default recomposedFunction(RegisterUserForm);
