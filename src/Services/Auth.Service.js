// src/services/auth.service.js
import bcrypt from "bcryptjs";
import User from "../Models/User.Model.js";

export const register = async ({ username, email, password, phone }) => {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    email,
    password: hashedPassword,
    phone,
  });

  await user.save();
  return user.toJSON(); // trả về object sạch (ẩn password nhờ transform)
};
