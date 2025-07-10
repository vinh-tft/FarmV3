const AnimalService = require('../Services/Animal.Service');

const AnimalController = {
  create: async (req, res) => {
    try {
      const animal = await AnimalService.createAnimal(req.body);
      res.status(201).json(animal);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const animals = await AnimalService.getAllAnimals();
      res.json(animals);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const animal = await AnimalService.getAnimalById(req.params.id);
      if (!animal) return res.status(404).json({ message: "Not found" });
      res.json(animal);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const updated = await AnimalService.updateAnimal(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: "Not found" });
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const deleted = await AnimalService.deleteAnimal(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Not found" });
      res.json({ message: "Deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

search: async (req, res) => {
  try {
    const result = await AnimalService.searchAnimals(req.query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

getStats: async (req, res) => {
  try {
    const stats = await AnimalService.getStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



};

module.exports = AnimalController;
