const bcrypt = require("bcryptjs");
const User = require("../Models/User.Model");
const { sendEmail } = require('../Utils/email');

async function register({ username, email, password, phone }) {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error("Email đã được sử dụng");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    email,
    password: hashedPassword,
    phone,
  });

  await user.save();
  return {
    id: user._id,
    email: user.email,
    username: user.username,
    role: user.role || 'user',
  };
}

async function login({ username, password }) {
  const user = await User.findOne({ username });
  if (!user) throw { status: 404, message: 'Không tìm thấy người dùng' };

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw { status: 401, message: 'Sai mật khẩu' };

  return {
    id: user._id,
    email: user.email,
    username: user.username,
    role: user.role || 'user',
  };
}

async function forgotPassword(email, origin) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Email không tồn tại');

  user.generatePasswordReset(); // gán token và thời hạn vào user
  await user.save();

  const link = `${origin}/reset-password?token=${user.resetPasswordToken}`;
  await sendEmail({
    to: email,
    subject: 'Đặt lại mật khẩu',
    html: `<p>Nhấp <a href="${link}">vào đây</a> để đặt lại mật khẩu.</p>`,
  });
}

async function resetPassword(token, newPassword) {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) throw new Error('Token không hợp lệ hoặc đã hết hạn');

  user.password = await bcrypt.hash(newPassword, 12);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();
}

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword
};
