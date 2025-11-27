const express = require('express');
const router = express.Router();
const { createPurchasedProduct } = require('../controllers/purchasedProduct.controller');

// POST /tmf-api/purchasedProduct
router.post('/purchasedProduct', createPurchasedProduct);

module.exports = router;
