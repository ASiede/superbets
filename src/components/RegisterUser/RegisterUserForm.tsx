import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { createToast } from '../../utils/toast/Toast';
import { registerUser } from '../../utils/user/user';
import { TOAST_MESSAGES, TOAST_TYPES } from '../constants';
import { useSelector } from 'react-redux';

const defaultUserData = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: ''
};

export const RegisterUserForm = () => {
  const toast = useSelector((state: any) => state.toast);
  const [newUserData, setNewUserData] = useState(defaultUserData);
  const [validEmail, setValidEmail] = useState(true);
  const [inProgress, setInProgress] = useState(false);

  const formCompleted =
    !Object.values(newUserData).some((v) => v === '') && validEmail;

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
            <small id='email-help' className='p-error p-d-block'>
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
            onKeyUp={(e) => {
              if (e.code === 'Enter' && formCompleted) {
                submitRegistration(
                  newUserData,
                  setNewUserData,
                  setInProgress,
                  toast
                );
              }
            }}
          />
        </div>
        <div className='login-submit'>
          <Button
            loading={inProgress}
            label='Register User'
            onClick={() =>
              submitRegistration(
                newUserData,
                setNewUserData,
                setInProgress,
                toast
              )
            }
            disabled={!formCompleted}
          />
        </div>
      </div>
    </div>
  );
};

export const validateEmail = (email: string, setValidEmail: any) => {
  const re =
    // eslint-disable-next-line
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValid = re.test(email);
  setValidEmail(isValid);
};

export const submitRegistration = async (
  newUserData: any,
  setNewUserData: any,
  setInProgress: any,
  toast: any
) => {
  setInProgress(true);
  const { status, errorMessage } = await registerUser(newUserData);
  if (status === 201) {
    toast.current.show(
      createToast(TOAST_TYPES.SUCCESS, TOAST_MESSAGES.REGISTRATION_SUCCESS)
    );
    // TODO: password doesn't clear
    setNewUserData(defaultUserData);
  } else {
    toast.current.show(createToast(TOAST_TYPES.ERROR, errorMessage));
  }
  setInProgress(false);
};

export default RegisterUserForm;
