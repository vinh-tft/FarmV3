const mongoose = require("mongoose");
const { Schema } = mongoose;

const farmPictureSchema = new Schema(
  {
    farmId: {
      type: Schema.Types.ObjectId,
      ref: "Farm",
      required: true,
    },
    url: { type: String, required: true },
    description: { type: String, default: "" },
    isMain: { type: Boolean, default: false },
  },
  { timestamps: true }
);

farmPictureSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

module.exports = mongoose.model("FarmPicture", farmPictureSchema);
