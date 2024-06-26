const jwt = require("jsonwebtoken");

//var 1
const authentication = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // only Bearer TOKEN
  const token = authHeader && authHeader.split(" ")[1]; // only Bearer TOKEN

  if (token === null) return res.status(401).json({ error: "Null token" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) return res.status(403).json({ error: error.message });

    req.user = user;
    next();
  });
};

//var 2
// const authenticationTocken = async (req, res, next) => {
//   //const authHeader = req.headers["authorization"]; // Bearer TOKEN
//   const { authorization = "" } = req.headers;

//   //const token = authHeader && authHeader.split(" ")[1];
//   const [bearer, token] = authorization.split(" ");

//   if (bearer !== "Bearer") {
//     //next(HttpError(401, "Problem with Bearer"));
//     return res.status(401).json({
//       status: "error",
//       code: 401,
//       message: "Problem with Bearer",
//       data: "Unauthorized",
//     });
//   }
//   if (token === null) {
//     // next(HttpError(401, "Null token"));
//     return res.status(401).json({
//       status: "error",
//       code: 401,
//       message: "Null token",
//       data: "Unauthorized",
//     });
//   }

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
//     //if (error) next(HttpError(401, "Not authorized"));
//     if (error) return res.status(403).json({ error: error.message });
//     req.user = user;
//     next();
//   });
// };

module.exports = authentication;
