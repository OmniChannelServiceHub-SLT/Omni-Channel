const express = require("express");
const router = express.Router();
const usageController = require("../controllers/usageController");

router.get("/usage", usageController.getUsageSummary);

module.exports = router;
