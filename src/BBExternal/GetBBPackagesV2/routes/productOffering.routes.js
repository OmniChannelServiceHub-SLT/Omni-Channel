// routes/bbExternal.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/productOffering.controller');



// GetBBPackagesV2
router.get('/', controller.getBBPackagesV2);

module.exports = router;
