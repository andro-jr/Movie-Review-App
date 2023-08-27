const { isValidObjectId } = require('mongoose');
const cloudinary = require('../cloud');
const { sendError } = require('../utils/helper');
const Movie = require('../models/movie');

exports.uploadTrailer = async (req, res) => {
  const { file } = req;
  if (!file) return sendError(res, 'Video file is missing');

  const { secure_url: url, public_id } = await cloudinary.uploader.upload(
    file.path,
    {
      resource_type: 'video',
    }
  );

  res.status(201).json({ url, public_id });
};

exports.createMovie = async (req, res) => {
  const { file } = req;

  const {
    title,
    storyLine,
    director,
    releaseDate,
    status,
    type,
    genres,
    tags,
    cast,
    writers,
    trailer,
    language,
  } = req.body;

  const newMovie = new Movie({
    title,
    storyLine,
    releaseDate,
    status,
    type,
    genres,
    tags,
    cast,
    trailer,
    language,
  });

  if (director) {
    if (!isValidObjectId(director))
      return sendError(res, 'Invalid Director id!');

    newMovie.director = director;
  }
  if (writers) {
    for (let wId of writers) {
      if (!isValidObjectId(wId)) return sendError(res, 'Invalid writer id!');
    }

    newMovie.writers = writers;
  }

  //uploading poster
  if (file) {
    const {
      secure_url: url,
      public_id,
      responsive_breakpoints,
    } = await cloudinary.uploader.upload(file.path, {
      transformation: { width: 1280, height: 720 },
      responsive_breakpoints: {
        create_derived: true,
        max_width: 640,
        max_images: 3,
      },
    });

    const finalPoster = { url, public_id, responsive: [] };
    const { breakpoints } = responsive_breakpoints[0];

    if (breakpoints.length) {
      for (let imgObj of breakpoints) {
        const { secure_url } = imgObj;
        finalPoster.responsive.push(secure_url);
      }
    }

    newMovie.poster = finalPoster;
  }

  await newMovie.save();

  res.status(201).json({
    id: newMovie._id,
    title,
    newMovie,
  });
};

exports.updateMovieWithoutPoster = async (req, res) => {
  const { movieId } = req.params;

  const {
    title,
    storyLine,
    director,
    releaseDate,
    status,
    type,
    genres,
    tags,
    cast,
    writers,
    trailer,
    language,
  } = req.body;

  if (!isValidObjectId(movieId)) return sendError(res, 'Invalid Movie Id');

  const movie = await Movie.findById(movieId);
  if (!movie) return sendError(res, 'Movie not found');

  movie.title = title;
  movie.storyLine = storyLine;
  movie.tags = tags;
  movie.status = status;
  movie.type = type;
  movie.genres = genres;
  movie.cast = cast;
  movie.trailer = trailer;
  movie.language = language;
  movie.status = status;
  movie.releaseDate = releaseDate;

  if (director) {
    if (!isValidObjectId(director))
      return sendError(res, 'Invalid Director id!');

    movie.director = director;
  }
  if (writers) {
    for (let wId of writers) {
      if (!isValidObjectId(wId)) return sendError(res, 'Invalid writer id!');
    }

    movie.writers = writers;
  }

  await movie.save();

  res.json({ message: 'Movie updated successfully!', movie });
};

exports.updateMovieWitPoster = async (req, res) => {
  const { movieId } = req.params;

  if (!req.file) return sendError(res, 'Movie poster is missing');

  const {
    title,
    storyLine,
    director,
    releaseDate,
    status,
    type,
    genres,
    tags,
    cast,
    writers,
    trailer,
    language,
  } = req.body;

  if (!isValidObjectId(movieId)) return sendError(res, 'Invalid Movie Id');

  const movie = await Movie.findById(movieId);
  if (!movie) return sendError(res, 'Movie not found');

  movie.title = title;
  movie.storyLine = storyLine;
  movie.tags = tags;
  movie.status = status;
  movie.type = type;
  movie.genres = genres;
  movie.cast = cast;
  movie.trailer = trailer;
  movie.language = language;
  movie.status = status;
  movie.releaseDate = releaseDate;

  if (director) {
    if (!isValidObjectId(director))
      return sendError(res, 'Invalid Director id!');

    movie.director = director;
  }
  if (writers) {
    for (let wId of writers) {
      if (!isValidObjectId(wId)) return sendError(res, 'Invalid writer id!');
    }

    movie.writers = writers;
  }

  //updatePoster

  // removing poster from cloud if there is any
  const posterID = movie.poster?.public_id;
  if (posterID) {
    const { result } = await cloudinary.uploader.destroy(posterID);
    if (result !== 'ok') {
      console.log('WARNINGGG PURANO IMAGE DELETE VAYENA');
    }
  }

  //uploading poster
  const {
    secure_url: url,
    public_id,
    responsive_breakpoints,
  } = await cloudinary.uploader.upload(req.file.path, {
    transformation: { width: 1280, height: 720 },
    responsive_breakpoints: {
      create_derived: true,
      max_width: 640,
      max_images: 3,
    },
  });

  const finalPoster = { url, public_id, responsive: [] };
  const { breakpoints } = responsive_breakpoints[0];

  if (breakpoints.length) {
    for (let imgObj of breakpoints) {
      const { secure_url } = imgObj;
      finalPoster.responsive.push(secure_url);
    }
  }

  movie.poster = finalPoster;

  await movie.save();

  res.json({ message: 'Movie updated successfully!', movie });
};

exports.removeMovie = async (req, res) => {
  const { movieId } = req.params;

  if (!isValidObjectId(movieId)) return sendError(res, 'Invalid Movie Id');

  const movie = await Movie.findById(movieId);
  if (!movie) return sendError(res, 'Movie not found');

  // Check if there is poster

  // If has poster delete poster from clodinary

  const poster = movie.poster?.public_id;
  if (poster) {
    const { result } = await cloudinary.uploader.destroy(poster);
    if (result !== 'ok') console.log('Could not remove poster from cloud');
  }

  // removing trailer

  const trailerId = movie.trailer?.public_id;
  if (!trailerId) return sendError(res, 'Could not find the trailer');

  const { result } = await cloudinary.uploader.destroy(trailerId, {
    resource_type: 'video',
  });
  if (result !== 'ok')
    return sendError(res, 'Could not remove trailer from cloud');

  // Removing movie
  await Movie.findByIdAndDelete(movieId);

  res.json({ message: 'Movie removed Successfully' });
};
