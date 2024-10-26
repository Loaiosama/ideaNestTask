const express = require('express');
const { createOrganization } = require('../controllers/organizationController');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

router.post('/organization', authenticateToken, createOrganization);

module.exports = router;
