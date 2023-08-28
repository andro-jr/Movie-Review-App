import React, { useEffect, useState } from 'react';
import Container from '../Container';
import Title from '../forms/Title';
import FormInput from '../forms/FormInput';
import Submit from '../forms/Submit';
import CustomLink from '../CustomLink';
import { commonModalClasses } from '../../utils/Theme';
import FormContainer from '../forms/FormContainer';
import { useAuth, useNotification } from '../../hooks';
import { useNavigate } from 'react-router-dom';

const validateUserInfo = ({ email, password }) => {
  const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!email.trim()) return { ok: false, error: 'Email is missing' };
  if (!isValidEmail.test(email))
    return { ok: false, error: 'Email is invalid' };
  if (!password.trim()) return { ok: false, error: 'Password is missing' };
  if (password.length < 8)
    return { ok: false, error: 'Password must be 8 characters long' };

  return { ok: true };
};

const SignIn = () => {
  const navigate = useNavigate();

  const { updateNotification } = useNotification();

  const { handleLogin, authInfo } = useAuth();
  const { isPending, isLoggedIn } = authInfo;

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) return updateNotification('error', error);

    handleLogin(userInfo.email, userInfo.password);
  };

  // useEffect(() => {
  //   if (isLoggedIn) navigate('/');
  // }, [isLoggedIn]);

  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + ' w-96'} onSubmit={handleSubmit}>
          <Title>Sign In</Title>
          <FormInput
            label='Email'
            placeholder='Enter your email'
            name='email'
            value={userInfo.email}
            onChange={handleChange}
          />
          <FormInput
            label='Password'
            placeholder='Enter your password'
            name='password'
            type='password'
            value={userInfo.password}
            onChange={handleChange}
          />
          <Submit value='Sign In' busy={isPending} />
          <div className='flex justify-between mt-4'>
            <CustomLink to='/auth/forget-password'>Forgot password</CustomLink>
            <CustomLink to='/auth/sign-up'>Sign Up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
};

export default SignIn;
