const Farm = require("../Models/Farm.Model");

const createFarm = (data) => Farm.create(data);
const getAllFarms = () => Farm.find();
const getFarmById = (id) => Farm.findById(id);
const updateFarm = (id, data) => Farm.findByIdAndUpdate(id, data, { new: true });
const deleteFarm = (id) => Farm.findByIdAndDelete(id);

module.exports = {
  createFarm,
  getAllFarms,
  getFarmById,
  updateFarm,
  deleteFarm,
};
