const { check, validationResult } = require('express-validator');
const genres = require('../utils/genres');
const { isValidObjectId } = require('mongoose');

exports.userValidator = [
  check('name').trim().not().isEmpty().withMessage('Name is missing'),
  check('email').normalizeEmail().isEmail().withMessage('Email is invalid'),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Password is missing')
    .isLength({ min: 3, max: 20 })
    .withMessage('Password must be between 3 to 20 characters'),
];

exports.validatePassword = [
  check('newPassword')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Password is missing')
    .isLength({ min: 3, max: 20 })
    .withMessage('Password must be between 3 to 20 characters'),
];

exports.signValidate = [
  check('email').normalizeEmail().isEmail().withMessage('Email is invalid'),
  check('password').trim().not().isEmpty().withMessage('Password is missing'),
];

exports.actorInfoValidator = [
  check('name').trim().not().isEmpty().withMessage('Name is missing'),
  check('about').trim().not().isEmpty().withMessage('About is missing'),
  check('gender').trim().not().isEmpty().withMessage('Gender is missing'),
];

exports.validateMovie = [
  check('title').trim().not().isEmpty().withMessage('Movie Title is missing !'),
  check('storyLine')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Story Line is important !'),
  check('language').trim().not().isEmpty().withMessage('Language is missing!'),
  check('type').trim().not().isEmpty().withMessage('Movie type is missing!'),
  check('status')
    .isIn(['public', 'private'])
    .withMessage('Movie status must be public or private!'),
  check('releaseDate').isDate().withMessage('Release date is missing!'),
  check('genres')
    .isArray()
    .withMessage('Release date is missing!')
    .custom((value) => {
      for (let g of value) {
        if (!genres.includes(g)) {
          throw Error('Invalid Genre');
        }
      }

      return true;
    }),
  check('tags')
    .isArray({ min: 1 })
    .withMessage('Tags must be an array of strings')
    .custom((tags) => {
      console.log(tags);
      for (let t of tags) {
        if (typeof t !== 'string') {
          console.log(typeof t);
          throw Error('Tags must be an array of strings');
        }
      }
      return true;
    }),
  check('cast')
    .isArray()
    .withMessage('Cast must be an array of strings')
    .custom((casts) => {
      for (let cast of casts) {
        if (!isValidObjectId(cast.actor))
          throw Error('Invalid cast id inside cast');
        if (!cast.roleAs?.trim()) throw Error('Role as is missing inisde cast');
        if (typeof cast.leadActor !== 'boolean')
          throw Error(
            'Only acceped boolean value inside leadActor inside cast'
          );
      }
      return true;
    }),
  check('trailer')
    .isObject()
    .withMessage('Trailer Info must be an object with url and public id')
    .custom((value) => {
      const { url, public_id } = value;
      try {
        const result = new URL(url);
        if (!result.protocol.includes('http'))
          throw Error('Trailer url is not secure');

        const arr = url.split('/');
        const publicID = arr[arr.length - 1].split('.')[0];

        if (publicID !== public_id) throw Error('Trailer public id is invalid');
        return true;
      } catch (error) {
        throw Error('Trailer url is invalid');
      }
    }),
  check('poster').custom((_, { req }) => {
    if (!req.file) throw Error('Poster File is missing');
    return true;
  }),
];

exports.validate = (req, res, next) => {
  const error = validationResult(req).array();
  if (error.length) {
    return res.json({ error: error[0].msg });
  }
  next();
};
