import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { ProgressSpinner } from 'primereact/progressspinner';
import { logInUser } from '../../actions/user.actions';

export const LogInForm = ({ loginSnackbars }) => {
  const inProgress = useSelector((state) => state.user.logInInProgress);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  return (
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
        {inProgress ? (
          <ProgressSpinner />
        ) : (
          <Button
            label='Log In'
            onClick={() =>
              dispatch(logInUser(username, password, loginSnackbars))
            }
            disabled={!(password.length && username.length)}
          />
        )}
      </div>
    </div>
  );
};

LogInForm.propTypes = {
  loginSnackbars: PropTypes.object
};

export default LogInForm;
