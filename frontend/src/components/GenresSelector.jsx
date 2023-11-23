import React from "react";
import { ImTree } from "react-icons/im";

const GenresSelector = ({ badge, onClick }) => {
  const renderBadge = () => {
    return (
      <span className='dark:bg-dark-subtle bg-light-subtle text-white absolute top-0 right-0 w-5 h-5 rounded-full flex justify-center items-center translate-x-6 text-xs'>
        {badge <= 9 ? badge : "9+"}
      </span>
    );
  };
  return (
    <button
      onClick={onClick}
      type='button'
      className='relative flex items-center space-x-2 py-1 px-3 border-2 daark:border-dark-subtle border-light-subtle dark:hover:border-white hover:border-primary transition dark:text-dark-subtle text-light-subtle hover:text-primary rounded'
    >
      <ImTree />
      <span>Select Genres</span>
      {renderBadge()}
    </button>
  );
};

export default GenresSelector;
