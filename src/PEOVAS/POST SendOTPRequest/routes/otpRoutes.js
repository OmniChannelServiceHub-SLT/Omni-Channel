const express = require('express');
const router = express.Router();
const otpController = require('../controllers/otpController');

// POST /tmf-api/otpManagement/v1/sendOTP
router.post('/', otpController.sendOTP);

module.exports = router;