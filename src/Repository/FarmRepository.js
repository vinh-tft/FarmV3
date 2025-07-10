const Farm = require("../Models/Farm.Model");

const createFarm = (data) => Farm.create(data);
const getAllFarms = () => Farm.find();
const updateFarm = async (farmId, data) => {
  return await Farm.findOneAndUpdate({ farmId }, data, { new: true });
};

const deleteFarm = async (farmId) => {
  return await Farm.findOneAndDelete({ farmId });
};

const getFarmById = async (farmId) => {
  return await Farm.findOne({ farmId });
};

const getFarmsByProvince = async (provinceCode) => {
  return await Farm.find({ provinceCode });
};

module.exports = {
  createFarm,
  getAllFarms,
  getFarmById,
  getFarmsByProvince,
  updateFarm,
  deleteFarm,
};
