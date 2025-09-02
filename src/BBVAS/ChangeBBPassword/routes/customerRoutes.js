const express = require("express");
const router = express.Router();
const { changeBBPassword, login } = require("../controllers/customerController");
const auth = require("../middleware/authMiddleware");


router.put("/:customerId/changeBBPassword", auth, changeBBPassword);
router.post("/login", login);

module.exports = router;
