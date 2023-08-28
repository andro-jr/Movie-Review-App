import React from 'react';
import { useAuth } from '../../hooks';
import Container from '../Container';
import { useNavigate } from 'react-router-dom';
import ResendEmailVerification from '../users/ResendEmailVerification';

const Home = () => {
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;
  const isVerified = authInfo.profile?.isVerified;

  return (
    <Container>
      {isLoggedIn && !isVerified && <ResendEmailVerification />}
      Home
    </Container>
  );
};

export default Home;
