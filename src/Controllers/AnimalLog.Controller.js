const AnimalLogService = require("../Services/AnimalLog.Service");

const AnimalLogController = {
  create: async (req, res) => {
    try {
      const log = await AnimalLogService.createLog(req.body);
      res.status(201).json(log);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getByAnimal: async (req, res) => {
    try {
      const logs = await AnimalLogService.getLogsByAnimal(req.params.animalId);
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

   delete: async (req, res) => {
    try {
      const deleted = await AnimalLogService.deleteLog(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Không tìm thấy" });
      res.json({ message: "Đã xóa nhật ký thành công" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = AnimalLogController;
