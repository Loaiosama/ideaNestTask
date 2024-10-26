const Organization = require('../models/organization');

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

exports.deleteOrganization = async (req, res) =>{
    const {orgId} = req.param;
    const {creatorId} = req.user._id;

    try {

        const organization = await Organization.findByIdAndDelete(id);

        if (!organization){

            return res.status(404).json({ message: 'Organization not found' });
        } 

        if(creatorId.toString() !== organization.creator.toString()){
            return res.status(403).json({
                message: "Not allowed; only creator can delete organization"
            })
        }

        res.status(200).json({ message: 'Organization deleted successfully' });

    }catch (error) {

        res.status(500).json({ message: 'Error deleting organization', error });
    }
    
}

exports.getOrganization = async (req, res) => {

    const {orgId} = req.param;

    try {
        
        const organization = Organization.findById(orgId);
        if(!organization){
            return res.status(404).json({
                message: "Organization does not exist."
            })
        }

        res.status(200).json({
            message: "Organization found successfully.",
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

        const organization = Organization.find();

        if(!organization){
            return res.status(404).json({
                message: "No organizations exist."
            })
        }

        res.status(200).json({
            message: "Organizations found successfully.",
            organization
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal server error.",
            error
        })
    }

}