const UserLocations = require("../models/userLocationsModel");

const getLocationsByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const result = await UserLocations.findOne({ userId });

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
const putLocationsByUserId = async (req, res, next) => {
  const { userId } = req.params;
  const listOfLocations = req.body;

  const result = await UserLocations.findOneAndUpdate(
    { userId: userId },
    { userId, listOfLocations },
    { upsert: true, new: true }
  );
  res.status(200).json(result);
  try {
  } catch (err) {
    next(err);
  }
};

module.exports = { getLocationsByUserId, putLocationsByUserId };
