const express = require("express");
const router = express.Router();
const productController = require("../controllers/logAPIFrontController");

// GET /productInventory/v5/product?relatedParty.id=&productSpecification.id=
router.get("/", productController.listProducts);

module.exports = router;
