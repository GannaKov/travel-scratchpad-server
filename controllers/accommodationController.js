const Accommodation = require("../models/accommodationModel");

const getAllAccommodationTypes = async (req, res, next) => {
  try {
    const result = await Accommodation.find();
    console.log(result);
    if (result.length === 0) {
      throw { status: 404, message: "No Accommodation type found" };
    }
    const typesArray = result.map((obj) => obj.type);

    res.status(200).json({
      status: "success",
      code: 200,
      data: typesArray,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllAccommodationTypes,
};
