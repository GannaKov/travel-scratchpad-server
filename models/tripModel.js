const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const tripSchema = new Schema(
  {
    title: { type: String, required: true },
    travel_rating: { type: Number }, //, required: true
    countries: [{ type: String, required: true }],
    destination: [{ type: String }],
    date_start: { type: Date, required: true },
    date_end: { type: Date, required: true },
    months: [{ type: Number }],
    years: [{ type: String }],
    seasons: [{ type: String }],
    accommodation: [
      {
        type: { type: String },
        link: { type: String },
        price: { type: String },
        rating: { type: Number },
        review: { type: String },
      },
    ],
    purpose: [{ type: String, required: true }],
    advice: { type: String },
    expenses: [
      {
        item: { type: String },
        amount: { type: String },
      },
    ],
    useful_links: [
      {
        link: { type: String },
        topic: { type: String },
      },
    ],
    images: [{ type: String }],
    main_img: { type: String },
    total_amount: { type: String },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { collection: "travels" }
);

const Trip = model("Trip", tripSchema);

module.exports = Trip;
