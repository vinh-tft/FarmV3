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

  if (farmId !== undefined && !isNaN(Number(farmId))) {
    filter.farmId = Number(farmId);
  }

  return Animal.find(filter);
},

getStats: async () => {
  const totalAnimals = await Animal.countDocuments();

  const totalQuantityAgg = await Animal.aggregate([
    { $group: { _id: null, total: { $sum: "$quantity" } } }
  ]);
  const totalQuantity = totalQuantityAgg[0]?.total || 0;

  const byTypeAgg = await Animal.aggregate([
    { $group: { _id: "$type", count: { $sum: 1 } } }
  ]);
  const byType = {};
  byTypeAgg.forEach(item => {
    byType[item._id] = item.count;
  });

  const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const createdThisMonth = await Animal.countDocuments({ createdAt: { $gte: startOfMonth } });

  return {
    totalAnimals,
    totalQuantity,
    byType,
    createdThisMonth
  };
}

};

module.exports = AnimalRepository;
