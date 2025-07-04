const express = require('express');
const router = express.Router();
const animalCtrl = require('./Controllers/Animal.Controller');

/**
 * @swagger
 * tags:
 *   name: Animal
 *   description: API quản lý động vật và rau củ trong trang trại
 */

/**
 * @swagger
 * /api/animals:
 *   post:
 *     summary: Tạo mới một animal (rau, gia cầm, gia súc)
 *     tags: [Animal]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - quantity
 *               - farmId
 *             properties:
 *               name:
 *                 type: string
 *                 description: Tên sản phẩm hoặc động vật
 *                 example: Cà chua
 *               type:
 *                 type: string
 *                 enum: [vegetable, poultry, livestock]
 *                 description: Loại (rau theo kg, gia cầm/gia súc theo con)
 *                 example: vegetable
 *               quantity:
 *                 type: number
 *                 description: Số lượng (kg hoặc con)
 *                 example: 120
 *               description:
 *                 type: string
 *                 description: Mô tả thêm
 *                 example: Cà chua bi Đà Lạt
 *               imageUrl:
 *                 type: string
 *                 description: URL ảnh
 *                 example: https://...
 *               farmId:
 *                 type: string
 *                 description: ID của trang trại
 *                 example: 6123abc456def7890abcd1234
 *     responses:
 *       201:
 *         description: Tạo thành công
 *       400:
 *         description: Dữ liệu đầu vào không hợp lệ
 */
router.post('/', animalCtrl.createAnimal);

/**
 * @swagger
 * /api/animals:
 *   get:
 *     summary: Lấy danh sách animals, hỗ trợ filter theo farmId và type
 *     tags: [Animal]
 *     parameters:
 *       - in: query
 *         name: farmId
 *         schema:
 *           type: string
 *         description: Lọc theo ID trang trại
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [vegetable, poultry, livestock]
 *         description: Lọc theo loại
 *     responses:
 *       200:
 *         description: Thành công, trả về mảng animal
 */
router.get('/', animalCtrl.getAnimals);

/**
 * @swagger
 * /api/animals/{id}:
 *   get:
 *     summary: Lấy chi tiết một animal theo id
 *     tags: [Animal]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của animal
 *     responses:
 *       200:
 *         description: Thành công, trả về object animal
 *       404:
 *         description: Không tìm thấy animal
 */
router.get('/:id', animalCtrl.getAnimalById);

/**
 * @swagger
 * /api/animals/{id}:
 *   put:
 *     summary: Cập nhật animal theo id
 *     tags: [Animal]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của animal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               quantity:
 *                 type: number
 *               description:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *             example:
 *               quantity: 150
 *               description: Cập nhật số lượng
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy animal
 */
router.put('/:id', animalCtrl.updateAnimal);

/**
 * @swagger
 * /api/animals/{id}:
 *   delete:
 *     summary: Xóa animal theo id
 *     tags: [Animal]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của animal
 *     responses:
 *       204:
 *         description: Xóa thành công, không trả về nội dung
 *       404:
 *         description: Không tìm thấy animal
 */
router.delete('/:id', animalCtrl.deleteAnimal);

module.exports = router;