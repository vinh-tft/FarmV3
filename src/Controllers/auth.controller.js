const authService = require('../Services/auth.service');

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const { user, token } = await authService.login({ username, password });
    res.json({ data: { user, token } });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
}

module.exports = { login };
