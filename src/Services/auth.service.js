const User = require('../Models/User.Model');
const { signToken } = require('../utils/jwt');

async function login({ username, password }) {
  const user = await User.findOne({ username });
  if (!user) {
    const err = new Error('Username hoặc mật khẩu không chính xác');
    err.status = 401;
    throw err;
  }

  const valid = await user.comparePassword(password);
  if (!valid) {
    const err = new Error('Username hoặc mật khẩu không chính xác');
    err.status = 401;
    throw err;
  }

  const token = signToken({ id: user._id, role: user.role });
  return { user: user.toJSON(), token };
}

module.exports = { login };