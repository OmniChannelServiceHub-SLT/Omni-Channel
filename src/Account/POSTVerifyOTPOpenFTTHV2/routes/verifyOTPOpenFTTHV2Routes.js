const express = require("express");
const router = express.Router();

const {
  verifyOTPOpenFTTHV2Request,
} = require("../controllers/verifyOTPOpenFTTHV2Controller");

router.post("/", verifyOTPOpenFTTHV2Request);

module.exports = router;