const jwt = require("jsonwebtoken");

const jwtTokens = ({ id, username, email }, expiresAt) => {
  const user = { id, username, email, expiresAt };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_LIFE, // in reality will be 15 minutes, more common
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_LIFE, // in reality will be 14 days, more common
  });

  return {
    accessToken,
    refreshToken,
  };
};

module.exports = { jwtTokens };
