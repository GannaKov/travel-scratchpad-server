const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const TripPurpose = require("./tripPurposeModel");

// const accommodationSchema = new Schema({
//   type: String,
//   link: String,
//   price: Number,
//   rating: Number,
//   review: String,
// });

// const expenseSchema = new Schema({
//   item: String,
//   amount: String,
// });

// const tripSchema = new Schema(
//   {
//     // title: { type: String, required: true },
//     // travel_rating: { type: Number, required: true },
//     // countries: [{ type: String, required: true }],
//     // destination: [{ type: String, required: true }],
//     // // date_start: { type: Date, required: true },
//     // // date_end: { type: Date, required: true },
//     // date_start: { type: String, required: true },
//     // date_end: { type: String, required: true },
//     title: String,
//     travel_rating: Number,
//     countries: [String],
//     destination: [{ type: String, required: true }],

//     date_start: String,
//     date_end: String,
//     //-----
//     months: [{ type: Number, required: true }],
//     year: [String],
//     seasons: [{ type: String, required: true }],

//     accommodation: [accommodationSchema],
//     purpose: [
//       {
//         _id: { type: Schema.Types.ObjectId, ref: "TripPurpose" },
//         purpose: String,
//       },
//     ],
//     advice: String,
//     expenses: [expenseSchema],
//     useful_links: [{ link: String, topic: String }],
//     images: [String],
//     main_img: String,

//     total_amount: String,
//   },
//   { collection: "travels" }
//);

const tripSchema = new Schema(
  {
    title: { type: String, required: true },
    travel_rating: { type: Number, required: true },
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
        price: { type: Number },
        rating: { type: Number },
        review: { type: String },
      },
    ],
    purpose: [{ type: String, required: true }],
    advice: { type: String },
    expenses: [
      {
        item: { type: String },
        amount: { type: Number },
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
  },
  { collection: "travels" }
);

const Trip = model("Trip", tripSchema);

module.exports = Trip;
