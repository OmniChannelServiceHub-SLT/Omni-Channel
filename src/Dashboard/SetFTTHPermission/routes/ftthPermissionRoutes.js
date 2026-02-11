const express = require('express');
const router = express.Router();
const ftthPermissionController = require('../controllers/ftthPermissionController');

// Standardized GET endpoint
router.get('/', ftthPermissionController.setFTTHPermission);

module.exports = router;
