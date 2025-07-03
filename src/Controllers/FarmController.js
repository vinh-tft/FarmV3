const FarmService = require("../Services/FarmServices");

module.exports = {
  async createFarm(req, res) {
    try {
      const farm = await FarmService.createFarm(req.body);
      res.status(201).json(farm);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async getAllFarms(_, res) {
    const farms = await FarmService.getAllFarms();
    res.json(farms);
  },

  async getFarmById(req, res) {
    const farm = await FarmService.getFarmById(req.params.id);
    if (!farm) return res.status(404).json({ message: "Không tìm thấy" });
    res.json(farm);
  },

  async updateFarm(req, res) {
    const farm = await FarmService.updateFarm(req.params.id, req.body);
    if (!farm) return res.status(404).json({ message: "Không tìm thấy" });
    res.json(farm);
  },

  async deleteFarm(req, res) {
    const farm = await FarmService.deleteFarm(req.params.id);
    if (!farm) return res.status(404).json({ message: "Không tìm thấy" });
    res.json({ message: "Đã xoá" });
  }
};
