import React, { useContext, useEffect, useState } from 'react';
import Container from '../Container';
import Title from '../forms/Title';
import FormInput from '../forms/FormInput';
import Submit from '../forms/Submit';
import { commonModalClasses } from '../../utils/Theme';
import FormContainer from '../forms/FormContainer';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ImSpinner3 } from 'react-icons/im';
import { resetPassword, verifyPassResetToken } from '../../api/auth';
import { useNotification } from '../../hooks';

const ConfirmPassword = () => {
  const [password, setPassword] = useState({
    one: '',
    two: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setPassword({ ...password, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password.one.trim())
      return updateNotification('error', 'Password is missing!');

    if (password.one.trim().length < 8)
      return updateNotification(
        'error',
        'Password must be atleast 8 characters long'
      );

    if (password.one !== password.two)
      return updateNotification('error', 'Passwords do not match');

    const { error, message } = await resetPassword({
      newPassword: password.one,
      userId: id,
      token,
    });

    if (error) return updateNotification('error', error);

    updateNotification('success', message);
    navigate('/auth/sign-in', { replace: true });
  };

  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);

  const { updateNotification } = useNotification();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const id = searchParams.get('id');

  useEffect(() => {
    isValidToken();
  }, []);

  const isValidToken = async () => {
    const { error, valid } = await verifyPassResetToken(token, id);

    setIsVerifying(false);
    if (error) {
      navigate('/auth/reset-password', { replace: true });
      return updateNotification('error', error);
    }
    if (!valid) {
      setIsValid(false);
      return navigate('/auth/reset-password', { replace: true });
    }

    setIsValid(true);
  };

  if (isVerifying)
    return (
      <FormContainer>
        <Container>
          <div className='flex space-x-2 items-center'>
            <h1 className='text-2xl font-semibold dark:text-white text-primary'>
              Please wait we are verifying your token
            </h1>
            <ImSpinner3 className='animate-spin text-2xl dark:text-white text-primary' />
          </div>
        </Container>
      </FormContainer>
    );

  if (!isValid)
    return (
      <FormContainer>
        <Container>
          <div className='flex space-x-2 items-center'>
            <h1 className='text-2xl font-semibold dark:text-white text-primary'>
              Sorry ! The token is invalid
            </h1>
          </div>
        </Container>
      </FormContainer>
    );

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + ' w-96'}>
          <Title>Enter New Password</Title>

          <FormInput
            label='New Password'
            placeholder='Enter new password'
            name='one'
            type='password'
            onChange={handleChange}
            value={password.one}
          />
          <FormInput
            label='Confirm Password'
            placeholder='Re-Enter password'
            name='two'
            type='password'
            value={password.two}
            onChange={handleChange}
          />

          <Submit value='Change Password' />
        </form>
      </Container>
    </FormContainer>
  );
};

export default ConfirmPassword;
