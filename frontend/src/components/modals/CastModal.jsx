import React from "react";
import ModalContainer from "./ModalContainer";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

const CastModal = ({ casts = [], visible, onClose, onRemoveClick }) => {
  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <div className='space-y-3 dark:bg-primary bg-white rounded max-w-[45rem] max-h-[40rem] overflow-auto p-4 custom-scroll-bar'>
        {casts.length > 0 ? (
          casts.map(({ profile, roleAs, leadActor }) => {
            const { name, avatar, id } = profile;
            return (
              <div
                className='flex space-x-3 items-center dark:bg-secondary bg-white drop-shadow-md rounded p-2'
                key={id}
              >
                <img
                  className='w-10 h-10 rounded-full object-cover aspect-square'
                  src={avatar}
                  alt={name}
                />
                <div className='flex flex-col justify-between w-full'>
                  <div>
                    <p className='w-full font-semibold dark:text-white text-primary'>
                      {name}
                    </p>
                    <p className='text-sm dark:text-dark-subtle text-light-subtle'>
                      {roleAs}
                    </p>
                  </div>
                  {leadActor && (
                    <AiOutlineCheck className='text-light-subtle dark:text-dark-subtle' />
                  )}
                </div>
                <button
                  onClick={() => onRemoveClick(id)}
                  className='dark:text-white text-primary hover:opacity-80 transition p-2'
                >
                  <AiOutlineClose />
                </button>
              </div>
            );
          })
        ) : (
          <p className='dark:text-dark-subtle text-primary'>
            Please select cast members
          </p>
        )}
      </div>
    </ModalContainer>
  );
};

export default CastModal;
