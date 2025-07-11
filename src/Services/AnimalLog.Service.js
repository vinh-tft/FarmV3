const AnimalLogRepository = require("../Repository/AnimalLog.Repository");

const AnimalLogService = {
  createLog: async (data) => {
    return await AnimalLogRepository.create(data);
  },

  getLogsByAnimal: async (animalId) => {
    return await AnimalLogRepository.findByAnimalId(animalId);
  },
  
  deleteLog: async (id) => {
    return await AnimalLogRepository.delete(id);
  }
};

module.exports = AnimalLogService;
