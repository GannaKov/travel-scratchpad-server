const jwt = require("jsonwebtoken");
//require("dotenv").config();????

const authentication = async (req, res, next) => {
  //const authHeader = req.headers["authorization"]; // Bearer TOKEN
  const { authorization = "" } = req.headers;
  //const token = authHeader && authHeader.split(" ")[1];
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401, "Problem with Bearer"));
  }
  if (token === null) {
    next(HttpError(401, "Null token"));
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) next(HttpError(401, "Not authorized"));
    //if (error) return res.status(403).json({ error: error.message });
    req.user = user;
    next();
  });
  //so????????
  //   try {
  //     const { id } = jwt.verify(token, ACCESS_TOKEN_SECRET);

  //     const user = await User.findById(id);
  //     if (!user || !user.token || user.token !== token) {
  //       next(HttpError(401, "Not authorized"));
  //     }
  //     req.user = user;
  //     next();
  //   } catch {
  //     next(HttpError(401));
  //   }
};

// const authentication = async (req, res, next) => {
//   const { authorization = "" } = req.headers;

//   const [bearer, token] = authorization.split(" ");

//   if (bearer !== "Bearer") {
//     next(HttpError(401, "Problem with Bearer"));
//   }
//   try {
//     const { id } = jwt.verify(token, SECRET_KEY);

//     const user = await User.findById(id);
//     if (!user || !user.token || user.token !== token) {
//       next(HttpError(401, "Not authorized"));
//     }
//     req.user = user;
//     next();
//   } catch {
//     next(HttpError(401));
//   }
// };

module.exports = authentication;
