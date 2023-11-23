import React, { useState } from "react";
import TagsInput from "./TagsInput";
import LiveSearch from "./LiveSearch";
import Submit from "../forms/Submit";
import { commonInputClasses } from "../../utils/Theme";
import { useNotification } from "../../hooks";
import ModalContainer from "../modals/ModalContainer";
import WritersModal from "../modals/WritersModal";
import CastForm from "../forms/CastForm";
import CastModal from "../modals/CastModal";
import PosterSelector from "../PosterSelector";
import GenresSelector from "../GenresSelector";
import GenreModal from "../modals/GenreModal";
import Selector from "../Selector";
import {
  typeOptions,
  languageOptions,
  statusOptions,
} from "../../utils/options";

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

export const renderItem = (result) => {
  return (
    <div key={result.id} className='flex rounded overflow-hidden space-x-2'>
      <img
        src={result.avatar}
        alt=''
        className='w-10 h-10 object-cover rounded'
      />
      <p className='dark:text-white font-semibold'>{result.name}</p>
    </div>
  );
};

const defaultMovieInfo = {
  title: "",
  storyLine: "",
  tags: [],
  cast: [],
  director: {},
  writers: [],
  relseaseDate: "",
  poster: null,
  genres: [],
  type: "",
  language: "",
  status: "",
};

