const express = require("express");
const { addVASDataBundlePostPaidV2 } = require("../controllers/AddVASDataBundlePostPaidController");

const router = express.Router();

router.post("/AddVASDataBundlePostPaidV2", addVASDataBundlePostPaidV2);

module.exports = router;
