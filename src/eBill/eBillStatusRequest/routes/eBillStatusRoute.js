const express = require("express");
const { eBillStatusRequest } = require("../controllers/eBillStatusController");

const router = express.Router();

// POST /tmf-api/eBillStatusRequest
router.get("/eBillStatusRequest", eBillStatusRequest);

module.exports = router;
