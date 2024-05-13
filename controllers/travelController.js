const Trip = require("../models/tripModel");
const { cloudinaryConfig, uploader } = require("../utils/cloudinaryConfig");

// GET all trips
const getAllTrips = async (req, res, next) => {
  try {
    let query = {};
    if (req.query.country) {
      query.countries = req.query.country;
    }
    if (req.query.purpose) {
      query.purpose = req.query.purpose;
    }

    const result = await Trip.find(query);

    if (result.length === 0) {
      throw { status: 404, message: "No trip found" };
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// //  get travel/:id
const getTripById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Trip.findById(id);

    if (!result) {
      throw { status: 404, message: "Trip not found" };
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllTrips,

  getTripById,
};
