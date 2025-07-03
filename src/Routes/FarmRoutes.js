const express = require("express");
const router = express.Router();
const FarmController = require("../Controllers/FarmController");

router.post("/", FarmController.createFarm);
router.get("/", FarmController.getAllFarms);
router.get("/:id", FarmController.getFarmById);
router.put("/:id", FarmController.updateFarm);
router.delete("/:id", FarmController.deleteFarm);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Farms
 *   description: Quản lý nông trại
 */

/**
 * @swagger
 * /api/farms:
 *   get:
 *     summary: Lấy tất cả farm
 *     tags: [Farms]
 *     responses:
 *       200:
 *         description: Thành công
 */

/**
 * @swagger
 * /api/farms:
 *   post:
 *     summary: Tạo farm mới
 *     tags: [Farms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               area:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [pending, active, inactive]
 *               owner:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo thành công
 */

/**
 * @swagger
 * /api/farms/{id}:
 *   get:
 *     summary: Lấy farm theo ID
 *     tags: [Farms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 */

/**
 * @swagger
 * /api/farms/{id}:
 *   put:
 *     summary: Cập nhật farm theo ID
 *     tags: [Farms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               area:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [pending, active, inactive]
 *               owner:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */

/**
 * @swagger
 * /api/farms/{id}:
 *   delete:
 *     summary: Xóa farm theo ID
 *     tags: [Farms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
 */
