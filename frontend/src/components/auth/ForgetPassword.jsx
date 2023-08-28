import React, { useState } from 'react';
import FormInput from '../forms/FormInput';
import Title from '../forms/Title';
import Container from '../Container';
import CustomLink from '../CustomLink';
import Submit from '../forms/Submit';
import FormContainer from '../forms/FormContainer';
import { commonModalClasses } from '../../utils/Theme';
import { isValidEmail } from '../../utils/helper';
import { useNotification } from '../../hooks';
import { forgetPassword } from '../../api/auth';

const ForgetPassword = () => {
  const { updateNotification } = useNotification();

  const [email, setEmail] = useState('');

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setEmail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email))
      return updateNotification('error', 'Invalid email');

    const { error, message } = await forgetPassword(email);

    if (error) return updateNotification('error', error);

    updateNotification('success', message);
  };
  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + ' w-96'} onSubmit={handleSubmit}>
          <Title>Forgot Password?</Title>
          <p className='text-center dark:text-dark-subtle text-light-subtle mt-2 mb-4'>
            Please enter your email to receive link to reset your password.
          </p>
          <FormInput
            label='Email'
            placeholder='Enter your email'
            name='email'
            onChange={handleChange}
            value={email}
          />

          <Submit value='Send Link' />
          <div className='flex justify-between mt-4'>
            <CustomLink to='/auth/sign-in'>Back to Sign In</CustomLink>
            <CustomLink to='/auth/sign-up'>Sign Up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
};

export default ForgetPassword;
