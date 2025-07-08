const mongoose = require("mongoose");
const Counter = require("../Models/Counter.Model"); // Đường dẫn đúng tới Counter model
const { Schema } = mongoose;

const VALID_TYPES = ["vegetable", "poultry", "livestock"];
const UNIT_MAP = {
  vegetable: "kg",
  poultry: "unit",
  livestock: "unit",
};

const animalSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, enum: VALID_TYPES },
    quantity: { type: Number, default: 0, min: 0 },
    unit: { type: String, enum: Object.values(UNIT_MAP) },
    description: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    farmId: { type: Number, unique: true, sparse: true },  
  },
  { timestamps: true }
);

animalSchema.pre("validate", function (next) {
  this.unit = UNIT_MAP[this.type];
  next();
});

// Tăng farmId tự động trước khi lưu nếu mới
animalSchema.pre("save", async function (next) {
  if (this.isNew && !this.farmId) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { id: "farmId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.farmId = counter.seq;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

animalSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret.farmId;  // trả về id = farmId tự tăng
    delete ret._id;
    delete ret.farmId;    // ẩn trường farmId nếu không muốn lặp
  },
});

module.exports = mongoose.model("Animal", animalSchema);
