const cloudinary = require('../cloud');
const { sendError } = require('../utils/helper');

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
    releaseData,
    status,
    type,
    genres,
    tags,
    cast,
    writers,
    poster,
    trailer,
    language,
  } = req.body;

  const { secure_url: url, public_id } = await cloudinary.uploader.upload(
    file.path
  );

  res.status(201).json({ url, public_id });
};