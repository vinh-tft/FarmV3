const validateRegister = (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  next();
};

const validateLogin = (req, res, next) => {
  const { username, password } = req.body;
  if (!username) return res.status(400).json({ message: 'Username là bắt buộc' });
  if (!password || password.length < 6)
    return res.status(400).json({ message: 'Mật khẩu tối thiểu 6 ký tự' });
  next();
};

const validateForgot = (req, res, next) => {
  const { email } = req.body;
  if (!email || !email.includes('@'))
    return res.status(400).json({ message: 'Email không hợp lệ hoặc thiếu' });
  next();
};

const validateReset = (req, res, next) => {
  const { token, password } = req.body;
  if (!token) return res.status(400).json({ message: 'Token là bắt buộc' });
  if (!password || password.length < 6)
    return res.status(400).json({ message: 'Mật khẩu tối thiểu 6 ký tự' });
  next();
};

module.exports = {
  validateLogin,
  validateRegister,
  validateForgot,
  validateReset,
};

const { body } = require("express-validator");

exports.validateRegister = [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Email không hợp lệ"),
    body("password")
        .notEmpty()
        .withMessage("Password là bắt buộc")
        .isLength({ min: 6 })
        .withMessage("Password phải có ít nhất 6 ký tự"),
    body("role")
        .optional()
        .isIn(["CUSTOMER", "FARMER"])
        .withMessage("Role phải là CUSTOMER hoặc FARMER"),
];
