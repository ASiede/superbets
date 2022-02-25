import RegisterUserForm from '../RegisterUser/RegisterUserForm';
import LogInForm from '../LogInForm/LogInForm';
import './LogIn.css';

export const LogIn = () => {
  return (
    <div className='login-container'>
      <div className='forms-container'>
        <div className='login darkblue-bg'>
          <h4 className='blue-text'>Log In</h4>
          <LogInForm />
        </div>
        <div className='register darkblue-bg'>
          <h4 className='blue-text'>Register as New User</h4>
          <RegisterUserForm />
        </div>
      </div>
    </div>
  );
};

export default LogIn;
