import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, withState, withHandlers } from 'recompose';
import { logInUser } from '../../../src/actions/user.actions';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { snackbar } from '../../utils/snackbar/Snackbar';

export const LogInForm = ({
  submitLoginHandler,
  setUsername,
  setPassword,
  password,
  username
}) => (
  <div>
    <div className='card login-card'>
      <div>
        <h5 className='login-label'>Username</h5>
        <InputText
          className='p-inputtext-sm'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <h5 className='login-label'>Password</h5>
        <Password
          className='p-inputtext-sm'
          value={password}
          feedback={false}
          toggleMask={true}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='login-submit'>
        <Button
          label='Log In'
          onClick={submitLoginHandler}
          disabled={!password.length || !username.length}
        />
      </div>
    </div>
  </div>
);

LogInForm.propTypes = {
  submitLoginHandler: PropTypes.func,
  setUsername: PropTypes.func,
  setPassword: PropTypes.func,
  username: PropTypes.string,
  password: PropTypes.string
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ logInUser }, dispatch);

const submitLoginHandler = ({
  logInUser,
  username,
  password,
  loginSnackbarMessages
}) => async () => {
  const { status, errorMessage } = await logInUser({ username, password });
  if (status !== 200) {
    loginSnackbarMessages.current.show(snackbar('error', errorMessage));
  }
};

export const recomposedFunction = compose(
  connect(null, mapDispatchToProps),
  withState('username', 'setUsername', ''),
  withState('password', 'setPassword', ''),
  withHandlers({ submitLoginHandler })
);

export default recomposedFunction(LogInForm);
