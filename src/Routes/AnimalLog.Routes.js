const express = require("express");
const router = express.Router();
const AnimalLogController = require("../Controllers/AnimalLog.Controller");

/**
 * @swagger
 * /api/animal-logs:
 *   post:
 *     summary: Tạo nhật ký hoạt động cho động vật
 *     tags: [AnimalLogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - animalId
 *               - action
 *             properties:
 *               animalId:
 *                 type: number
 *                 description: ID của động vật (farmId)
 *               action:
 *                 type: string
 *                 description: Hoạt động như tiêm, khám bệnh...
 *               note:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo thành công
 *       400:
 *         description: Lỗi đầu vào
 */
router.post("/", AnimalLogController.create);


/**
 * @swagger
 * /api/animal-logs/{animalId}:
 *   get:
 *     summary: Lấy nhật ký hoạt động của động vật theo ID
 *     tags: [AnimalLogs]
 *     parameters:
 *       - in: path
 *         name: animalId
 *         required: true
 *         schema:
 *           type: number
 *         description: ID của động vật (farmId)
 *     responses:
 *       200:
 *         description: Trả về danh sách nhật ký
 *       404:
 *         description: Không tìm thấy
 */
router.get("/:animalId", AnimalLogController.getByAnimal);

/**
 * @swagger
 * /api/animal-logs/{id}:
 *   delete:
 *     summary: Xóa nhật ký theo ID
 *     tags: [AnimalLogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của nhật ký cần xóa
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy
 */
router.delete("/:id", AnimalLogController.delete);

module.exports = router;
