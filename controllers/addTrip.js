const Trip = require("../models/tripModel");
const { cloudinaryConfig, uploader } = require("../utils/cloudinaryConfig");

const handleUpload = async (file) => {
  const res = await uploader.upload(file, {
    resource_type: "auto",
    //folder:'folder_name'
  });

  return res;
};
const addTrip = async (req, res) => {
  try {
    // console.log("req.body :", req.body);
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
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
    //res.status(500).json({ error: 'Error uploading image to Cloudinary' });
    res.send({
      message: error.message,
    });
  }
};

module.exports = { addTrip };
