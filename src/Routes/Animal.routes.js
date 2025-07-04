const express = require('express');
const router = express.Router();
const AnimalController = require('../Controllers/Animal.Controller');

/**
 * @swagger
 * tags:
 *   name: Animals
 *   description: API cho động vật trong trang trại
 */

/**
 * @swagger
 * /api/animals:
 *   post:
 *     summary: Tạo động vật mới
 *     tags: [Animals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               species:
 *                 type: string
 *               age:
 *                 type: number
 *               farmId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post('/', AnimalController.create);

/**
 * @swagger
 * /api/animals:
 *   get:
 *     summary: Lấy danh sách tất cả động vật
 *     tags: [Animals]
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/', AnimalController.getAll);

/**
 * @swagger
 * /api/animals/{id}:
 *   get:
 *     summary: Lấy thông tin động vật theo ID
 *     tags: [Animals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của động vật
 *     responses:
 *       200:
 *         description: Thành công
 *       404:
 *         description: Không tìm thấy
 */
router.get('/:id', AnimalController.getById);

/**
 * @swagger
 * /api/animals/{id}:
 *   put:
 *     summary: Cập nhật thông tin động vật
 *     tags: [Animals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID động vật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               species:
 *                 type: string
 *               age:
 *                 type: number
 *               farmId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Lỗi đầu vào
 *       404:
 *         description: Không tìm thấy
 */
router.put('/:id', AnimalController.update);

/**
 * @swagger
 * /api/animals/{id}:
 *   delete:
 *     summary: Xóa động vật theo ID
 *     tags: [Animals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID động vật cần xóa
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy
 */
router.delete('/:id', AnimalController.delete);

module.exports = router;
