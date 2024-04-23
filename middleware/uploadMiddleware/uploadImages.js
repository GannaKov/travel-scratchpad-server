const Multer = require("multer");

//import { nanoid } from "nanoid";

const recipeImgParams = {
  dimensions: {
    width: 500,
    height: 500,
  },
  maxFileSize: 1000000,
  acceptableFileTypes: ["jpg", "png", "jpeg"],
};
const storage = new Multer.memoryStorage();

const uploads = Multer({
  storage,
  //   filename: (req, file, cb) => {
  //     cb(null, file.originalname);
  //   },
  //   limits: {
  //     fileSize: 1048576,
  //     files: 5,
  //   },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg, .jpeg format allowed!"));
    }
  },
});
const multerUploads = uploads.single("my_file");

module.exports = { multerUploads };
