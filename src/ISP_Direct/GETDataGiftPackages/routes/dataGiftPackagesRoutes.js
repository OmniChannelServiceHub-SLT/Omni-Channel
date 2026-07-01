const express = require("express");
const router = express.Router();

const {
  dataGiftPackagesRequest,
} = require("../controllers/dataGiftPackagesController");

router.get("/", dataGiftPackagesRequest);

module.exports = router;