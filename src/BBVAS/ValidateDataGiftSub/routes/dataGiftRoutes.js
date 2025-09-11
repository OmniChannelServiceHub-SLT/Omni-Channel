const express = require("express");
const router = express.Router();
const dataGiftController = require("../controllers/dataGiftController");

// Option 1: Subscriber as route param, giftId & sponsorId as query params
router.get(
  "/tmf-api/dataGift/v1/validateDataGiftSub/:subscriberId",
  dataGiftController.validateDataGiftSub
);

// Option 2: All as route params (optional, for flexibility)
router.get(
  "/tmf-api/dataGift/v1/validateDataGiftSub/:subscriberId/:giftId/:sponsorId",
  dataGiftController.validateDataGiftSub
);

module.exports = router;