const MovieForm = () => {
  const [movieInfo, setMovieInfo] = useState({ ...defaultMovieInfo });
  const [showWritersModal, setshowWritersModal] = useState(false);
  const [showCastModal, setshowCastModal] = useState(false);
  const [showGenresModal, setshowGenresModal] = useState(false);
  const [selectedPosterUi, setSelectedPosterUi] = useState("");

  const { updateNotification } = useNotification();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(movieInfo);
  };

  const {
    title,
    storyLine,
    director,
    writers,
    cast,
    tags,
    genres,
    status,
    type,
    language,
  } = movieInfo;

  const updatePosterForUi = (file) => {
    const url = URL.createObjectURL(file);
    setSelectedPosterUi(url);
  };

  const handleChange = ({ target }) => {
    const { value, name, files } = target;

    if (name === "poster") {
      const poster = files[0];
      updatePosterForUi(poster);
      return setMovieInfo({ ...movieInfo, poster });
    }

    setMovieInfo({ ...movieInfo, [name]: value });
  };
  const updateTags = (tags) => {
    setMovieInfo({ ...movieInfo, tags });
  };
  const updateDirector = (profile) => {
    setMovieInfo({ ...movieInfo, director: profile });
  };
  const updateWriters = (profile) => {
    const { writers } = movieInfo;

    for (let writer of writers) {
      if (writer.id === profile.id) {
        return updateNotification("warning", "Writer already selected");
      }
    }
    setMovieInfo({ ...movieInfo, writers: [...writers, profile] });
  };

  const handleWriterRemove = (profileId) => {
    const { writers } = movieInfo;
    const newWriters = writers.filter(({ id }) => id !== profileId);

    setMovieInfo({ ...movieInfo, writers: newWriters });
  };

  const handleCastRemove = (profileId) => {
    const { cast } = movieInfo;
    const newCast = cast.filter(({ profile }) => !profile.id === profileId);

    setMovieInfo({ ...movieInfo, cast: newCast });
  };

  const updateCast = (newCast) => {
    const { cast } = movieInfo;
    setMovieInfo({ ...movieInfo, cast: [...cast, newCast] });
  };

  const updateGenres = (genres) => {
    setMovieInfo({ ...movieInfo, genres });
  };

  return (
    <>
      <div className='flex space-x-4' onSubmit={handleSubmit}>
        <div className='w-[70%] h-5 space-y-5'>
          <div>
            <Label htmlFor='title'>Title</Label>
            <input
              id='title'
              type='text'
              value={title}
              onChange={handleChange}
              name='title'
              className={commonInputClasses + "border-b-2 font-semibold"}
              placeholder='Titanic'
            />
          </div>
          <div>
            <Label htmlFor='storyLine'>Story Line</Label>
            <textarea
              id='storyLine'
              value={storyLine}
              onChange={handleChange}
              name='storyLine'
              className={commonInputClasses + "resize-none h-24"}
              placeholder='Movie Storyline'
            ></textarea>
          </div>
          <div>
            <Label htmlFor='tags'>Tags</Label>
            <TagsInput name='tags' value={tags} onChange={updateTags} />
          </div>
          <div>
            <Label htmlFor='director'>Director</Label>
            <LiveSearch
              name='director'
              value={director.name}
              results={results}
              placeholder='Search profile'
              renderItem={renderItem}
              onSelect={updateDirector}
            />
          </div>
          <div>
            <div className='flex justify-between'>
              <LabelwithBadge htmlFor='writers' badge={writers.length}>
                Writers
              </LabelwithBadge>
              <ViewAllBtn
                visible={writers.length}
                onClick={() => setshowWritersModal(true)}
              >
                View All
              </ViewAllBtn>
            </div>

            <LiveSearch
              name='writers'
              // value={director.name}
              results={results}
              placeholder='Search profile'
              renderItem={renderItem}
              onSelect={updateWriters}
            />
          </div>

          <div>
            <div className='flex justify-between'>
              <LabelwithBadge htmlFor='writers' badge={cast.length}>
                Add Cast and Crew
              </LabelwithBadge>
              <ViewAllBtn
                visible={cast.length}
                onClick={() => setshowCastModal(true)}
              >
                View All
              </ViewAllBtn>
            </div>

            <CastForm onSubmit={updateCast} />
          </div>

          <input
            type='date'
            className={commonInputClasses + "border-2 rounded p-1 w-auto"}
            onChange={handleChange}
            name='releaseDate'
          />

          <Submit value='Upload' onClick={handleSubmit} type='button' />
        </div>
        <div className='w-[30%] space-y-5'>
          <PosterSelector
            name='poster'
            onChange={handleChange}
            selectedPoster={selectedPosterUi}
            accept='image/jpg, image/jpeg, image/png'
          />
          <GenresSelector
            onClick={() => setshowGenresModal(true)}
            badge={genres.length}
          />

          <Selector
            label='Type'
            options={typeOptions}
            onChange={handleChange}
            name='type'
            value={type}
          />
          <Selector
            label='Language'
            options={languageOptions}
            onChange={handleChange}
            name='language'
            value={language}
          />
          <Selector
            label='Status'
            options={statusOptions}
            onChange={handleChange}
            name='status'
            value={status}
          />
        </div>
      </div>
      <WritersModal
        visible={showWritersModal}
        onClose={() => setshowWritersModal(false)}
        profiles={writers}
        onRemoveClick={handleWriterRemove}
      />
      <CastModal
        visible={showCastModal}
        onClose={() => setshowCastModal(false)}
        casts={cast}
        onRemoveClick={handleCastRemove}
      />
      <GenreModal
        visible={showGenresModal}
        onClose={() => setshowGenresModal(false)}
        onSubmit={updateGenres}
        previousGenres={genres}
      />
    </>
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

const LabelwithBadge = ({ children, htmlFor, badge = 0, showBadge }) => {
  const renderBadge = () => {
    return (
      <span className='dark:bg-dark-subtle bg-light-subtle text-white absolute top-0 right-0 w-5 h-5 rounded-full flex justify-center items-center translate-x-6 text-xs'>
        {badge <= 9 ? badge : "9+"}
      </span>
    );
  };

  return (
    <div className='relative'>
      <Label
        htmlFor={htmlFor}
        className='dark:text-dark-subtle text-light-subtle font-semibold'
      >
        {children}
      </Label>
      {badge > 0 && renderBadge()}
    </div>
  );
};

const ViewAllBtn = ({ children, onClick, visible }) => {
  if (!visible) return null;

  return (
    <button
      type='button'
      onClick={onClick}
      className='dark:text-white text-primary hover:underline transition'
    >
      View All
    </button>
  );
};

export default MovieForm;
