const express = require("express");
const router = express.Router();
const voucherController = require("../controllers/voucherController");

// Redeem voucher
router.post("/BBVAS/RedeemVoucher", voucherController.redeemVoucher);

module.exports = router;
