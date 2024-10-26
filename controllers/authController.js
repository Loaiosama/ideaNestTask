const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateTokens');

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Save the plaintext password directly (not recommended)
    const user = await User.create({ name, email, password });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    // Check for user existence and compare passwords directly (not recommended)
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Store the refresh token in the database
    await User.updateOne({ _id: user._id }, { refreshToken });

    res.json({ message: 'Sign in successful', accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: 'Error signing in', error });
  }
};


exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    // Find the user associated with the refresh token
    const user = await User.findOne({ refreshToken });
    if (!user) return res.status(401).json({ message: 'Invalid refresh token' });

    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    // Update the user's refresh token in the database
    await User.updateOne({ _id: user._id }, { refreshToken: newRefreshToken });

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (error) {
    res.status(500).json({ message: 'Error refreshing token', error });
  }
};
