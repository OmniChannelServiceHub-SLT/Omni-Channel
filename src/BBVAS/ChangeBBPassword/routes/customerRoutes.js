const express = require("express");
const router = express.Router();
const { changePassword } = require("../controllers/customerController");
const validatePasswordChange = require("../middleware/authMiddleware");

// PUT /change-password
router.put("/change-password", validatePasswordChange, changePassword);

// Test route to confirm router is loaded
router.put("/test", (req, res) => {
  res.send("Customer route PUT works ✅");
});

module.exports = router;
