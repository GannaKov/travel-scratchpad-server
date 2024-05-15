const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userLocationsSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    listOfLocations: [
      {
        name: {
          type: String,
          required: true,
        },
        location: {
          lat: {
            type: Number,
            required: true,
          },
          lng: {
            type: Number,
            required: true,
          },
        },
      },
    ],
  },

  { collection: "locations" }
);

// Модель
const UserLocations = model("UserLocations", userLocationsSchema);

module.exports = UserLocations;
