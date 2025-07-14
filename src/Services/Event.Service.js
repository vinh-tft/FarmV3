const EventRepository = require("../Repository/Event.Repository");

module.exports = {
    async createEvent(data) {
        return await EventRepository.create(data);
    },

    async getAllEvents() {
        return await EventRepository.findAll();
    },

    async getEventsByFarm(farmId) {
        return await EventRepository.findByFarmId(farmId);
    },

    async updateEvent(id, data) {
        return await EventRepository.update(id, data);
    },

    async deleteEvent(id) {
        return await EventRepository.delete(id);
    },
};
