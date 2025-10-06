const express = require("express");
const router = express.Router();
const dataGiftController = require("../controllers/dataGiftController");

router.get("/BBVAS/DataGiftPackages", dataGiftController.listDataGiftPackages);

module.exports = router;
