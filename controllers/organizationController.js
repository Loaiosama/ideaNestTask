const Organization = require('../models/organization');

exports.createOrganization = async (req, res) => {
  try {
    const { name, description } = req.body;
    const organization = await Organization.create({ name, description });
    res.status(201).json({ organizationId: organization._id });
  } catch (error) {
    res.status(500).json({ message: 'Error creating organization', error });
  }
};
