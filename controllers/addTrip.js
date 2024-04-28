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
//norm version
// const getCloudinaryUrl = async (req) => {
//   if (!req.file) {
//     return { url: null };
//   }
//   const b64 = Buffer.from(req.file.buffer).toString("base64");
//   let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
//   const cldRes = await handleUpload(dataURI);
//   return cldRes;
// };
//experiment
const getCloudinaryUrl = async (img) => {
  if (!img) {
    return { url: null };
  }
  const b64 = Buffer.from(img.buffer).toString("base64");
  let dataURI = "data:" + img.mimetype + ";base64," + b64;
  const cldRes = await handleUpload(dataURI);
  return cldRes;
  // for (const file in req.files) {
  //   const b64 = Buffer.from(file.buffer).toString("base64");
  //   let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
  //   const cldRes = await handleUpload(dataURI);
  //   return cldRes;
  // }
};
const addTrip = async (req, res) => {
  try {
    //console.log("req", req);

    //const cldRes = await getCloudinaryUrl(req);
    //const fileUrl = cldRes.url;
    // -----multy promise --------
    const uploadedImages = await Promise.all(
      req.files.map(async (image) => {
        const cldRes = await getCloudinaryUrl(image);
        return cldRes.url;
      })
    );
    // (constuploadedImages = async () => {
    //   for (const image in images) {
    //     const result = await getCloudinaryUrl(images[image]);
    //     console.log(result);
    //   }
    // });
    console.log("UplImg", uploadedImages);
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
      // main_img: fileUrl,
      main_img: uploadedImages[0],
      images: uploadedImages,
    });
    // for multy if I need
    // if (!uploadedImages || uploadedImages.length === 0) {
    //   delete newTripData.images;
    // }
    // for one if I need
    // if (!fileUrl) {
    //   delete newTripData.main_img;
    // }

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

//   put change trip/:шв
const updateTrip = async (req, res, next) => {
  try {
    const { id } = req.params;

    const trip = await Trip.findById(id);
    if (!trip) {
      console.log("no trip");
      throw { status: 404, message: "Trip not found" };
    }
    const cldRes = await getCloudinaryUrl(req);

    const fileUrl = cldRes.url;
    const data = JSON.parse(req.body.data);
    //const { data } = req.body;
    const startDate = dayjs(data.date_start, "DD.MM.YYYY").toDate();
    const endDate = dayjs(data.date_end, "DD.MM.YYYY").toDate();
    const tripData = {
      ...data,
      travel_rating: Number(data.travel_rating),
      title: data.title.trim(),
      date_start: startDate,
      date_end: endDate,
    };
    if (fileUrl) {
      tripData.main_img = fileUrl;
    } else {
      delete tripData.main_img;
    }

    const updatedTrip = await Trip.findByIdAndUpdate(id, tripData, {
      new: true,
    });

    if (!updatedTrip) {
      throw res.status(500).send("Error updating country");
    }
    res.status(200).json({
      status: "updated ",
      code: 200,
      data: tripData,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = { addTrip, updateTrip };
