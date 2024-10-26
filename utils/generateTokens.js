const jwt = require('jsonwebtoken');

exports.generateAccessToken = (userId) => {
  return jwt.sign({ _id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Include user ID in the payload
};

exports.generateRefreshToken = (userId) => {
  return jwt.sign({ _id: userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' }); // Include user ID in the payload
};


