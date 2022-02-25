import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { logInUser } from '../../actions';

export const LogInForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [inProgress, setInProgress] = useState(false);
  const formCompleted = password.length && username.length;

  const handleLogInClick = () => {
    setInProgress(true);
    dispatch(logInUser(username, password));
  };

  return (
    <div className='card login-card'>
      <div>
        <h5 className='login-label'>Username</h5>
        <InputText
          className='p-inputtext-sm'
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <h5 className='login-label'>Password</h5>
        <Password
          id='input'
          className='p-inputtext-sm'
          feedback={false}
          toggleMask={true}
          onChange={(e) => setPassword(e.target.value)}
          onKeyUp={(e) => {
            if (e.code === 'Enter' && formCompleted) {
              handleLogInClick();
            }
          }}
        />
      </div>
      <div className='login-submit'>
        <Button
          loading={inProgress}
          label='Log In'
          onClick={handleLogInClick}
          disabled={!formCompleted}
        />
      </div>
    </div>
  );
};

export default LogInForm;
