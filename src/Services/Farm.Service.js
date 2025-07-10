const FarmRepo = require("../Repository/FarmRepository");

module.exports = {
    createFarm: (data) => FarmRepo.createFarm(data),
    getAllFarms: () => FarmRepo.getAllFarms(),
    getFarmById: (id) => FarmRepo.getFarmById(id),
    updateFarm: (id, data) => FarmRepo.updateFarm(id, data),
    deleteFarm: (id) => FarmRepo.deleteFarm(id),
    getFarmsByProvinceCode: (provinceCode) =>
        FarmRepo.getFarmsByProvince(provinceCode),
};
