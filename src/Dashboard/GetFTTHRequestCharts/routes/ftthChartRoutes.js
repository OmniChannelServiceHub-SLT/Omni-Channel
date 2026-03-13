// TMF622 - Product Ordering Management v4
const express = require('express');
const router = express.Router();
const ftthChartController = require('../controllers/ftthChartController');

// GET /tmf-api/productOrderingManagement/v4/ftthRequest/charts?startDate=xxx&endDate=xxx
router.get('/ftthRequest/charts', ftthChartController.getFTTHRequestCharts);

module.exports = router;
