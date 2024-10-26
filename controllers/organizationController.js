const Organization = require('../models/organization');
const User = require('../models/user');
const { sendEmail } = require('../utils/email');


// Create a new organization
exports.createOrganization = async (req, res) => {
  try {
    const { name, description } = req.body;
    console.log(req.user._id);

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

    res.json({ message: 'Organization updated successfully',organization_id: organization.id, name: organization.name, description: organization.description });
  } catch (error) {
    res.status(500).json({ message: 'Error updating organization', error });
  }
};

exports.deleteOrganization = async (req, res) => {
    const { id } = req.params; // Ensure `orgId` matches the request URL parameter

    try {
        console.log(id);
        const organization = await Organization.findById(id); // Find organization first

        if (!organization) {
            return res.status(404).json({ message: 'Organization not found' });
        } 

        // Check if the requesting user is the creator
        if (organization.creator.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not allowed; only creator can delete organization"
            });
        }

        // Now delete the organization
        await Organization.findByIdAndDelete(id);

        res.status(200).json({ message: 'Organization deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Error deleting organization', error });
    }
};



exports.getOrganization = async (req, res) => {

    const {id} = req.params;

    try {
        
        const organization = await Organization.findById(id);
        if(!organization){
            return res.status(404).json({
                message: "Organization does not exist."
            })
        }

        res.status(200).json({
            message: "Organization retrieved successfully.",
            organization
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error
        })
        
    }
}

exports.getAllOrganizations = async (req, res) => {

    try {

        const organizations = await Organization.find();

        if(!organizations){
            return res.status(404).json({
                message: "No organizations exist."
            })
        }

        res.status(200).json({
            message: "Organizations retrieved successfully.",
            organizations
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal server error.",
            error
        })
    }

}


exports.inviteToOrganization = async (req, res) => {
    const { email } = req.body;
    const { id} = req.params;
    const invitingUserId = req.user._id; // Get the ID of the authenticated user

    try {
        // Check if organization exists
        const organization = await Organization.findById(id);
        if (!organization) {
            return res.status(404).json({ message: 'Organization not found' });
        }

        // Check if the authenticated user is the creator
        if (organization.creator.toString() !== invitingUserId.toString()) {
            return res.status(403).json({ message: 'Only the creator can invite users to this organization' });
        }

        // Check if the user being invited exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if user is already a member of the organization
        const isMember = organization.members.some(member => member.email === email);
        if (isMember) {
            return res.status(400).json({ message: 'User is already a member of the organization' });
        }

        // Add user to organization members
        organization.members.push({
            name: user.name,
            email: user.email,
            accessLevel: 'member' // Default access level
        });
        await organization.save();

        // Send email invitation
        await sendEmail(email, `Invitation to join ${organization.name}`);

        res.json({ message: 'User invited successfully' });
        
    } catch (error) {
        res.status(500).json({ message: 'Error inviting user', error });
    }
};
