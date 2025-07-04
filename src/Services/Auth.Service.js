const User = require("../Models/User.Model");
const bcrypt = require("bcryptjs");
const UserRepo = require("../Repository/Auth.Repository");

const VALID_ROLES = ["CUSTOMER", "FARMER"];

exports.register = async (data) => {
  const { username, password, email, phone, role } = data;

  const existingUser = await UserRepo.findByEmail(email);
  if (existingUser) {
    throw new Error("Email đã tồn tại");
async function register({ username, email, password, phone }) {
  const existing = await User.findOne({ email });
  if (existing) {
    throw { status: 400, message: "Email đã được sử dụng" };
  }

  // Lưu plain-text password
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

  // So sánh plain-text
  if (user.password !== password) {
    throw { status: 401, message: "Sai mật khẩu" };
  }
  return user;
}

module.exports = { register, login };
  const hashedPassword = await bcrypt.hash(password, 10);

  const normalizedRole = (role || "CUSTOMER").toUpperCase();
  const finalRole = VALID_ROLES.includes(normalizedRole) ? role : "CUSTOMER";

  const newUser = await UserRepo.createUser({
    username,
    password: hashedPassword,
    email,
    phone,
    role: normalizedRole,
  });

  return newUser;
};
