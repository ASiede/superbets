import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { ProgressSpinner } from 'primereact/progressspinner';
import { logInUser } from '../../actions/user.actions';
import { SnackbarType } from '../../Types';

export const LogInForm = ({
  manageSnackbars
}: {
  manageSnackbars: SnackbarType[];
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const inProgress = false; // TODO: fixme

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
              dispatch(logInUser(username, password, manageSnackbars))
            }
            disabled={!(password.length && username.length)}
          />
        )}
      </div>
    </div>
  );
};

export default LogInForm;
