const AnimalLog = require("../Models/Animal.Log.Model");

const AnimalLogRepository = {
  create: async (data) => {
    const log = new AnimalLog(data);
    return await log.save();
  },

  findByAnimalId: async (animalId) => {
    return await AnimalLog.find({ animalId: Number(animalId) }).sort({ createdAt: -1 });
  },

   delete: async (id) => {
    return await AnimalLog.findByIdAndDelete(id);
  }
};

module.exports = AnimalLogRepository;
