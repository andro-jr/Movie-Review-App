import React from 'react';

const FormInput = ({ name, placeholder, label, type, ...rest }) => {
  return (
    <div className='flex flex-col-reverse my-3'>
      <input
        name={name}
        id={name}
        className='bg-transparent rounded border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary w-full text-lg outline-none pl-3 p-1 dark:text-white text-primary peer transition'
        placeholder={placeholder}
        {...rest}
        type={type || 'text'}
      />
      <label
        htmlFor={name}
        className='font-semibold dark:text-dark-subtle text-light-subtle dark:peer-focus:text-white peer-focus:text-primary transition self-start mb-1'
      >
        {label}
      </label>
    </div>
  );
};

export default FormInput;
