const express = require('express');
const router = express.Router();

const controller = require('../Controllers/Auth.Controller');
const {
  validateLogin,
  validateRegister,
  validateForgot,
  validateReset,
} = require('../Validators/Auth.Validator');

console.log("typeof validateLogin:", typeof validateLogin);
console.log("typeof validateRegister:", typeof validateRegister);
console.log("typeof controller.login:", typeof controller.login);
console.log("typeof controller.register:", typeof controller.register);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Đăng ký tài khoản mới
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *       400:
 *         description: Lỗi đầu vào hoặc đã tồn tại
 */
router.post('/register', validateRegister, controller.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Đăng nhập
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *       401:
 *         description: Sai tài khoản hoặc mật khẩu
 */
router.post('/login', validateLogin, controller.login);

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Gửi email đặt lại mật khẩu
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đã gửi email
 *       400:
 *         description: Lỗi không tìm thấy email
 */
// router.post('/forgot-password', validateForgot, controller.forgotPassword);

// /**
//  * @swagger
//  * /api/auth/reset-password:
//  *   post:
//  *     summary: Đặt lại mật khẩu
//  *     tags: [Auth]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               token:
//  *                 type: string
//  *               password:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: Đặt lại mật khẩu thành công
//  *       400:
//  *         description: Token không hợp lệ hoặc đã hết hạn
//  */
// router.post('/reset-password', validateReset, controller.resetPassword);

module.exports = router;
