import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Container from '../Container';
import Title from '../forms/Title';
import Submit from '../forms/Submit';
import FormContainer from '../forms/FormContainer';
import { commonModalClasses } from '../../utils/Theme';
import { resendEmailVerificationToken, verifyUserEmail } from '../../api/auth';
import { useAuth, useNotification } from '../../hooks';

const OTP_LENGTH = 6;
let currentOTPIndex;

const isValidOtp = (otp) => {
  let valid = false;

  for (let val of otp) {
    valid = !isNaN(parseInt(val));
    if (!valid) break;
  }

  return valid;
};

const EmailVerification = () => {
  const { isAuth, authInfo } = useAuth();
  const { isLoggedIn, profile } = authInfo;
  const isVerified = profile?.isVerified;

  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(''));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);

  console.log(otp);

  const inputRef = useRef();

  const { updateNotification } = useNotification();

  const { state } = useLocation();
  const user = state?.user;

  const navigate = useNavigate();

  const focusPreviousInputField = (index) => {
    setActiveOtpIndex(index - 1);
  };
  const focusNextInputField = (index) => {
    setActiveOtpIndex(index + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(otp);

    if (!isValidOtp(otp)) {
      return updateNotification('error', 'Invalid OTP');
    }

    const {
      error,
      message,
      user: userResponse,
    } = await verifyUserEmail({
      userId: user.id,
      otp: otp.join(''),
    });

    if (error) return updateNotification('error', error);
    updateNotification('success', message);

    localStorage.setItem('auth-token', userResponse.token);
    isAuth();
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    const newOtp = [...otp];
    newOtp[currentOTPIndex] = value.substring(value.length - 1, value.length);

    if (!value) {
      focusPreviousInputField(currentOTPIndex);
    } else {
      focusNextInputField(currentOTPIndex);
    }
    setOtp(newOtp);
  };

  const handleKeyDown = ({ key }, index) => {
    currentOTPIndex = index;
    if (key === 'Backspace') {
      focusPreviousInputField(index);
    }
  };

  const handleResendEmailVerifiToken = async () => {
    const { error, message } = await resendEmailVerificationToken(user.id);

    if (error) return updateNotification('error', error);

    updateNotification('success', message);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  useEffect(() => {
    if (!user) navigate('/not-found');
    if (isLoggedIn && isVerified) navigate('/');
  }, [user, isLoggedIn, isVerified]);

  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses} onSubmit={handleSubmit}>
          <Title>Verify OTP</Title>
          <p className='text-center dark:text-dark-subtle text-light-subtle mt-2 mb-4'>
            OTP has been sent to your email.
          </p>
          <div className='flex justify-center items-center space-x-4'>
            {otp.map((_, index) => {
              return (
                <input
                  key={index}
                  value={otp[index] || ''}
                  ref={activeOtpIndex === index ? inputRef : null}
                  type='number'
                  onChange={handleOtpChange}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className='w-10 h-10 border-2 rounded dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary bg-transparent outline-none text-center dark:text-white font-semibold text-lg'
                />
              );
            })}
          </div>

          <div>
            <Submit value='Verify Account' />
            <button
              type='button'
              onClick={handleResendEmailVerifiToken}
              className='dark:text-white text-blue-500 font-semibold hover:underline w-full mt-2'
            >
              Get new OTP
            </button>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
};

export default EmailVerification;
