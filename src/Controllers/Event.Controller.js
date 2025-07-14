const EventService = require("../Services/Event.Service");

module.exports = {
    async createEvent(req, res) {
        try {
            const event = await EventService.createEvent(req.body);
            res.status(201).json(event);
        } catch (err) {
            console.error("Lỗi tạo sự kiện:", err);
            res.status(400).json({ message: err.message });
        }
    },

    async getAllEvents(_, res) {
        try {
            const events = await EventService.getAllEvents();
            res.status(200).json(events);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    async getEventsByFarm(req, res) {
        try {
            const events = await EventService.getEventsByFarm(req.params.farmId);
            res.status(200).json(events);
        } catch (err) {
            res.status(404).json({ message: "Không tìm thấy farm hoặc lỗi." });
        }
    },

    async updateEvent(req, res) {
        try {
            const event = await EventService.updateEvent(req.params.id, req.body);
            res.status(200).json(event);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    async deleteEvent(req, res) {
        try {
            await EventService.deleteEvent(req.params.id);
            res.status(200).json({ message: "Xoá thành công" });
        } catch (err) {
            res.status(404).json({ message: "Không tìm thấy sự kiện" });
        }
    }
};
