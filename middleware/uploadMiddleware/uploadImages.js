const Multer = require("multer");

const storage = new Multer.memoryStorage();

const uploads = Multer({
  storage,

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
const multerUploads = uploads.single("main_file");
const multerMultyUploads = uploads.array("image_files", 4);

module.exports = { multerUploads, multerMultyUploads };
