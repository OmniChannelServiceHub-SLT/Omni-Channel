const express = require("express");
const router = express.Router();
const dataGiftController = require("../controllers/dataGiftController");

// POST DataGiftEnrollPrepaidInit
router.post("/DataGiftEnrollPrepaidInit", dataGiftController.createDataGiftEnrollment);

module.exports = router;
