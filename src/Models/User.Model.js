
import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
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

// Optional: Clean up when converting to JSON
userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.password; // Ẩn password khi trả về response
    delete ret._id;
  },
});

const User = mongoose.model("User", userSchema);
export default User;
