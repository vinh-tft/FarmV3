const AnimalService = require("../Services/animal.service");

exports.createAnimal = async (req, res, next) => {
  try {
    const created = await AnimalService.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

exports.getAnimals = async (req, res, next) => {
  try {
    const { farmId, type } = req.query;
    const filter = {};
    if (farmId) filter.farmId = farmId;
    if (type) filter.type = type;
    const list = await AnimalService.getAll(filter);
    res.json(list);
  } catch (err) {
    next(err);
  }
};

exports.getAnimalById = async (req, res, next) => {
  try {
    const animal = await AnimalService.getById(req.params.id);
    if (!animal) return res.status(404).json({ message: 'Animal not found' });
    res.json(animal);
  } catch (err) {
    next(err);
  }
};

exports.updateAnimal = async (req, res, next) => {
  try {
    const updated = await AnimalService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Animal not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteAnimal = async (req, res, next) => {
  try {
    const deleted = await AnimalService.delete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Animal not found' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};