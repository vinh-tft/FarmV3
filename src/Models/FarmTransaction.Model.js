const mongoose = require("mongoose");
const { Schema } = mongoose;

const farmTransactionSchema = new Schema(
  {
    farmId: {
      type: Schema.Types.ObjectId,
      ref: "Farm",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: { type: Number, required: true },
    transactionType: {
      type: String,
      enum: ["RENT", "PURCHASE", "DEPOSIT"],
      required: true,
    },
    transactionDate: {
      type: Date,
      default: Date.now,
    },
    note: { type: String, default: "" },
  },
  { timestamps: true }
);

farmTransactionSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

module.exports = mongoose.model("FarmTransaction", farmTransactionSchema);
