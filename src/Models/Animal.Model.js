const mongoose = require("mongoose");
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
    farmId: { type: Schema.Types.ObjectId, ref: "Farm", required: true },
  },
  { timestamps: true }
);

animalSchema.pre("validate", function (next) {
  this.unit = UNIT_MAP[this.type];
  next();
});

animalSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

module.exports = mongoose.model("Animal", animalSchema);

