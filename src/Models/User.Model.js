const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String }, // có thể null nếu đăng nhập OAuth
    email:    { type: String, required: true, unique: true },
    phone:    { type: String, default: '' },
    role:     { type: String, enum: ['ADMIN', 'FARMER', 'CUSTOMER'], default: 'CUSTOMER' },
    isActive: { type: Boolean, default: true },
    googleId:    { type: String, default: null },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

// Hash password trước khi lưu
userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// So sánh mật khẩu
userSchema.methods.comparePassword = function(candidate) {
  return bcrypt.compare(candidate, this.password);
};

// Tạo token lấy lại mật khẩu
userSchema.methods.generatePasswordReset = function() {
  this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordExpires = Date.now() + 3600000; // 1h
};

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.password;
    delete ret.resetPasswordToken;
    delete ret.resetPasswordExpires;
  }
});

module.exports = mongoose.model('User', userSchema);