const User = require("../Models/User.Model");

async function register({ username, email, password, phone }) {
  const existing = await User.findOne({ email });
  if (existing) {
    throw { status: 400, message: "Email đã được sử dụng" };
  }

  // Lưu mật khẩu dạng plain-text (không mã hóa)
  const user = new User({ username, email, password, phone });
  await user.save();

  return {
    id: user._id,
    email: user.email,
    username: user.username,
    role: user.role,
  };
}

async function login({ username, password }) {
  const user = await User.findOne({ username });
  if (!user) throw { status: 404, message: "Không tìm thấy người dùng" };

  // So sánh mật khẩu dạng plain-text
  if (user.password !== password) {
    throw { status: 401, message: "Sai mật khẩu" };
  }

  return {
    id: user._id,
    email: user.email,
    username: user.username,
    role: user.role,
  };
}

module.exports = {
  login,
  register,
};
