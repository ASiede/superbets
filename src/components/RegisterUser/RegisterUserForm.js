import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { snackbar } from '../../utils/snackbar/Snackbar';
import { registerUser } from '../../utils/user/user';

const defaultUserData = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: ''
};

export const RegisterUserForm = ({ loginSnackbarMessages }) => {
  const [newUserData, setNewUserData] = useState(defaultUserData);
  const [validEmail, setValidEmail] = useState(true);
  return (
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
            onBlur={() => validateEmail(newUserData.email, setValidEmail)}
            onChange={(e) =>
              setNewUserData({ ...newUserData, email: e.target.value })
            }
          />
          {!validEmail && (
            <small id='username2-help' className='p-error p-d-block'>
              Must be a valid email
            </small>
          )}
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
            onClick={() =>
              submitRegistration(
                newUserData,
                loginSnackbarMessages,
                setNewUserData
              )
            }
            disabled={
              Object.values(newUserData).some((v) => v === '') || !validEmail
            }
          />
        </div>
      </div>
    </div>
  );
};

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
  submitRegistrationDataHandler: PropTypes.func,
  loginSnackbarMessages: PropTypes.object
};

export const validateEmail = (email, setValidEmail) => {
  // eslint-disable-next-line
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValid = re.test(email);
  setValidEmail(isValid);
};

export const submitRegistration = async (
  newUserData,
  loginSnackbarMessages,
  setNewUserData
) => {
  const { status, errorMessage } = await registerUser(newUserData);
  if (status === 201) {
    loginSnackbarMessages.current.show(
      snackbar('success', 'Registration Successful!')
    );
    // TODO: password doesn't clear
    setNewUserData(defaultUserData);
  } else {
    loginSnackbarMessages.current.show(snackbar('error', errorMessage));
  }
};

export default RegisterUserForm;
