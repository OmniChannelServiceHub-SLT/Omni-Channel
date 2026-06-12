const express =
require("express");

const router =
express.Router();

const controller =
require("../controller/getVASDataBundlePriceController");

router.get(
    "/GetVASDataBundlePrice",
    controller.getVASDataBundlePrice
);

module.exports = router;