import React, { useState } from "react";
import LiveSearch from "../admin/LiveSearch";
import { commonInputClasses } from "../../utils/Theme";
import { renderItem } from "../admin/MovieForm";
import { useNotification } from "../../hooks";

const defaultCastInfo = {
  profile: {},
  roleAs: "",
  leadActor: false,
};

export const results = [
  {
    id: "1",
    avatar:
      "https://images.unsplash.com/photo-1643713303351-01f540054fd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "John Doe",
  },
  {
    id: "2",
    avatar:
      "https://images.unsplash.com/photo-1643883135036-98ec2d9e50a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Chandri Anggara",
  },
  {
    id: "3",
    avatar:
      "https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Amin RK",
  },
  {
    id: "4",
    avatar:
      "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Edward Howell",
  },
  {
    id: "5",
    avatar:
      "https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Amin RK",
  },
  {
    id: "6",
    avatar:
      "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Edward Howell",
  },
];

const CastForm = ({ onSubmit }) => {
  const { updateNotification } = useNotification();

  const [castInfo, setCastInfo] = useState({ ...defaultCastInfo });

  const { leadActor, profile, roleAs } = castInfo;

  const handleOnchange = ({ target }) => {
    const { checked, name, value } = target;

    if (name === "leadActor")
      return setCastInfo({ ...castInfo, leadActor: checked });

    setCastInfo({ ...castInfo, [name]: value });
  };

  const handleProfileSelect = (profile) => {
    setCastInfo({ ...castInfo, profile });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { leadActor, profile, roleAs } = castInfo;

    if (!profile.name)
      return updateNotification("error", "Cast profile is missing");

    if (!roleAs.trim())
      return updateNotification("error", "Cast role is missing");

    onSubmit(castInfo);
    setCastInfo({ ...defaultCastInfo });
  };

  return (
    <div className='flex items-center space-x-2'>
      <input
        type='checkbox'
        name='leadActor'
        className='w-4 h-4'
        checked={leadActor}
        onChange={handleOnchange}
        title='Set as lead actor'
      />
      <LiveSearch
        placeholder='Search Profile'
        value={profile.name}
        results={results}
        onSelect={handleProfileSelect}
        renderItem={renderItem}
      ></LiveSearch>
      <span className='dark:text-dark-subtle text-light-subtle font-semibold'>
        as
      </span>

      <div className='flex-grow'>
        <input
          type='text'
          className={commonInputClasses + "rounded p-1 text-lg border-2"}
          placeholder='Role as'
          name='roleAs'
          value={roleAs}
          onChange={handleOnchange}
        />
      </div>
      <button
        type='button'
        onClick={handleSubmit}
        className='bg-secondary dark:bg-white dark:text-primary text-white rounded p-2'
      >
        Add
      </button>
    </div>
  );
};

export default CastForm;
