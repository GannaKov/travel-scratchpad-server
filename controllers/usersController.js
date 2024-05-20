const User = require("../models/userModel");
const { uploader } = require("../utils/cloudinaryConfig");

const getAllUsers = async (req, res, next) => {
  try {
    const result = await User.find().select({ avatar: 1, username: 1 });

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
    const result = await User.findById(id).select({ avatar: 1, username: 1 });

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

// change user (avatar)
const changeUser = async (req, res, next) => {
  try {
    const user = req.user;
    const id = user.id;

    const { new_avatar } = req.body;

    const userResult = await User.findById(id);

    const oldAvatar = userResult.avatar;

    if (oldAvatar) {
      const publicId = oldAvatar.split("/").pop().split(".")[0];

      await uploader.destroy(`Avatars/${publicId}`);
      // .then((res) => console.log("photo", res))
      // .catch((error) => console.log("error", error));
    }

    const result = await User.findByIdAndUpdate(
      id,
      { ...user, avatar: new_avatar },
      { new: true }
    ).lean();
    if (!result) {
      throw { status: 500, message: "Failed to update" };
    }
    res.status(200).json({
      status: "updated ",
      code: 200,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getUserById, getAllUsers, changeUser };
