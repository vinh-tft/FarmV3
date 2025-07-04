const Animal = require('../Models/Animal.Model');

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
};

module.exports = AnimalService;
