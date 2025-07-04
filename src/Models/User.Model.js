const mongoose = require('mongoose');
const Counter = require("../Models/Counter.Model");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userId: { type: Number, unique: true },
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String },
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

// Tự động tăng userId khi tạo user mới
userSchema.pre("save", async function (next) {
  if (this.isNew && !this.userId) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { id: "userId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.userId = counter.seq;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

// Chỉnh sửa JSON trả về
userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret.userId;    // Trả về id là số tăng userId
    delete ret._id;         // Ẩn _id mặc định MongoDB
    delete ret.password;    // Ẩn password
    delete ret.userId;      // Ẩn trường userId gốc
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
