const express = require("express");
const router = express.Router();
const usageController = require("../controllers/usageController");

router.get(
  "/BBVAS/PreviousMonthsDailyUsage",
  usageController.getPreviousMonthsDailyUsage
);

module.exports = router;
