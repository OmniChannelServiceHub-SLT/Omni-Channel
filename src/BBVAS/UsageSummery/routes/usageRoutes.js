const express = require("express");
const router = express.Router();
const usageController = require("../controllers/usageController");

router.get("/BBVAS/UsageSummary/:id", usageController.retrieveUsage);

module.exports = router;
