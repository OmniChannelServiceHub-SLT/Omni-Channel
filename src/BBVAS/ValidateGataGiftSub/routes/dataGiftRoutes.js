const express = require("express");
const router = express.Router();
const dataGiftController = require("../controllers/dataGiftController");

// GET ValidateDataGiftSub
router.get(
  "/tmf-api/dataGift/v1/validateDataGiftSub/:subscriberId/:giftId/:sponsorId",
  dataGiftController.validateDataGiftSub
);

module.exports = router;
