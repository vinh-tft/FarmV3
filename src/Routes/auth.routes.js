const express = require('express');
const router = express.Router();
const { validateLogin, validateForgot, validateReset } = require('../validators/auth.validator');
const controller = require('../Controllers/auth.controller');

router.post('/login', validateLogin, controller.login);
//Endpoints quên và reset mật khẩu
router.post('/forgot-password', validateForgot, controller.forgotPassword);
router.post('/reset-password', validateReset, controller.resetPassword);

module.exports = router;

