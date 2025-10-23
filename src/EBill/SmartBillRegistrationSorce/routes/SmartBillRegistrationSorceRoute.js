const express = require("express");
const router = express.Router();
const { postSmartBillRegistration } = require("../controllers/SmartBillRegistrationSorceController");

// Create BillPresentationProfile (Smart Bill registration)
router.post("/billPresentationProfile", postSmartBillRegistration);

module.exports = router;
