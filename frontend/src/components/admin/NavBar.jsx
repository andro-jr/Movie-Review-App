import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BiHomeAlt2, BiMoviePlay, BiUser } from 'react-icons/bi';
import { CiLogout } from 'react-icons/ci';
import { useAuth } from '../../hooks';

const NavBar = () => {
  const { handleLogout } = useAuth();

  return (
    <nav className='w-48 min-h-screen bg-secondary border-right border-gray-300 flex flex-col justify-between'>
      <div className='pl-5 sticky top-0 flex flex-col justify-between h-screen'>
        <ul>
          <li className='mb-6'>
            <Link to='/'>
              <img src='./logo.png' alt='logo' className='h-14 p-2' />
            </Link>
          </li>
          <li>
            <NavItem to='/'>
              <BiHomeAlt2 />
              <span>Home</span>
            </NavItem>
          </li>
          <li>
            <NavItem to='/movies'>
              <BiMoviePlay />
              <span>Movies</span>
            </NavItem>
          </li>
          <li>
            <NavItem to='/actors'>
              <BiUser />
              <span>Actors</span>
            </NavItem>
          </li>
        </ul>
        <div className='flex flex-col items-start pb-5 pl-3'>
          {/* <span className='font-semibold text-white text-xl'>Admin</span> */}
          <button
            className='flex items-center text-dark-subtle text-sm hover:text-white transition gap-2'
            onClick={handleLogout}
          >
            <CiLogout />
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ children, to }) => {
  const commonClasses =
    ' flex items-center text-lg space-x-2 p-2 hover:opacity-80';
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        (isActive ? 'text-white' : 'text-gray-400') + commonClasses
      }
    >
      {children}
    </NavLink>
  );
};

export default NavBar;
