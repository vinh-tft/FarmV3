const mongoose = require("mongoose");
const Counter = require("./Counter.Model");

const { Schema } = mongoose;

const FARM_STATUS = ["pending", "active", "inactive"];

const farmSchema = new Schema(
  {
    farmId: { type: Number, unique: true },
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true },
    area: { type: Number, default: 0 },
    status: {
      type: String,
      enum: FARM_STATUS,
      default: "pending",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);


farmSchema.pre("save", async function (next) {
  const doc = this;
  if (doc.isNew) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { id: "farmId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      doc.farmId = counter.seq;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

farmSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret.farmId;
    delete ret._id;
  },
});

module.exports = mongoose.model("Farm", farmSchema);
