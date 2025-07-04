const express = require("express");
const router = express.Router();
const animalCtrl = require("../Controllers/animal.controller");

// POST   /api/animals       -> tạo mới animal
// GET    /api/animals       -> lấy danh sách (chạy filter bằng query: farmId, type)
// GET    /api/animals/:id   -> lấy chi tiết
// PUT    /api/animals/:id   -> cập nhật
// DELETE /api/animals/:id   -> xóa

router.post('/', animalCtrl.createAnimal);
router.get('/', animalCtrl.getAnimals);
router.get('/:id', animalCtrl.getAnimalById);
router.put('/:id', animalCtrl.updateAnimal);
router.delete('/:id', animalCtrl.deleteAnimal);

module.exports = router;