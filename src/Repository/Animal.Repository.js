const Animal = require('../Models/Animal.Model');

const AnimalRepository = {
  create: async (data) => await Animal.create(data),
  findAll: async () => await Animal.find().populate('farmId'),
  findById: async (id) => await Animal.findById(id).populate('farmId'),
  update: async (id, data) => await Animal.findByIdAndUpdate(id, data, { new: true }),
  delete: async (id) => await Animal.findByIdAndDelete(id),
};

module.exports = AnimalRepository;
