const express = require("express");
const { eBillStatusRequest } = require("../controllers/eBillStatusController");
const authMiddleware = require("../../../middleware/authMiddleware");

const router = express.Router();

// GET /tmf-api/eBillStatusRequest
router.get("/eBillStatusRequest", authMiddleware, eBillStatusRequest);

module.exports = router;
