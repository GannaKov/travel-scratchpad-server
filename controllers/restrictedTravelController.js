const Trip = require("../models/tripModel");
const mongoose = require("mongoose");

const getAllOwnTrips = async (req, res, next) => {
  const { id: owner } = req.user;

  const ownerId = mongoose.Types.ObjectId.createFromHexString(owner);
  console.log("owner", ownerId);
  try {
    // const isSort = req.query.sort;

    // const result = isSort
    //   ? await Country.find().sort({ visited: -1, name: 1 })
    //   : await Country.find().sort({ visited: -1 });

    const result = await Trip.find({ owner: ownerId });

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

module.exports = {
  getAllOwnTrips,
};
