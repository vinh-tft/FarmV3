const mongoose = require('mongoose');
const crypto = require('crypto');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String }, // plain text password (KHÔNG BẢO MẬT)
    email:    { type: String, required: true, unique: true },
    phone:    { type: String, default: '' },
    role:     { type: String, enum: ['ADMIN', 'FARMER', 'CUSTOMER'], default: 'CUSTOMER' },
    isActive: { type: Boolean, default: true },
    googleId: { type: String, default: null },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

// userSchema.methods.generatePasswordReset = function () {
//   this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
//   this.resetPasswordExpires = Date.now() + 3600000; // 1 giờ
// };

// Ẩn một số trường khi toJSON
userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.password;
    // delete ret.resetPasswordToken;
    // delete ret.resetPasswordExpires;
  },
});

module.exports = mongoose.model('User', userSchema);
