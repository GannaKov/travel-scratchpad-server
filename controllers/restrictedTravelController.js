const Trip = require("../models/tripModel");
const mongoose = require("mongoose");
const { cloudinaryConfig, uploader } = require("../utils/cloudinaryConfig");
const { nanoid } = require("nanoid");
const dayjs = require("dayjs");
var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

// Get All Own  Trips
const getAllOwnTrips = async (req, res, next) => {
  const { id: owner } = req.user;

  // string to objectId
  const ownerId = mongoose.Types.ObjectId.createFromHexString(owner);

  //-----
  try {
    //combine query
    let query = { owner: ownerId };
    if (req.query.country) {
      query.countries = req.query.country;
    }

    //------
    const result = await Trip.find(query);

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

const deleteTripById = async (req, res, next) => {
  const { id: owner } = req.user;

  try {
    const { id } = req.params;

    const trip = await Trip.findById(id);

    if (!trip) {
      throw { status: 404, message: "Trip not found" };
    }
    console.log("owner", owner, "trip.owner", trip.owner.toString());
    if (owner !== trip.owner.toString()) {
      console.log("!owner");
      return res.status(403).json({ message: "Access denied" });
    }
    // delete from  Cloudinary
    if (trip.main_img) {
      const publicId = trip.main_img.split("/").pop().split(".")[0];

      await uploader
        .destroy(`travel-scratchpad/${publicId}`)
        .then((res) => console.log("photo", res));
    }

    if (trip.images.length > 0) {
      trip.images.forEach(async (img) => {
        const publicId = img.split("/").pop().split(".")[0];

        await uploader.destroy(`travel-scratchpad/${publicId}`);
        // .then((res) => console.log("photo", res));
      });
    }
    //-------- end delete from  Cloudinary

    const result = await Trip.findOneAndDelete({
      _id: req.params.id,
      owner: owner,
    });

    if (!result) {
      return res.status(500).send("Error deleting result");
    }
    return res.status(200).json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (err) {
    console.log("in catch");
    next(err);
  }
};

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

const getCloudinaryUrl = async (img) => {
  if (!img) {
    return { url: null };
  }
  const b64 = Buffer.from(img.buffer).toString("base64");
  let dataURI = "data:" + img.mimetype + ";base64," + b64;
  const cldRes = await handleUpload(dataURI);
  return cldRes;
};

// post trip
const addTrip = async (req, res) => {
  try {
    const { id: owner } = req.user;

    //const cldRes = await getCloudinaryUrl(req);
    //const fileUrl = cldRes.url;
    // -----multy promise --------
    const uploadedImages = await Promise.all(
      req.files.map(async (image) => {
        const cldRes = await getCloudinaryUrl(image);
        return cldRes.url;
      })
    );
    // prep data for backend
    const data = JSON.parse(req.body.data);

    const startDate = dayjs(data.date_start, "DD.MM.YYYY").toDate();
    const endDate = dayjs(data.date_end, "DD.MM.YYYY").toDate();

    const mainImg = uploadedImages.length > 0 ? uploadedImages[0] : "";
    //--------------
    const newTripData = new Trip({
      ...data,
      travel_rating: Number(data.travel_rating),
      title: data.title.trim(),
      date_start: startDate,
      date_end: endDate,
      // main_img: fileUrl,
      main_img: mainImg,
      images: uploadedImages,
      owner: owner,
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
  const { id: owner } = req.user;
  const { id } = req.params;
  console.log("id", id);
  // if (owner !== id) {
  //   console.log("owner", owner, "id", id);
  //   return res.status(403).json({ message: "Access denied" });
  // }

  // console.log("req.files in put", req.files);
  const { isMainImgChanged, image_files, old_images } = req.body;
  // console.log("old_images", old_images, typeof old_images);
  // console.log("isMainImgChanged", isMainImgChanged, typeof isMainImgChanged);

  try {
    const trip = await Trip.findById(id);

    if (!trip) {
      throw { status: 404, message: "Trip not found" };
    }
    console.log("owner", owner, "trip.owner", trip.owner.toString());
    if (owner !== trip.owner.toString()) {
      console.log("!owner");
      return res.status(403).json({ message: "Access denied" });
    }
    // old one
    // const cldRes = await getCloudinaryUrl(req);

    // const fileUrl = cldRes.url;

    // delete from  Cloudinary prev images

    // if (trip.main_img) { now i do not it
    //   const publicId = trip.main_img.split("/").pop().split(".")[0];

    //   await uploader
    //     .destroy(`travel-scratchpad/${publicId}`)
    //     .then((res) => console.log("photo", res));
    // }
    // ---- end old one

    // delete from Cloudinary prev images
    // console.log("trip.images", trip.images);
    // if (trip.images.length > 0) {
    //   trip.images.forEach(async (img) => {
    //     const publicId = img.split("/").pop().split(".")[0];
    //     console.log("in delete", publicId);
    //     await uploader.destroy(`travel-scratchpad/${publicId}`);
    //   });
    // }
    let oldImgArr = [];
    if (old_images) {
      oldImgArr = Array.isArray(old_images) ? old_images : [old_images];
    } else {
      oldImgArr = [];
    }
    //const oldImgArr = Array.isArray(old_images) ? old_images : [old_images];

    if (trip.images.length > 0) {
      trip.images.forEach(async (img) => {
        const publicId = img.split("/").pop().split(".")[0];
        if (oldImgArr.length > 0) {
          const isInOldImages = oldImgArr.some((oldImg) => {
            const oldPublicId = oldImg.split("/").pop().split(".")[0];
            return oldPublicId === publicId;
          });

          if (!isInOldImages) {
            await uploader.destroy(`travel-scratchpad/${publicId}`);
          }
        } else {
          await uploader.destroy(`travel-scratchpad/${publicId}`);
        }
      });
    }
    //-------- end delete from Cloudinary prev images
    // to Cloudinary
    const uploadedImages = await Promise.all(
      req.files.map(async (image) => {
        const cldRes = await getCloudinaryUrl(image);
        return cldRes.url;
      })
    );
    // ---- end to Cloudinary

    // prep data for backend
    const data = JSON.parse(req.body.data);

    const startDate = dayjs(data.date_start, "DD.MM.YYYY").toDate();
    const endDate = dayjs(data.date_end, "DD.MM.YYYY").toDate();

    //const mainImg = uploadedImages.length > 0 ? uploadedImages[0] : "";
    // const mainImg =
    //   isMainImgChanged === "true"
    //     ? uploadedImages[0]
    //     : old_images
    //     ? old_images[0]
    //     : "";

    let allImages = [];

    if (isMainImgChanged === "true") {
      allImages = [...uploadedImages, ...oldImgArr];
    } else {
      allImages = [...oldImgArr, ...uploadedImages];
    }
    let mainImg = allImages.length > 0 ? allImages[0] : "";
    console.log("uploadedImages ", uploadedImages);
    console.log("allImages", allImages);
    console.log("oldImgArr", oldImgArr);
    console.log("mainImg", mainImg);
    //--------------
    const tripData = {
      ...data,
      travel_rating: Number(data.travel_rating),
      title: data.title.trim(),
      date_start: startDate,
      date_end: endDate,
      main_img: mainImg,
      images: allImages,
    };
    //´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´comment
    //for one
    // if (fileUrl) {
    //   tripData.main_img = fileUrl;
    // } else {
    //   delete tripData.main_img;
    // }
    //for many ????
    // if (!uploadedImages || uploadedImages.length === 0) {
    //   // Если массив пустой или его длина равна 0, удаляем поле images из объекта newTripData
    //   delete tripData.images;
    // }
    //´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´
    console.log("before updatedTrip");
    const updatedTrip = await Trip.findByIdAndUpdate(id, tripData, {
      new: true,
    });

    if (!updatedTrip) {
      console.log("!updatedTrip");
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
module.exports = {
  getAllOwnTrips,
  deleteTripById,
  updateTrip,
  addTrip,
};
