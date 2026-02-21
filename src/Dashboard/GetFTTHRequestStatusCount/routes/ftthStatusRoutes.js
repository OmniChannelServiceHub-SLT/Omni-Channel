const express = require('express');
const router = express.Router();
const ftthStatusController = require('../controllers/ftthStatusController');

// Standardized GET endpoint
router.get('/', ftthStatusController.getFTTHRequestStatusCount);

module.exports = router;
