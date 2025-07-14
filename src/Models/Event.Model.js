const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    farmId: { type: Number, ref: "Farm", required: true },
    location: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Event", EventSchema);
