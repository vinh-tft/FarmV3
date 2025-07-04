const AnimalRepository = require('../Repository/Animal.Repository');

const AnimalService = {
  createAnimal: async (data) => await AnimalRepository.create(data),
  getAllAnimals: async () => await AnimalRepository.findAll(),
  getAnimalById: async (id) => await AnimalRepository.findById(id),
  updateAnimal: async (id, data) => await AnimalRepository.update(id, data),
  deleteAnimal: async (id) => await AnimalRepository.delete(id),
};

module.exports = AnimalService;
