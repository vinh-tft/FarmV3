const express = require('express');
const router = express.Router();
const AnimalController = require('../Controllers/Animal.Controller');

// CRUD routes
router.post('/', AnimalController.create);
router.get('/', AnimalController.getAll);
router.get('/:id', AnimalController.getById);
router.put('/:id', AnimalController.update);
router.delete('/:id', AnimalController.delete);

module.exports = router;
