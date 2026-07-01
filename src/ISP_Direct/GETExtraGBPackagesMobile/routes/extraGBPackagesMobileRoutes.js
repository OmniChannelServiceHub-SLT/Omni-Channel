const express = require("express");
const router = express.Router();

const {
  extraGBPackagesMobileRequest,
} = require("../controllers/extraGBPackagesMobileController");

router.get("/", extraGBPackagesMobileRequest);

module.exports = router;