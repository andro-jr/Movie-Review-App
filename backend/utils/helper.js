const crypto = require('crypto');
const cloudinary = require('../cloud');

exports.sendError = (res, error, statusCode = 401) => {
  res.status(statusCode).json({ error });
};

exports.generateRandomByte = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(30, (err, buff) => {
      if (err) reject(err);
      const bufferString = buff.toString('hex');
      resolve(bufferString);
    });
  });
};

exports.handleNotFound = (req, res) => {
  this.sendError(res, 'Not Found', 404);
};

exports.uploadImageToCloud = async (file) => {
  const { secure_url: url, public_id } = await cloudinary.uploader.upload(
    file,
    {
      gravity: 'face',
      height: 500,
      width: 500,
      crop: 'thumb',
    }
  );

  return { url, public_id };
};

exports.parseMovieData = (req, res, next) => {
  const { trailer, cast, genres, tags, writers } = req.body;

  if (trailer) req.body.trailer = JSON.parse(trailer);
  if (cast) req.body.cast = JSON.parse(cast);
  if (genres) req.body.genres = JSON.parse(genres);
  if (tags) req.body.tags = JSON.parse(tags);
  if (writers) req.body.writers = JSON.parse(writers);

  next();
};
