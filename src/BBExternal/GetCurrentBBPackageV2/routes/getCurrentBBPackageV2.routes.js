// routes/bbExternal.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/getCurrentBBPackageV2.controller');




router.get('/', controller.getCurrentBBPackageV2);

module.exports = router;
