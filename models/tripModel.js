const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const accommodationSchema = new Schema({
  type: String,
  link: String,
  price: Number,
  rating: Number,
  review: String,
});

const expenseSchema = new Schema({
  item: String,
  amount: Number,
});

const tripSchema = new Schema(
  {
    title: { type: String, required: true },
    travel_rating: { type: Number, required: true },
    countries: [{ type: String, required: true }],
    destination: [{ type: String, required: true }],
    date_start: { type: Date, required: true },
    date_end: { type: Date, required: true },
    months: String,
    year: String,
    seasons: String,
    accommodation: [accommodationSchema],
    purpose: [{ type: String, required: true }],
    advice: String,
    expenses: [expenseSchema],
    useful_links: [[String]],
    images: [String],
    main_img: String,
  },
  { collection: "travels" }
);

const Trip = model("Trip", tripSchema);

module.exports = Trip;
