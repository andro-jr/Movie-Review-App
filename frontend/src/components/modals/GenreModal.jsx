import React, { useEffect, useState } from "react";
import ModalContainer from "./ModalContainer";
import genres from "../../utils/genres";
import Submit from "../forms/Submit";

const GenreModal = ({ visible, onClose, onSubmit, previousGenres }) => {
  const [selectedGenres, setselectedGenres] = useState([]);

  const handleGenresSelector = (genre) => {
    let newGenres = [];

    if (selectedGenres.includes(genre)) {
      newGenres = selectedGenres.filter((gen) => gen !== genre);
    } else {
      newGenres = [...selectedGenres, genre];
    }

    setselectedGenres(newGenres);
  };

  const handleSubmit = () => {
    onSubmit(selectedGenres);
    onClose();
  };

  const handleClose = () => {
    setselectedGenres(previousGenres);
    onClose();
  };

  useEffect(() => {
    setselectedGenres(previousGenres);
  }, []);

  return (
    <ModalContainer visible={visible} onClose={handleClose}>
      <div className='flex flex-col justify-between h-full'>
        <div>
          <h1 className='dark:text-white text-primary text-2xl font-semibold text-center'>
            Select Genres
          </h1>
          <div className='space-y-3'>
            {genres.map((genre) => {
              return (
                <Genre
                  onClick={() => handleGenresSelector(genre)}
                  key={genre}
                  selected={selectedGenres.includes(genre)}
                >
                  {genre}
                </Genre>
              );
            })}
          </div>
        </div>

        <Submit value='Select' type='button' onClick={handleSubmit} />
      </div>
    </ModalContainer>
  );
};

const Genre = ({ children, selected, onClick }) => {
  const getSelectedStyle = () => {
    return selected
      ? "dark:bg-white dark:text-primary bg-light-subtle text-white "
      : "text-primary dark:text-white ";
  };

  return (
    <button
      type='button'
      onClick={onClick}
      className={
        getSelectedStyle() +
        "border-2 dark:border-dark-subtle border-light-subtle   p-1 rounded mr-3"
      }
    >
      {children}
    </button>
  );
};

export default GenreModal;
