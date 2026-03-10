// TMF637 - Product Inventory Management v4
const express = require('express');
const router = express.Router();
const { getBBFreedomStatus } = require('../controllers/getBBFreedomStatusController');

// GET /tmf-api/productInventory/v4/product/bbFreedomStatus?tpNo=xxx
router.get('/product/bbFreedomStatus', getBBFreedomStatus);

module.exports = router;
