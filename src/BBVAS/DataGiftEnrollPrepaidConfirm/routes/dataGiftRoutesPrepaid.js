// routes/dataGiftRoutes.js
const express = require("express");
const router = express.Router();
const dataGiftController = require("../controllers/dataGiftController");

router.post(
  "/tmf-api/serviceActivation/v4/DataGiftEnrollPrepaidConfirm",
  dataGiftController.confirmPrepaidDataGift
);

module.exports = router;
