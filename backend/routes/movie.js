const express = require('express');
const { isAuth, isAdmin } = require('../middleware/auth');
const {
  uploadTrailer,
  createMovie,
  updateMovieWithoutPoster,
  updateMovieWitPoster,
  removeMovie,
} = require('../controllers/movie');
const { uploadVideo, uploadImage } = require('../middleware/multer');
const { parseMovieData } = require('../utils/helper');
const { validateMovie, validate } = require('../middleware/validator');
const router = express.Router();

router.post(
  '/upload-trailer',
  isAuth,
  isAdmin,
  uploadVideo.single('video'),
  uploadTrailer
);
router.post(
  '/create',
  isAuth,
  isAdmin,
  uploadImage.single('poster'),
  parseMovieData,
  validateMovie,
  validate,
  createMovie
);

router.patch(
  '/update-movie-without-poster/:movieId',
  isAuth,
  isAdmin,
  // parseMovieData,
  validateMovie,
  validate,
  updateMovieWithoutPoster
);

router.patch(
  '/update-movie-with-poster/:movieId',
  isAuth,
  isAdmin,
  uploadImage.single('poster'),
  parseMovieData,
  validateMovie,
  validate,
  updateMovieWitPoster
);

router.delete('/delete/:movieId', isAuth, isAdmin, removeMovie);

module.exports = router;
