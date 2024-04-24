const Trip = require("../models/tripModel");
const { cloudinaryConfig, uploader } = require("../utils/cloudinaryConfig");
const { nanoid } = require("nanoid");

const handleUpload = async (file) => {
  const res = await uploader.upload(file, {
    resource_type: "image",
    folder: "travel-scratchpad",
    public_id: Date.now() + nanoid(6),
    transformation: {
      width: 1000,
      height: 1000,
      gravity: "auto",
      crop: "fill",
    },
  });

  return res;
};

const getCloudinaryUrl = async (req) => {
  const b64 = Buffer.from(req.file.buffer).toString("base64");
  let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
  const cldRes = await handleUpload(dataURI);
  return cldRes;
};

const addTrip = async (req, res) => {
  try {
    // console.log("req.body :", req.body);

    const cldRes = await getCloudinaryUrl(req);
    // console.log("cldRes", cldRes.url);
    const fileUrl = cldRes.url;
    const newTrip = new Trip({
      main_img: fileUrl,
    });
    const result = await newTrip.save();

    //res.json(cldRes);
    if (!result) {
      throw { status: 500, message: "Failed to create image" };
    }
    res.status(201).json({ status: "Created ", code: 201, data: result });
    //// Send the Cloudinary URL in the response
    // res.json({ imageUrl: result.secure_url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error uploading image to Cloudinary" });
    // res.send({
    //   message: error.message,
    // });
  }
};

module.exports = { addTrip };
