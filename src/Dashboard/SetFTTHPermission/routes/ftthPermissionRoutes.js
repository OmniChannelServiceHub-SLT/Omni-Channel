// TMF672 - User Roles & Permissions v4
const express = require('express');
const router = express.Router();
const ftthPermissionController = require('../controllers/ftthPermissionController');

// GET /tmf-api/userRolesPermissions/v4/permission/ftth?userName=xxx&privilege=xxx
router.get('/permission/ftth', ftthPermissionController.setFTTHPermission);

module.exports = router;
