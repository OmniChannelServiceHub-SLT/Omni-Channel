const express = require("express");
const router = express.Router();
const usageController = require("../controllers/usageController");

router.get("/BBVAS/UsageSummary", usageController.listUsages);
router.get("/BBVAS/UsageSummary/:id", usageController.retrieveUsage);
router.get(
  "/BBVAS/PreviousMonthsDailyUsage",
  usageController.getPreviousMonthsDailyUsage
);

module.exports = router;
