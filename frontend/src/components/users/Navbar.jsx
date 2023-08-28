import React from 'react';
import { BsFillSunFill } from 'react-icons/bs';
import Container from '../Container';
import { Link } from 'react-router-dom';
import { useAuth, useTheme } from '../../hooks';

const Navbar = () => {
  const { toggleTheme } = useTheme();

  const { authInfo, handleLogout } = useAuth();
  const { isLoggedIn } = authInfo;

  return (
    <div className='bg-secondary shadow-sm shadow-gray-500'>
      <Container className='p-4'>
        <div className='flex justify-between items-center'>
          <Link to='/'>
            <img src='./logo.png' alt='' className='h-10' />
          </Link>
          <ul className='flex align-middle space-x-6'>
            <li>
              <button
                onClick={toggleTheme}
                className='dark:bg-white bg-dark-subtle p-1 rounded'
              >
                <BsFillSunFill className='text-secondary' size={24} />
              </button>
            </li>
            <li>
              <input
                type='text'
                className='border-2 border-dark-subtle rounded bg-transparent text-lg outline-none focus:border-white p-1 pl-3 pt-0 transition text-white'
                placeholder='Search'
              />
            </li>

            <li>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className='text-white font-semibold text-lg'
                >
                  Logout
                </button>
              ) : (
                <Link
                  to='/auth/sign-in'
                  className='text-white font-semibold text-lg'
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
