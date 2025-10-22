// routes/customerBillOnDemandRoutes.js
const express = require("express");
const router = express.Router();
const {
  createCustomerBillOnDemand,
} = require("../controllers/customerBillOnDemandController");

// TMF-aligned POST endpoint
router.post("/customerBillOnDemand", createCustomerBillOnDemand);

module.exports = router;
