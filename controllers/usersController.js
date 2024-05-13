const User = require("../models/userModel");

const getAllUsers = async (req, res, next) => {
  try {
    const result = await User.find();

    if (result.length === 0) {
      throw { status: 404, message: "No user found" };
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

const getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await User.findById(id);

    if (!result) {
      throw { status: 404, message: "No user found" };
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

module.exports = { getUserById, getAllUsers };
