const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const TripPurpose = require("./tripPurposeModel");

const accommodationSchema = new Schema({
  type: String,
  link: String,
  price: Number,
  rating: Number,
  review: String,
});

const expenseSchema = new Schema({
  item: String,
  amount: String,
});

const tripSchema = new Schema(
  {
    // title: { type: String, required: true },
    // travel_rating: { type: Number, required: true },
    // countries: [{ type: String, required: true }],
    // destination: [{ type: String, required: true }],
    // date_start: { type: Date, required: true },
    // date_end: { type: Date, required: true },
    // months: [{ type: Number, required: true }],
    // year: [String],
    // seasons: [{ type: String, required: true }],
    title: { type: String }, //
    travel_rating: { type: Number }, //
    countries: [{ type: String }],
    destination: [{ type: String }],
    date_start: { type: Date }, //
    date_end: { type: Date }, //
    months: [{ type: Number }],
    year: [String],
    seasons: [{ type: String }],
    accommodation: [accommodationSchema],
    purpose: [
      {
        _id: { type: Schema.Types.ObjectId, ref: "TripPurpose" },
        purpose: String,
      },
    ],
    advice: String,
    expenses: [expenseSchema],
    useful_links: [{ link: String, topic: String }],
    images: [String],
    main_img: String,

    total_amount: String,
  },
  { collection: "travels" }
);

const Trip = model("Trip", tripSchema);

module.exports = Trip;
