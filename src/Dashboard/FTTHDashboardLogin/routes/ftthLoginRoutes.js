const express = require('express');
const router = express.Router();
const ftthLoginController = require('../controllers/ftthLoginController');

// Standardized GET endpoint
router.get('/', ftthLoginController.ftthDashboardLogin);

module.exports = router;
