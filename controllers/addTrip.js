const Trip = require("../models/tripModel");
const { cloudinaryConfig, uploader } = require("../utils/cloudinaryConfig");
const { nanoid } = require("nanoid");
const dayjs = require("dayjs");
var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

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
  if (!req.file) {
    return { url: null };
  }
  const b64 = Buffer.from(req.file.buffer).toString("base64");
  let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
  const cldRes = await handleUpload(dataURI);
  return cldRes;
};

const addTrip = async (req, res) => {
  try {
    //console.log("file", req.file);
    const cldRes = await getCloudinaryUrl(req);

    const fileUrl = cldRes.url;
    const data = JSON.parse(req.body.data);
    //const { data } = req.body;
    const startDate = dayjs(data.date_start, "DD.MM.YYYY").toDate();
    const endDate = dayjs(data.date_end, "DD.MM.YYYY").toDate();

    const newTripData = new Trip({
      ...data,
      travel_rating: Number(data.travel_rating),
      title: data.title.trim(),
      date_start: startDate,
      date_end: endDate,
      main_img: fileUrl,
    });
    if (!fileUrl) {
      delete newTripData.main_img;
    }

    const newTrip = new Trip(newTripData);

    const result = await newTrip.save();
    //res.json(cldRes);
    if (!result) {
      throw { status: 500, message: "Failed to create image" };
    }
    res.status(201).json({ status: "Created ", code: 201, data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error uploading image to Cloudinary" });
  }
};

module.exports = { addTrip };
