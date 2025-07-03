const express = require('express');
const router = express.Router();
const { validateLogin, validateForgot, validateReset } = require('../validators/auth.validator');
const controller = require('../Controllers/auth.controller');

router.post('/login', validateLogin, controller.login);
//Endpoints quên và reset mật khẩu
router.post('/forgot-password', validateForgot, controller.forgotPassword);
router.post('/reset-password', validateReset, controller.resetPassword);

module.exports = router;

/* src/middlewares/authenticate.js */
const { verifyToken } = require('../utils/jwt');
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ message: 'Token không hợp lệ' });
  try {
    req.user = verifyToken(authHeader.split(' ')[1]);
    next();
  } catch {
    res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
  }
}
module.exports = authenticate;