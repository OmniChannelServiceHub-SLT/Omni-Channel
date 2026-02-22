/**
 * TMF622 Product Order Management API
 * GET /productOrder?nic=... – list product orders filtered by user NIC
 * GET /productOrder/{id} – retrieve one product order
 * Mount at: /tmf-api/productOrderManagement/v4
 */
const express = require("express");
const router = express.Router();
const ProductOrderController = require("../controllers/ProductOrderController");

router.get("/productOrder", ProductOrderController.listProductOrders);
router.get("/productOrder/:id", ProductOrderController.retrieveProductOrder);

module.exports = router;
