const Joi = require('joi');

const loginSchema = Joi.object({
  username: Joi.string().required().messages({
    'any.required': 'Username là bắt buộc'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Mật khẩu phải tối thiểu 6 ký tự',
    'any.required': 'Mật khẩu là bắt buộc'
  })
});

function validateLogin(req, res, next) {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}

module.exports = { validateLogin };
