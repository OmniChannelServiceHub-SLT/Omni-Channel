const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/bannerController');

// GET /api/Banner/BannerDetailRequest?username=randikaslt@gmail.com
router.get('/BannerDetailRequest', bannerController.getBannerDetails);

module.exports = router;
