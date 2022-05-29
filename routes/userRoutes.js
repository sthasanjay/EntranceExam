const router = require('express').Router();
const {
  signUp,
  resetPassword,
  login,
  protect,
  updatePassword,
  restrictTo,
  checkDeactivateInLogin,
  checkResetToken,
  getAUser,
  forgotPassword,
} = require('../controllers/authController');

//Auth contorllers API endpoints
router.post('/signup', signUp);
router.post('/login', checkDeactivateInLogin, login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.patch('/updateMyPassword', protect, updatePassword);
router.get('/getone/:id', protect, getAUser);
router.get('/checkResetToken/:token', checkResetToken);

module.exports = router;
