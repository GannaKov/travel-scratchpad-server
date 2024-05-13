const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const tripPurposeSchema = new Schema(
  {
    purpose: { type: String, required: true },
  },

  { collection: "tripPurpose" }
);

const TripPurpose = model("TripPurpose", tripPurposeSchema);

module.exports = TripPurpose;
