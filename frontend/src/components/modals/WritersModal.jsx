import React from "react";
import ModalContainer from "./ModalContainer";
import { AiOutlineClose } from "react-icons/ai";

const WritersModal = ({ profiles = [], visible, onClose, onRemoveClick }) => {
  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <div className='space-y-3 dark:bg-primary bg-white rounded max-w-[45rem] max-h-[40rem] overflow-auto p-4 custom-scroll-bar'>
        {profiles.length > 0 ? (
          profiles.map(({ id, name, avatar }) => (
            <div
              className='flex space-x-3 items-center dark:bg-secondary bg-white drop-shadow-md rounded p-2'
              key={id}
            >
              <img
                className='w-10 h-10 rounded-full object-cover aspect-square'
                src={avatar}
                alt={name}
              />
              <p className='font-semibold dark:text-white text-primary w-full'>
                {name}
              </p>
              <button
                onClick={() => onRemoveClick(id)}
                className='dark:text-white text-primary hover:opacity-80 transition p-2'
              >
                <AiOutlineClose />
              </button>
            </div>
          ))
        ) : (
          <p className='dark:text-dark-subtle text-primary'>
            Please select writers
          </p>
        )}
      </div>
    </ModalContainer>
  );
};

export default WritersModal;
