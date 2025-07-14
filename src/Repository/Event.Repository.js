const Event = require("../Models/Event.Model");

module.exports = {
    async create(data) {
        return await Event.create(data);
    },

    async findAll() {
        return await Event.find().sort({ startDate: 1 });
    },

    async findByFarmId(farmId) {
        return await Event.find({ farmId });
    },

    async update(id, data) {
        return await Event.findByIdAndUpdate(id, data, { new: true });
    },

    async delete(id) {
        return await Event.findByIdAndDelete(id);
    }
};
