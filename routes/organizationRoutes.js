const express = require('express');
const orgController = require('../controllers/organizationController');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

router.post('/organization', authenticateToken, orgController.createOrganization);
router.put('/organizations/:id', authenticateToken, orgController.updateOrganization);


module.exports = router;
