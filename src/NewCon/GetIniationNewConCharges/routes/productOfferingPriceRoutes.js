const express = require('express');
const router = express.Router();
const ProductOfferingPriceController = require('../controllers/ProductOfferingPriceController');

// TMF620 — List ProductOfferingPrice
router.get('/productOfferingPrice', ProductOfferingPriceController.listProductOfferingPrices);

// TMF620 — Retrieve ProductOfferingPrice by ID
router.get('/productOfferingPrice/:id', ProductOfferingPriceController.retrieveProductOfferingPrice);

module.exports = router;
