const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: [
    {
      name: String,
      email: String,
      accessLevel: { type: String, default: 'member' },
    },
  ],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
});

module.exports = mongoose.model('Organization', organizationSchema);
