import React from "react";

const commonPosterUi =
  "flex justify-center items-center border border-dashed rounded aspect-video dark:border-dark-subtle border-light-subtle cursor-pointer ";

const PosterSelector = ({ name, onChange, selectedPoster, accept }) => {
  return (
    <div>
      <input
        onChange={onChange}
        name={name}
        type='file'
        hidden
        id={name}
        accept={accept}
      />
      <label htmlFor={name}>
        {selectedPoster ? (
          <img
            src={selectedPoster}
            alt=''
            className={commonPosterUi + "object-cover"}
          />
        ) : (
          <PosterUi />
        )}
      </label>
    </div>
  );
};

const PosterUi = () => {
  return (
    <div className={commonPosterUi}>
      <span className='dark:text-dark-subtle text-light-subtle'>
        Selected Poster
      </span>
    </div>
  );
};

export default PosterSelector;
