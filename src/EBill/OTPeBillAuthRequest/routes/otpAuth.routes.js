const express = require('express');
const router = express.Router();
const otpAuthController = require('../controllers/otpAuthController');

router.post('/OTPeBillAuthRequest', otpAuthController.validateOtp);

module.exports = router;
