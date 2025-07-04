export const validateRegister = (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: "Missing fields" });
    }
    next();
};

const Joi = require('joi');

const loginSchema = Joi.object({
  username: Joi.string().required().messages({ 'any.required': 'Username là bắt buộc' }),
  password: Joi.string().min(6).required().messages({ 'string.min': 'Mật khẩu tối thiểu 6 ký tự', 'any.required': 'Mật khẩu là bắt buộc' })
});
// Thêm validator cho quên mật khẩu và reset
const forgotSchema = Joi.object({ email: Joi.string().email().required().messages({ 'string.email': 'Email không hợp lệ', 'any.required': 'Email là bắt buộc' }) });
const resetSchema = Joi.object({ token: Joi.string().required(), password: Joi.string().min(6).required() });

module.exports = {
  validateLogin: (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    next();
  },
  // Middleware validate quên mật khẩu
  validateForgot: (req, res, next) => {
    const { error } = forgotSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    next();
  },
//   // Middleware validate reset mật khẩu
//   validateReset: (req, res, next) => {
//     const { error } = resetSchema.validate(req.body);
//     if (error) return res.status(400).json({ message: error.details[0].message });
//     next();
//   }
};