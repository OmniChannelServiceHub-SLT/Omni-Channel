const express = require("express");
const router = express.Router();
const { changeBBPassword } = require("../controllers/customerController");
const auth = require("../middleware/authMiddleware");


router.put("/:customerId/changeBBPassword", auth, changeBBPassword);
router.put("/:customerId/changeBBPassword", changeBBPassword);

module.exports = router;
