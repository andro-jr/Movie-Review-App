const express = require('express');
const {
  create,
  verifyEmail,
  resendEmailVerificationToken,
  forgetPassword,
  sendRequestPasswordTokenStatus,
  resetPassword,
  singIn,
} = require('../controllers/user');
const {
  userValidator,
  validate,
  validatePassword,
  signValidate,
} = require('../middleware/validator');
const { isValidPassResetToken } = require('../middleware/user');
const { isAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/create', userValidator, validate, create);
router.post('/verify-email', verifyEmail);
router.post('/resend-email-verification-token', resendEmailVerificationToken);
router.post('/forgot-password', forgetPassword);
router.post(
  '/verify-pass-reset-token',
  isValidPassResetToken,
  sendRequestPasswordTokenStatus
);
router.post(
  '/reset-password',
  validatePassword,
  validate,
  isValidPassResetToken,
  resetPassword
);
router.post('/sign-in', signValidate, validate, singIn);
router.get('/is-auth', isAuth, (req, res) => {
  const { user } = req;
  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
      role: user.role,
    },
  });
});
module.exports = router;
