const Farm = require('../Models/Farm.Model');

module.exports = {
  createFarm: (data) => Farm.create(data),
  getAllFarms: () => Farm.find(),
  getFarmById: (id) => Farm.findOne({ farmId: parseInt(id) }),
  updateFarm: (id, data) => Farm.findOneAndUpdate({ farmId: parseInt(id) }, data, { new: true }),
  deleteFarm: (id) => Farm.findOneAndDelete({ farmId: parseInt(id) }),

  searchFarms: (filters) => {
    const query = {};

    if (filters.name) {
      query.name = { $regex: filters.name, $options: 'i' }; 
    }

    if (filters.location) {
      query.location = { $regex: filters.location, $options: 'i' };
    }

    if (filters.status) {
      query.status = filters.status;
    }

    return Farm.find(query);
  },
};
