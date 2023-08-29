import React from 'react';
import TagsInput from './TagsInput';

const commonInputClasses =
  'w-full outline-none border-b-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary transition text-lg bg-transparent dark:text-white text-primary py-1 ';

const MovieForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className='flex space-x-4' onSubmit={handleSubmit}>
      <div className='w-[70%] h-5 space-y-5'>
        <div>
          <Label htmlFor='title'>Title</Label>
          <input
            id='title'
            type='text'
            className={commonInputClasses + 'border-b-2 font-semibold'}
            placeholder='Titanic'
          />
        </div>
        <div>
          <Label htmlFor='storyLine'>Story Line</Label>
          <textarea
            id='storyLine'
            className={commonInputClasses + 'resize-none h-24'}
            placeholder='Movie Storyline'
          ></textarea>
        </div>
        <div>
          <p className='dark:text-dark-subtle text-light-subtle font-semibold mb-2'>
            Tags
          </p>
          <TagsInput />
        </div>
      </div>
      <div className='w-[30%] h-5'></div>
    </form>
  );
};

const Label = ({ children, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className='dark:text-dark-subtle text-light-subtle font-semibold'
    >
      {children}
    </label>
  );
};

export default MovieForm;
