const express = require("express");
const router = express.Router();

const {
  dataGiftPackagesMobileRequest,
} = require("../controllers/dataGiftPackagesMobileController");

router.get("/", dataGiftPackagesMobileRequest);

module.exports = router;