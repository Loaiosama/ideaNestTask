const Organization = require('../models/organization');

// Create a new organization
exports.createOrganization = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Use req.user._id to get the ID of the authenticated user (creator)
    const organization = await Organization.create({ 
      name, 
      description, 
      creator: req.user._id // Store the ID of the creator
    });

    res.status(201).json({ organizationId: organization._id });
  } catch (error) {
    res.status(500).json({ message: 'Error creating organization', error });
  }
};

// Update organization details
exports.updateOrganization = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    // Find the organization by ID
    const organization = await Organization.findById(id);
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    // Check if the requester is the creator of the organization
    if (organization.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden: Only the creator can update the organization' });
    }

    // Update organization details
    Object.assign(organization, updates);
    await organization.save();

    res.json({ message: 'Organization updated successfully', organization });
  } catch (error) {
    res.status(500).json({ message: 'Error updating organization', error });
  }
};

