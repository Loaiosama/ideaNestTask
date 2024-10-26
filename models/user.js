const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String } // Add refreshToken field
});

// Remove bcrypt hashing logic
userSchema.pre('save', async function(next) {
  // Just call next() without modifying the password
  next();
});

module.exports = mongoose.model('User', userSchema);
