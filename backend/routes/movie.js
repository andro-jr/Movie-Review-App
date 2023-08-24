const express = require('express');
const { isAuth, isAdmin } = require('../middleware/auth');
const { uploadTrailer, createMovie } = require('../controllers/movie');
const { uploadVideo, uploadImage } = require('../middleware/multer');
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
  createMovie
);

module.exports = router;
