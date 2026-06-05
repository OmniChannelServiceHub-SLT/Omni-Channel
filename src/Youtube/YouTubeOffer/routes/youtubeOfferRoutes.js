const express = require("express");
const router = express.Router();

const {
  packageActivation
} = require("../controllers/youtubeOfferController");

// Kumudu - TimelyPay YouTube Offer Module
// POST /api/mySltBss/youTube/uOffer
router.post("/youTube/uOffer", packageActivation);

module.exports = router;