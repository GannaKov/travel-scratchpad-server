const jwt = require("jsonwebtoken");

const jwtTokens = ({ id, username, email }, expiresAt) => {
  const user = { id, username, email, expiresAt };
  console.log("in jwt", user);
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_LIFE, // in reality will be 15 minutes, more common
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_LIFE, // in reality will be 14 days, more common
  });
  console.log(accessToken, refreshToken);
  return {
    accessToken,
    refreshToken,
  };
};

module.exports = { jwtTokens };
