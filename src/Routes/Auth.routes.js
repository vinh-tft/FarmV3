const express = require('express');
const router = express.Router();

const controller = require('../Controllers/Auth.Controller');
const {
  validateLogin,
  validateRegister,
  validateForgot,
  validateReset
} = require('../Validators/Auth.Validator');

router.post('/register', validateRegister, controller.register);
router.post('/login', validateLogin, controller.login);
router.post('/forgot-password', validateForgot, controller.forgotPassword);
router.post('/reset-password', validateReset, controller.resetPassword);

module.exports = router;
