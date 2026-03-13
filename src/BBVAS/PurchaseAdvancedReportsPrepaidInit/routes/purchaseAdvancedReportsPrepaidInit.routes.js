const express = require("express");
const router = express.Router();
const controller = require("../controllers/purchaseAdvancedReportsPrepaidInit.controller");

// POST  → Initiate a prepaid advanced report purchase (Step 1)
router.post(
  "/BBVAS/PurchaseAdvancedReportsPrepaidInit",
  controller.purchaseAdvancedReportsPrepaidInit
);

// GET   → List all init requests (utility / admin)
router.get(
  "/BBVAS/PurchaseAdvancedReportsPrepaidInit",
  controller.getAllInitRequests
);

module.exports = router;