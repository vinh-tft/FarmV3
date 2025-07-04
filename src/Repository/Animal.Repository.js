const Animal = require('../Models/Animal.Model');
const Counter = require('../Models/Counter.Model');

const AnimalRepository = {
  create: async (data) => {
    // Tạo animal mới, farmId sẽ tự tăng nếu model đã có hook pre-save
    const animal = new Animal(data);
    return await animal.save();
  },

  findAll: async () => {
    return await Animal.find();
  },

  findById: async (id) => {
    return await Animal.findOne({ farmId: Number(id) });
  },

  update: async (id, data) => {
    return await Animal.findOneAndUpdate({ farmId: Number(id) }, data, { new: true });
  },

  delete: async (id) => {
    return await Animal.findOneAndDelete({ farmId: Number(id) });
  },
};

module.exports = AnimalRepository;
