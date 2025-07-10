const Animal = require('../Models/Animal.Model');
const AnimalRepository = require('../Repository/Animal.Repository');

const AnimalService = {
  createAnimal: async (data) => {
    const animal = new Animal(data);
    return await animal.save();
  },

  getAllAnimals: async () => {
    return await Animal.find();
  },

  getAnimalById: async (id) => {
    return await Animal.findOne({ farmId: Number(id) });
  },

  updateAnimal: async (id, data) => {
    return await Animal.findOneAndUpdate({ farmId: Number(id) }, data, { new: true });
  },

  deleteAnimal: async (id) => {
    return await Animal.findOneAndDelete({ farmId: Number(id) });
  },
  
   searchAnimals: async (filters) => {
  return await AnimalRepository.search(filters);
},
getStats: async () => {
  return await AnimalRepository.getStats();
}
};

module.exports = AnimalService;
