const mongoose = require("mongoose");
const Counter = require("./Counter.Model");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userId: { type: Number, unique: true },
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, default: "" },
    role: {
      type: String,
      enum: ["ADMIN", "FARMER", "CUSTOMER"],
      default: "CUSTOMER",
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { id: "userId" },
        { $inc: { seq: 0 } },
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

userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret.userId;
    delete ret._id;
    delete ret.password;
    delete ret.userId;
  },
});

module.exports = mongoose.model("User", userSchema);
