const express = require('express');
const router = express.Router();
const farmReviewController = require("../Controllers/FarmReview.Controller");

/**
 * @swagger
 * tags:
 *   name: Farm Reviews
 *   description: API cho đánh giá farm
 */

/**
 * @swagger
 * /api/farm-reviews:
 *   post:
 *     summary: Gửi đánh giá cho farm (không cần đăng nhập)
 *     tags: [Farm Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - farmId
 *               - userId
 *               - rating
 *             properties:
 *               farmId:
 *                 type: string
 *                 example: "64e4e8ac52393f1240aefc6f"
 *               userId:
 *                 type: string
 *                 example: "64e4e7d552393f1240aef3a1"
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 4
 *               comment:
 *                 type: string
 *                 example: "Trang trại sạch sẽ và dễ thương!"
 *     responses:
 *       201:
 *         description: Đánh giá đã được tạo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *       400:
 *         description: Thiếu dữ liệu hoặc không hợp lệ
 *       500:
 *         description: Lỗi server
 */
router.post('/', farmReviewController.createReview);

/**
 * @swagger
 * /api/farm-reviews/{farmId}:
 *   get:
 *     summary: Lấy danh sách đánh giá và điểm trung bình của farm
 *     tags: [Farm Reviews]
 *     parameters:
 *       - in: path
 *         name: farmId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của farm
 *     responses:
 *       200:
 *         description: Danh sách đánh giá và điểm trung bình
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 reviews:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       rating:
 *                         type: number
 *                       comment:
 *                         type: string
 *                       userId:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                 avgRating:
 *                   type: number
 *                   example: 4.5
 *       404:
 *         description: Không tìm thấy farm
 *       500:
 *         description: Lỗi server
 */
router.get('/:farmId', farmReviewController.getReviewsByFarm);

module.exports = router;
