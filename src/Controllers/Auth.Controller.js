
const authService = require('../Services/Auth.Service');

module.exports = {
  register: async (req, res) => {
    try {
      const user = await authService.register(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const result = await authService.login(req.body);
      res.json(result);
    } catch (err) {
      res.status(err.status || 400).json({ message: err.message });
    }
  },

  forgotPassword: async (req, res) => {
    try {
      await authService.forgotPassword(req.body.email, req.headers.origin);
      res.json({ message: 'Email đặt lại mật khẩu đã được gửi' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  resetPassword: async (req, res) => {
    try {
      await authService.resetPassword(req.body.token, req.body.password);
      res.json({ message: 'Đặt lại mật khẩu thành công' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};