const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotionController');

// GET /promotion - List promotions
router.get('/', promotionController.listPromotions);

// GET /promotion/{id} - Retrieve specific promotion
router.get('/:id', promotionController.getPromotionById);

module.exports = router;
