const userService = require("../Services/User.Service");

module.exports = {
    async getAllUsers(_, res) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách người dùng:", error);
            res.status(500).json({ message: "Lỗi máy chủ" });
        }
    },

    async getUserById(req, res) {
        try {
            const id = parseInt(req.params.id);
            const user = await userService.getUser(id);
            if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });
            res.json(user);
        } catch (error) {
            console.error("Lỗi khi lấy người dùng:", error);
            res.status(500).json({ message: "Lỗi máy chủ" });
        }
    },

    async updateUser(req, res) {
        try {
            const id = parseInt(req.params.id);
            const user = await userService.updateUser(id, req.body);
            if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });
            res.json(user);
        } catch (error) {
            console.error("Lỗi khi cập nhật người dùng:", error);
            res.status(500).json({ message: "Lỗi máy chủ" });
        }
    },

    async deleteUser(req, res) {
        try {
            const id = parseInt(req.params.id);
            const user = await userService.deleteUser(id);
            if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });
            res.json({ message: "Đã xoá người dùng thành công" });
        } catch (error) {
            console.error("Lỗi khi xoá người dùng:", error);
            res.status(500).json({ message: "Lỗi máy chủ" });
        }
    }
};
