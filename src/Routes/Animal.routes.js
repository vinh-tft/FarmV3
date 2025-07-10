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
 * /api/animals/search:
 *   get:
 *     summary: Tìm kiếm động vật/nông sản
 *     tags: [Animals]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Tên động vật (tìm gần đúng)
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [vegetable, poultry, livestock]
 *         description: Loại động vật
 *       - in: query
 *         name: farmId
 *         schema:
 *           type: number
 *         description: ID trang trại (kiểu số, tự tăng – không cần truyền khi tạo)
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/search', AnimalController.search); 


/**
 * @swagger
 * /api/animals/stats:
 *   get:
 *     summary: Thống kê dữ liệu động vật/nông sản
 *     tags: [Animals]
 *     responses:
 *       200:
 *         description: Trả về số liệu thống kê
 */
router.get('/stats', AnimalController.getStats);


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
 *           type: number
 *         description: ID của bản ghi (farmId)
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
 *           type: number
 *         description: ID của bản ghi (farmId)
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
 *           type: number
 *         description: ID bản ghi cần xóa (farmId)
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy
 */
router.delete('/:id', AnimalController.delete);



module.exports = router;
