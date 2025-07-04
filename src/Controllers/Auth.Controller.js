const authService = require("../Services/Auth.Service");

module.exports = {
  login: async (req, res) => {
    try {
      const user = await authService.login(req.body);
      req.session.user = { id: user.id, email: user.email, role: user.role };
      return res.json({ message: "Đăng nhập thành công", user: req.session.user });
    } catch (err) {
      return res.status(err.status || 500).json({ message: err.message || "Lỗi đăng nhập" });
    }
  },

  register: async (req, res) => {
    try {
      const user = await authService.register(req.body);
      res.status(201).json({ message: "Đăng ký thành công", user });
    } catch (err) {
      res.status(err.status || 400).json({ message: err.message });
    }
  }
};
