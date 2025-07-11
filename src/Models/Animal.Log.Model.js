const mongoose = require("mongoose");
const { Schema } = mongoose;

const animalLogSchema = new Schema(
  {
    animalId: {
      type: Number, 
      required: true,
      ref: "Animal",
    },
    note: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: String, 
      default: "Farmer",
    },
  },
  { timestamps: true }
);

animalLogSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

module.exports = mongoose.model("AnimalLog", animalLogSchema);
