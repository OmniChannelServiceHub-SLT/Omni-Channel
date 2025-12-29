const express = require('express');
const router = express.Router();

const { getPurchasedProductsByTel } = require('../controllers/getPurchasedProducts.controller');

router.get('/purchasedProductByTel/:telephoneNo', getPurchasedProductsByTel);

module.exports = router;
