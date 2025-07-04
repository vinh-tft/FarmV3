const bcrypt = require("bcryptjs");
const UserRepo = require("../Repository/Auth.Repository");

const VALID_ROLES = ["CUSTOMER", "FARMER"];

exports.register = async (data) => {
  const { username, password, email, phone, role } = data;

  const existingUser = await UserRepo.findByEmail(email);
  if (existingUser) {
    throw new Error("Email đã tồn tại");
  }

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
