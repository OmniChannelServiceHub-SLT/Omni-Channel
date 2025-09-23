//src/routes/vasDataBundle.rotes.js
const express = require("express");
const router = express.Router();
const vasController = require("../controllers/vasDataBundle.controller");
// TMF-aligned endpoints
router.post(
  "/tmf-api/productOrdering/v4/AddVASDataBundlePrepaidInit",
  vasController.addVASDataBundle
);

router.get(
  "/tmf-api/productOrdering/v4/vasBundles",
  vasController.getAllVASBundles
);

module.exports = router;
