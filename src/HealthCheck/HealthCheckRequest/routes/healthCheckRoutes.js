const express = require('express');
const router = express.Router();
const { getHealthCheckStatus } = require('../controllers/healthCheckController');

router.get('/HealthCheckRequest', getHealthCheckStatus);

module.exports = router;
