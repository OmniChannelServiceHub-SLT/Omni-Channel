// src/EBill/OTPeBillAuthRequest/routes/otpAuth.routes.js
const express = require("express");
const router = express.Router();
const otpAuthController = require("../controllers/otpAuthController");

// TMF-standard resource path: POST /tmf-api/customerBillManagement/v5/OTPeBillAuthRequest
router.post("/OTPeBillAuthRequest", otpAuthController.OTPeBillAuthRequest);

module.exports = router;
