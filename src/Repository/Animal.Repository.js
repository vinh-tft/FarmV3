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

search: async ({ name, type, farmId }) => {
  const filter = {};
  if (name) filter.name = { $regex: new RegExp(name, "i") };
  if (type) filter.type = type;

  const num = Number(farmId);
  if (!isNaN(num)) filter.farmId = num;

  return Animal.find(filter);
}

};

module.exports = AnimalRepository;
