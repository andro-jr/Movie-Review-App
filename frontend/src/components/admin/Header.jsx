import React, { useEffect, useRef, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import Container from '../Container';
import { BsFillSunFill } from 'react-icons/bs';
import { useTheme } from '../../hooks';

const Header = ({ onAddMovieClick, onAddActorClick }) => {
  const [showOptions, setShowOptions] = useState(false);
  const { toggleTheme } = useTheme();

  const options = [
    { title: 'Add Movie', onClick: onAddMovieClick },
    { title: 'Add Actor', onClick: onAddActorClick },
  ];

  return (
    <div className='flex items-center justify-between'>
      <input
        type='text'
        placeholder='Search Movies..'
        className='border-2 dark:border-dark-subtle border-light-subtle  dark:focus:border-white focus:border-primary dark:text-white text-primary transition bg-transparent rounded text-lg p-1 outline-none placeholder:text-sm'
      />
      <div className='relative'>
        <div className='flex items-center space-x-3'>
          <button
            onClick={toggleTheme}
            className='dark:text-white text-light-subtle'
          >
            <BsFillSunFill size={24} />
          </button>
          <button
            onClick={() => setShowOptions(true)}
            className='flex items-center space-x-2 dark:border-dark-subtle border-light-subtle hover:border-primary dark:text-white text-secondary hover:opacity-80 transition font-semibold border-2 rounded text-base px-3 py-1'
          >
            <span>Create</span>
            <AiOutlinePlus></AiOutlinePlus>
          </button>

          <CreateOptions
            visible={showOptions}
            onClose={() => setShowOptions(false)}
            options={options}
          />
        </div>
      </div>
    </div>
  );
};

const CreateOptions = ({ options, visible, onClose }) => {
  const container = useRef();
  const containerID = 'option-container';
  useEffect(() => {
    const handleClose = (e) => {
      if (!visible) return;
      const { parentElement, id } = e.target;
      if (parentElement.id === containerID || id === containerID) return;

      if (container.current) {
        if (!container.current.classList.contains('animate-scale'))
          container.current.classList.add('animate-scale-reverse');
      }
    };

    document.addEventListener('click', handleClose);
    return () => {
      document.removeEventListener('click', handleClose);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      id={containerID}
      ref={container}
      className='absolute right-0 top-12 flex flex-col space-y-3 p-3 text-sm dark:bg-secondary bg-white drop-shadow-lg rounded w-full animate-scale'
      onAnimationEnd={(e) => {
        if (e.target.classList.contains('animate-scale-reverse')) onClose();
        e.target.classList.remove('animate-scale');
      }}
    >
      {options.map(({ title, onClick }) => (
        <OptionButton onClick={onClick} key={title}>
          {title}
        </OptionButton>
      ))}
    </div>
  );
};

const OptionButton = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className='dark:text-white text-secondary hover:opacity-80 transition'
    >
      {children}
    </button>
  );
};

export default Header;
