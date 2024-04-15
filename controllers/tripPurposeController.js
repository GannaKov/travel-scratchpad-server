const TripPurpose = require("../models/tripPurposeModel");

// GET all tripPurpose
const getAllTripsPurpose = async (req, res, next) => {
  try {
    const result = await TripPurpose.find();

    if (result.length === 0) {
      throw { status: 404, message: "No trip found" };
    }
    const purposesArray = result.map((obj) => obj.purpose);
    res.status(200).json({
      status: "success",
      code: 200,
      data: purposesArray,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllTripsPurpose,
};
