const express = require('express');
const router = express.Router();
const { createPurchasedProduct } = require('../controllers/purchasedProductController');

// POST /tmf-api/purchasedProduct
router.post('/purchasedProduct', createPurchasedProduct);

module.exports = router;
