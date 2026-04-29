// TMF672 - User Roles & Permissions v4
const express = require('express');
const router = express.Router();
const ftthLoginController = require('../controllers/ftthLoginController');

// GET /tmf-api/userRolesPermissions/v4/permission/ftthLogin?userName=xxx&privilege=xxx
router.get('/permission/ftthLogin', ftthLoginController.ftthDashboardLogin);

module.exports = router;
