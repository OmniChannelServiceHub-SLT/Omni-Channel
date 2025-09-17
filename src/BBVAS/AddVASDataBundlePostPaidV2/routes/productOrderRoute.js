const express = require('express');
const router = express.Router();
const { createProductOrder } = require('../controllers/productOrderController');

// Create a ProductOrder
router.post('/productOrder', createProductOrder);

module.exports = router;
