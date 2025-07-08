const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const controller = require("../Controllers/ImageController");

/**
 * @swagger
 * tags:
 *   name: Images
 *   description: Quản lý ảnh
 */

/**
 * @swagger
 * /api/images:
 *   post:
 *     summary: Upload ảnh
 *     tags: [Images]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Upload thành công
 *       500:
 *         description: Lỗi server
 */
router.post("/", upload.single("file"), controller.upload);

/**
 * @swagger
 * /api/images:
 *   get:
 *     summary: Lấy danh sách ảnh
 *     tags: [Images]
 *     responses:
 *       200:
 *         description: Danh sách ảnh
 *       500:
 *         description: Lỗi server
 */
router.get("/", controller.getAll);

module.exports = router;
