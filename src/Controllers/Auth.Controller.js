const AuthService = require("../Services/Auth.Service");

exports.register = async (req, res) => {
  try {
    const newUser = await AuthService.register(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};