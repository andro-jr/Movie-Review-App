import React from 'react';
import { useAuth } from '../../hooks';
import { useNavigate } from 'react-router-dom';

const ResendEmailVerification = () => {
  const { authInfo } = useAuth();

  const navigate = useNavigate();

  const navigateToVerification = () => {
    navigate('/auth/verification', {
      state: {
        user: authInfo.profile,
      },
    });
  };
  return (
    <p className='text-sm text-center bg-blue-50 p-2 mb-5'>
      It looks like you haven't verified your account,{' '}
      <button
        onClick={navigateToVerification}
        className='text-blue-500 font-semibold hover:underline'
      >
        Verify Account
      </button>
    </p>
  );
};

export default ResendEmailVerification;
