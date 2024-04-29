const Trip = require("../models/tripModel");
const { cloudinaryConfig, uploader } = require("../utils/cloudinaryConfig");

// GET all trips
const getAllTrips = async (req, res, next) => {
  try {
    // const isSort = req.query.sort;

    // const result = isSort
    //   ? await Country.find().sort({ visited: -1, name: 1 })
    //   : await Country.find().sort({ visited: -1 });

    const result = await Trip.find();

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

// //  get travel/:id
const getTripById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Trip.findById(id);

    if (!result) {
      throw { status: 404, message: "Trip not found" };
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

//delete one trip
const deleteTripById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const trip = await Trip.findById(id);

    if (!trip) {
      throw { status: 404, message: "Trip not found" };
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
    const result = await Trip.findByIdAndDelete(id);
    //console.log("del", result);
    if (!result) {
      throw res.status(500).send("Error deleting result");
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

//   put change trip/:code
// const updateCountry = async (req, res, next) => {
//   try {
//     const { code } = req.params;
//     const countryName = req.body?.name;
//     const countryAlpha2Code = req.body?.alpha2Code?.toUpperCase();
//     const countryAlpha3Code = req.body.alpha3Code?.toUpperCase();
//     const countryVisited = req.body?.visited;

//     const country = await Country.findOne({
//       $or: [
//         { alpha2Code: code.toUpperCase() },
//         { alpha3Code: code.toUpperCase() },
//       ],
//     });

//     if (!country) {
//       throw { status: 404, message: "Country not found" };
//     }
//     const newCountryName = countryName || country.name;
//     const newCountryAlpha2Code = countryAlpha2Code || country.alpha2Code;
//     const newCountryAlpha3Code = countryAlpha3Code || country.alpha3Code;
//     const newCountryVisited = countryVisited || country.visited;

//     const updatedCountry = await Country.findByIdAndUpdate(
//       country.id,
//       {
//         visited: newCountryVisited,
//         name: newCountryName,
//         alpha2Code: newCountryAlpha2Code.toUpperCase(),
//         alpha3Code: newCountryAlpha3Code.toUpperCase(),
//       },
//       { new: true }
//     );

//     if (!updatedCountry) {
//       throw res.status(500).send("Error updating country");
//     }
//     res.status(200).json({
//       status: "updated ",
//       code: 200,
//       data: updatedCountry,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// // POST
// const postCountry = async (req, res, next) => {
//   try {
//     const validResult = validationResult(req);

//     if (validResult.isEmpty()) {
//       const { visited } = req.body;
//       const { name, alpha2Code, alpha3Code } = matchedData(req);

//       const existingCountry = await Country.findOne({
//         $or: [
//           { alpha2Code: alpha2Code.toUpperCase() },
//           { alpha3Code: alpha3Code.toUpperCase() },
//         ],
//       });

//       if (existingCountry) {
//         return res.status(409).json({
//           status: "error",
//           code: 409,
//           message: "Country already exists",
//         });
//       } else {
//         const newCountry = new Country({
//           name,
//           alpha2Code: alpha2Code.toUpperCase(),
//           alpha3Code: alpha3Code.toUpperCase(),
//           visited,
//         });
//         const result = await newCountry.save();
//         if (!result) {
//           throw { status: 500, message: "Failed to create country" };
//         }
//         res.status(201).json({ status: "Created ", code: 201, data: result });
//       }
//     } else {
//       throw {
//         status: 400,
//         message: `Bad Request: ${validResult.array()[0].path} is ${
//           validResult.array()[0].value
//         }`,
//         errors: validResult.array(),
//       };
//     }
//   } catch (err) {
//     next(err);
//   }
// };

// // update visited
// const toggleVisitedStatus = async (req, res, next) => {
//   try {
//     const { code } = req.params;

//     const country = await Country.findOne({
//       $or: [
//         { alpha2Code: code.toUpperCase() },
//         { alpha3Code: code.toUpperCase() },
//       ],
//     });

//     if (!country) {
//       throw { status: 404, message: "Country not found" };
//     }
//     country.visited = !country.visited;
//     await country.save();

//     res.status(200).json({
//       status: "success",
//       code: 200,
//       message: `Visited status toggled for ${country.name}`,
//       data: country,
//     });
//   } catch (err) {
//     next(err);
//   }
// };
// delete /countries/:code

// const deleteCountry = async (req, res, next) => {
//   try {
//     const { code } = req.params;
//     console.log("code", code);
//     const country = await Country.findOne({
//       $or: [
//         { alpha2Code: code.toUpperCase() },
//         { alpha3Code: code.toUpperCase() },
//       ],
//     });

//     if (!country) {
//       throw { status: 404, message: "Country not found" };
//     }
//     const deletedCountry = await Country.findByIdAndDelete(country.id);
//     console.log("del", deletedCountry);
//     if (!deletedCountry) {
//       throw res.status(500).send("Error updating country");
//     }
//     res.status(200).json({
//       status: "success",
//       code: 200,
//       data: deletedCountry,
//     });
//   } catch (err) {
//     next(err);
//   }
// };
module.exports = {
  getAllTrips,
  // postCountry,
  getTripById,
  deleteTripById,
  // updateCountry,
  // //deleteCountry,
  // toggleVisitedStatus,
};
