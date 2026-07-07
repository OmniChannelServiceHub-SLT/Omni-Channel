const express = require("express");

const router = express.Router();

const {
    redeemVoucherRequest
} = require("../controllers/redeemVoucher.controller");

router.post("/", redeemVoucherRequest);

module.exports = router;