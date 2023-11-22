import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useNotification } from "../../hooks";
import { uploadTrailer } from "../../api/movie";
import MovieForm from "./MovieForm";

const MovieUpload = () => {
  const [videoSelected, setvideoSelected] = useState(false);
  const [videoUploaded, setvideoUploaded] = useState(false);
  const [uploadProgress, setuploadProgress] = useState(0);
  const [trailerInfro, setTrailerInfo] = useState({});

  const { updateNotification } = useNotification();

  const handleUploadTrailer = async (formData) => {
    setvideoSelected(true);
    const { url, public_id, error } = await uploadTrailer(
      formData,
      setuploadProgress
    );

    if (error) {
      return updateNotification("error", error);
    }

    setvideoUploaded(true);
    setTrailerInfo({ url, public_id });
    updateNotification("success", "Movie uploaded Successfully to cloud!");
  };

  const handleChange = (file) => {
    const formData = new FormData();
    formData.append("video", file);

    console.log("hit");
    handleUploadTrailer(formData);
  };

  const handleTypeError = (error) => {
    updateNotification("error", error);
  };

  const getUploadProgressValue = () => {
    if (!videoUploaded && uploadProgress >= 100) {
      return "Processing !";
    }
    return `Upload Progress: ${uploadProgress}`;
  };

  return (
    <div className='fixed inset-0 dark:bg-white dark:bg-opacity-50 bg-primary bg-opacity-50 backdrop-blur-sm flex justify-center items-center'>
      <div className='dark:bg-primary bg-white rounded w-[45rem] h-[40rem] overflow-auto p-2 custom-scroll-bar'>
        {/* <ProgressBar
          visible={!videoUploaded && videoSelected}
          message={getUploadProgressValue()}
          width={uploadProgress}
        />
        <TrailerSelector
          visible={!videoSelected}
          handleChange={handleChange}
          onTypeError={handleTypeError}
        /> */}

        <MovieForm />
      </div>
    </div>
  );
};

const TrailerSelector = ({ visible, handleChange, onTypeError }) => {
  if (!visible) return null;

  return (
    <div className='h-full flex items-center justify-center'>
      <FileUploader
        handleChange={handleChange}
        name='file'
        types={["mp4", "avi"]}
        onTypeError={onTypeError}
      >
        <div className='w-56 h-56 border border-dashed dark:border-dark-subtle border-light-subtle rounded-full flex justify-center items-center flex-col dark:text-dark-subtle text-light-subtle cursor-pointer'>
          <AiOutlineCloudUpload size={80} />
          <p>Drop your file here!</p>
        </div>
      </FileUploader>
    </div>
  );
};

const ProgressBar = ({ message, width, visible }) => {
  if (!visible) return null;

  return (
    <div className='dark:bg-secondary bg-white drop-shadow-lg rounded p-3'>
      <div className='relative h-3 dark:bg-dark-subtle bg-light-subtle overflow-hidden'>
        <div
          style={{ width: width + "%" }}
          className='h-full absolute left-0 dark:bg-white bg-secondary'
        />
      </div>
      <p className='mt-1 dark:text-dark-subtle text-light-subtle animate-pulse'>
        {message}
      </p>
    </div>
  );
};

export default MovieUpload;
