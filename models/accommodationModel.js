const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const accommodationSchema = new Schema(
  {
    type: { type: String, required: true },
  },
  { collection: "accommodations" }
);

const Accommodation = model("Accommodation ", accommodationSchema);

module.exports = Accommodation;
