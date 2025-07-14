const express = require("express");
const router = express.Router();
const EventController = require("../Controllers/Event.Controller");

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Quản lý sự kiện farm (ngày mở cửa, hội chợ...)
 */

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Lấy danh sách tất cả sự kiện
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Danh sách sự kiện
 */
router.get("/", EventController.getAllEvents);

/**
 * @swagger
 * /api/events/farm/{farmId}:
 *   get:
 *     summary: Lấy danh sách sự kiện theo farm
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: farmId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách sự kiện
 *       404:
 *         description: Không tìm thấy farm
 */
router.get("/farm/:farmId", EventController.getEventsByFarm);

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Tạo sự kiện mới
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - farmId
 *               - title
 *               - startDate
 *             properties:
 *               farmId:
 *                 type: number
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post("/", EventController.createEvent);

/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     summary: Cập nhật sự kiện
 *     tags: [Events]
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
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy sự kiện
 */
router.put("/:id", EventController.updateEvent);

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Xoá sự kiện
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xoá thành công
 *       404:
 *         description: Không tìm thấy sự kiện
 */
router.delete("/:id", EventController.deleteEvent);

module.exports = router;
