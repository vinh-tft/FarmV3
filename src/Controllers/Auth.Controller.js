const authService = require('../Services/Auth.Service');

module.exports = {
  register: async (req, res) => {
    try {
      const user = await authService.register(req.body);
      res.status(201).json({
        message: 'Đăng ký thành công',
        user: {
          id: user.id,
          email: user.email
        }
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const user = await authService.login(req.body);

      // Gán user vào session
      req.session.user = {
        id: user.id,
        email: user.email,
        role: user.role || 'user',
      };

      res.json({
        message: 'Đăng nhập thành công',
        user: req.session.user
      });
    } catch (err) {
      res.status(err.status || 400).json({ message: err.message });
    }
  },

  logout: (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ message: 'Không thể đăng xuất' });
      }
      res.clearCookie('connect.sid'); // Xóa cookie session
      res.json({ message: 'Đăng xuất thành công' });
    });
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
