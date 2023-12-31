const { isValidObjectId } = require('mongoose');
const Actor = require('../models/actor');
const { sendError, uploadImageToCloud } = require('../utils/helper');
const cloudinary = require('../cloud');

exports.createActor = async (req, res) => {
  const { name, about, gender } = req.body;
  const { file } = req;

  const newActor = new Actor({ name, about, gender });

  if (file) {
    const { url, public_id } = await uploadImageToCloud(file.path);
    newActor.avatar = { url, public_id };
    await newActor.save();
  }

  res.status(201).json({
    id: newActor._id,
    name,
    about,
    gender,
    avatar: newActor.avatar?.url,
  });
};

exports.updateActor = async (req, res) => {
  const { name, about, gender } = req.body;
  const { file } = req;

  const { actorId } = req.params;

  if (!isValidObjectId(actorId)) return sendError(res, 'Invalid ID');

  const actor = await Actor.findById(actorId);
  if (!actor) return sendError(res, 'Actor not found!', 404);

  const public_id = actor.avatar?.public_id;

  // remove old image if there was one
  if (public_id && file) {
    const { result } = await cloudinary.uploader.destroy(public_id);
    if (result !== 'ok')
      return sendError(res, 'Could not remove image from cloud!');
  }

  // upload new avatar if there is one
  if (file) {
    const { url, public_id } = await uploadImageToCloud(file.path);
    actor.avatar = { url, public_id };
    await actor.save();
  }

  actor.name = name;
  actor.about = about;
  actor.gender = gender;
  await actor.save();

  res.status(201).json({
    id: actor._id,
    name,
    about,
    gender,
    avatar: actor.avatar?.url,
  });
};

exports.removeActor = async (req, res) => {
  const { actorId } = req.params;

  if (!isValidObjectId(actorId)) return sendError(res, 'Invalid ID');

  const actor = await Actor.findById(actorId);
  if (!actor) return sendError(res, 'Actor not found!', 404);

  const public_id = actor.avatar?.public_id;

  // remove old image if there was one
  if (public_id) {
    const { result } = await cloudinary.uploader.destroy(public_id);
    if (result !== 'ok')
      return sendError(res, 'Could not remove image from cloud!');
  }

  await Actor.findByIdAndDelete(actorId);

  res.json({ message: 'Record removed successfully' });
};

exports.searchActor = async (req, res) => {
  const { query } = req;
  const result = await Actor.find({ $text: { $search: `"${query.name}"` } });

  res.json(result);
};

exports.getLatestActors = async (req, res) => {
  const result = await Actor.find().sort({ createdAt: '-1' }).limit(12);

  res.json(result);
};

exports.getSingleActor = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) return sendError(res, 'Invalid Request');

  const result = await Actor.findById(id);
  if (!result) return sendError(res, 'Actor not found', 404);
  res.json(result);
};
