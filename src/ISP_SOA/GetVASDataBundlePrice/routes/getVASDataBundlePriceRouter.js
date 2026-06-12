const express =
require("express");

const router =
express.Router();

const controller =
require("../controllers/getVASDataBundlePriceController");

router.get(
    "/GetVASDataBundlePrice",
    controller.getVASDataBundlePrice
);

module.exports = router;