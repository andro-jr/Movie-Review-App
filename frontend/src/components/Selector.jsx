import React from "react";

const Selector = ({ name, value, label, onChange, options }) => {
  return (
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className='border-2 dark:border-dark-subtle border-light-subtle p-1 dark:focus:border-white focus:border-primary outline-none transition rounded bg-transparent text-light-subtle dark:text-dark-subtle dark:focus:text-white focus:text-primary pr-10 pt-[1px]'
    >
      <option value=''>{label}</option>
      {options.map((option) => {
        const { title, value } = option;
        return <option value={value}>{title}</option>;
      })}
    </select>
  );
};

export default Selector;
