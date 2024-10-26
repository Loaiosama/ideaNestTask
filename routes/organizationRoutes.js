const express = require('express');
const orgController = require('../controllers/organizationController');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

router.post('/organization', authenticateToken, orgController.createOrganization);
router.put('/organization/:id', authenticateToken, orgController.updateOrganization);
router.delete('/organization/:id', authenticateToken, orgController.deleteOrganization);
router.get('/organization/:id', orgController.getOrganization);


module.exports = router;
