const express = require('express');
const router = express.Router();
const ftthChartController = require('../controllers/ftthChartController');

// Standardized GET endpoint
router.get('/', ftthChartController.getFTTHRequestCharts);

module.exports = router;
