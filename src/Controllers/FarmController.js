const FarmService = require("../Services/FarmServices");
const Farm = require("../Models/Farm.Model");

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
    const farm = await Farm.findOne({ farmId: parseInt(req.params.id) });
    if (!farm) return res.status(404).json({ message: "Không tìm thấy" });
    res.json(farm);
  },

  async updateFarm(req, res) {
  try {
    const id = parseInt(req.params.id);
    const farm = await FarmService.updateFarm(id, req.body);
    if (!farm) return res.status(404).json({ message: "Không tìm thấy" });
    res.json(farm);
  } catch (error) {
    console.error("Lỗi khi cập nhật farm:", error);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
},

async deleteFarm(req, res) {
  try {
    const id = parseInt(req.params.id); 
    const farm = await FarmService.deleteFarm(id);
    if (!farm) return res.status(404).json({ message: "Không tìm thấy" });
    res.json({ message: "Đã xoá" });
  } catch (error) {
    console.error("Lỗi khi xoá farm:", error);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
}
};
