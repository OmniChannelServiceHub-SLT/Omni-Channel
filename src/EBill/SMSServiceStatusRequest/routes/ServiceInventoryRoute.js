const express = require("express");
const { getServiceStatus } = require("../controllers/ServiceInventoryController.js");
const router = express.Router();

// GET /tmf-api/serviceInventory/service
router.get("/service", getServiceStatus);



module.exports = router;
