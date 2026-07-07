const express = require("express");
const router = express.Router();

const {
  validateDataGiftSubRequest,
} = require("../controllers/validateDataGiftSubController");

router.get("/", validateDataGiftSubRequest);

module.exports = router;