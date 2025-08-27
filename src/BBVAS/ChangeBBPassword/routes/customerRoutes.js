const express = require("express");
const router = express.Router();
const { changeBBPassword } = require("../controllers/customerController");

router.put("/:customerId/changeBBPassword", changeBBPassword);

module.exports = router;
