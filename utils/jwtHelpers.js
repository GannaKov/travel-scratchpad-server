const jwt = require("jsonwebtoken");

const jwtTokens = ({ id, username, email }, expiresAt) => {
  const user = { id, username, email, expiresAt };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_LIFE,
  });

  return {
    accessToken,
    refreshToken,
  };
};

module.exports = { jwtTokens };
