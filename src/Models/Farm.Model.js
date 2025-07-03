const mongoose = require("mongoose");
const { Schema } = mongoose;

const FARM_STATUS = ["pending", "active", "inactive"];

const farmSchema = new Schema(
  {
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
      required: true,
    },
  },
  { timestamps: true }
);

farmSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

module.exports = mongoose.model("Farm", farmSchema);
