const User = require('../Models/User.Model');
const { signToken } = require('../utils/jwt');
const { sendEmail } = require('../utils/mailer');

async function login({ username, password }) {
  const user = await User.findOne({ username });
  if (!user) throw Object.assign(new Error('Username hoặc mật khẩu không chính xác'), { status: 401 });

  const valid = await user.comparePassword(password);
  if (!valid) throw Object.assign(new Error('Username hoặc mật khẩu không chính xác'), { status: 401 });

  const token = signToken({ id: user._id, role: user.role });
  return { user: user.toJSON(), token };
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
  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
}

module.exports = { login, forgotPassword, resetPassword };