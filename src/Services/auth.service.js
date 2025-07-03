const User = require('../Models/User.Model');
const bcrypt = require('bcrypt');
const { signToken } = require('../utils/jwt');
const { sendEmail } = require('../utils/email');


async function login({ username, password }) {
  const user = await User.findOne({ username });
  if (!user) throw { status: 404, message: 'Không tìm thấy người dùng' };

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw { status: 401, message: 'Sai mật khẩu' };

  const token = signToken({ id: user._id, role: user.role });

  return { user, token };
}


//Service xử lý quên mật khẩu: tạo token, gửi mail
async function forgotPassword(email, origin) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Email không tồn tại');
  user.generatePasswordReset();
  await user.save();
  const link = `${origin}/reset-password?token=${user.resetPasswordToken}`;
  await sendEmail({ to: email, subject: 'Đặt lại mật khẩu', html: `<p>Nhấp <a href="${link}">vào đây</a> để đặt lại mật khẩu.</p>` });
}

//Service xử lý reset mật khẩu bằng token
async function resetPassword(token, newPassword) {
  const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
  if (!user) throw new Error('Token không hợp lệ hoặc đã hết hạn');
  user.password = await bcrypt.hash(newPassword, 12);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
}

module.exports = { login, forgotPassword, resetPassword };