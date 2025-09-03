const express = require("express");
const router = express.Router();
const { requestPasswordChange, changeBBPassword } = require("../controllers/customerController");
const auth = require("../middleware/authMiddleware");

// Step 1: Verify customer → return short-lived JWT
router.post("/requestPasswordChange", requestPasswordChange);

// Step 2: Change password (requires Bearer token in header + query params)
router.put("/customer/:id/changeBBPassword", auth, changeBBPassword);

module.exports = router;
