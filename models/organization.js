const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: [
    {
      name: String,
      email: String,
      accessLevel: { type: String, default: 'member' }
    }
  ]
});

module.exports = mongoose.model('Organization', organizationSchema);
