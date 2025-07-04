const express = require("express");
const router = express.Router();
const AuthController = require("../Controllers/Auth.Controller.js");
const { validateRegister } = require("../Validators/Auth.Validator");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Xác thực và đăng ký người dùng
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Đăng ký người dùng mới
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [ADMIN, FARMER, CUSTOMER]
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *       400:
 *         description: Dữ liệu không hợp lệ hoặc lỗi hệ thống
 */

router.post("/register", validateRegister, AuthController.register);

module.exports = router;
