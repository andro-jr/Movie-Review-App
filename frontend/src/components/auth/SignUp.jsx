import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../Container';
import Title from '../forms/Title';
import FormInput from '../forms/FormInput';
import Submit from '../forms/Submit';
import CustomLink from '../CustomLink';
import { commonModalClasses } from '../../utils/Theme';
import FormContainer from '../forms/FormContainer';
import { createUser } from '../../api/auth';
import { useAuth, useNotification } from '../../hooks';

const validateUserInfo = ({ name, email, password }) => {
  const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const isValidName = /^[a-z A-Z]+$/;

  if (!name.trim()) return { ok: false, error: 'name is missing' };
  if (!isValidName.test(name)) return { ok: false, error: 'Invalid name' };
  if (!email.trim()) return { ok: false, error: 'Email is missing' };
  if (!isValidEmail.test(email))
    return { ok: false, error: 'Email is invalid' };
  if (!password.trim()) return { ok: false, error: 'Password is missing' };
  if (password.length < 8)
    return { ok: false, error: 'Password must be 8 characters long' };

  return { ok: true };
};

const SignUp = () => {
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const { updateNotification } = useNotification();

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const { name, email, password } = userInfo;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);
    if (!ok) return updateNotification('error', error);

    const response = await createUser(userInfo);
    if (response.error) return updateNotification('error', response.error);

    navigate('/auth/verification', {
      state: { user: response.user },
      replace: true,
    });
    updateNotification(
      'success',
      'Account Created Please Verify Your email Address'
    );
  };

  useEffect(() => {
    if (isLoggedIn) navigate('/');
  }, [isLoggedIn]);

  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + ' w-96'} onSubmit={handleSubmit}>
          <Title>Sign Up</Title>
          <FormInput
            value={name}
            label='Name'
            onChange={handleChange}
            placeholder='Enter your name'
            name='name'
          />
          <FormInput
            value={email}
            label='Email'
            onChange={handleChange}
            placeholder='Enter your email'
            name='email'
          />
          <FormInput
            value={password}
            label='Password'
            onChange={handleChange}
            placeholder='Enter your password'
            name='password'
            type='password'
          />
          <Submit value='Sign Up' />
          <div className='mt-4 flex justify-center items-center dark:text-white text-primary'>
            Already have an account? &nbsp;
            <CustomLink to='/auth/sign-in'>Sign In</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
};

export default SignUp;
