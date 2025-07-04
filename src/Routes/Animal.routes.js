const express = require('express');
const router = express.Router();
const AnimalController = require('../Controllers/Animal.Controller');

/**
 * @swagger
 * tags:
 *   name: Animals
 *   description: API quản lý động vật/nông sản trong trang trại
 */

/**
 * @swagger
 * /api/animals:
 *   post:
 *     summary: Tạo động vật/nông sản mới
 *     tags: [Animals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - farmId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Gà ta
 *               type:
 *                 type: string
 *                 enum: [vegetable, poultry, livestock]
 *                 example: poultry
 *               quantity:
 *                 type: number
 *                 minimum: 0
 *                 example: 10
 *               description:
 *                 type: string
 *                 example: Gà thả vườn không kháng sinh
 *               imageUrl:
 *                 type: string
 *                 example: https://example.com/image.jpg
 *               farmId:
 *                 type: string
 *                 example: 64a7cfb1e8f72a3b2c5d35ab
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
 *     summary: Lấy danh sách tất cả động vật/nông sản
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
 *     summary: Lấy thông tin động vật/nông sản theo ID
 *     tags: [Animals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của bản ghi
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
 *     summary: Cập nhật thông tin động vật/nông sản
 *     tags: [Animals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của bản ghi
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [vegetable, poultry, livestock]
 *               quantity:
 *                 type: number
 *               description:
 *                 type: string
 *               imageUrl:
 *                 type: string
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
 *     summary: Xóa động vật/nông sản theo ID
 *     tags: [Animals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID bản ghi cần xóa
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy
 */
router.delete('/:id', AnimalController.delete);

module.exports = router;
