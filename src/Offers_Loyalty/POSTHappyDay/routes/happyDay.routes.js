const express = require("express");

const router = express.Router();

const {

    happyDayRequest

} = require("../controllers/happyDay.controller");

router.post("/", happyDayRequest);

module.exports = router;