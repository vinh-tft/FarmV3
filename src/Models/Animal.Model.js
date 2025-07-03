const mongoose = require("mongoose");
const { Schema } = mongoose;

const animalSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    description: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    farmId: {
      type: Schema.Types.ObjectId,
      ref: "Farm",
      required: true,
    },
  },
  { timestamps: true }
);

animalSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

module.exports = mongoose.model("Animal", animalSchema);
