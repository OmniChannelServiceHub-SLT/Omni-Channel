const express = require('express');
const router = express.Router();
const controller = require('../controllers/promotionController');

// Routes
router.post('/', controller.createPromotion);   // POST
router.get('/', controller.getAllPromotions);   // GET all

module.exports = router;
