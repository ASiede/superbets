import RegisterUserForm from '../RegisterUser/RegisterUserForm';
import LogInForm from '../LogInForm/LogInForm';
import { SnackbarType } from '../../Types';
import './LogIn.css';

export const LogIn = ({
  manageSnackbars
}: {
  manageSnackbars: SnackbarType[];
}) => {
  return (
    <div className='login-container'>
      <div className='forms-container'>
        <div className='login darkblue-bg'>
          <h4 className='blue-text'>Log In</h4>
          <LogInForm manageSnackbars={manageSnackbars} />
        </div>
        <div className='register darkblue-bg'>
          <h4 className='blue-text'>Register as New User</h4>
          <RegisterUserForm manageSnackbars={manageSnackbars} />
        </div>
      </div>
    </div>
  );
};

export default LogIn;
