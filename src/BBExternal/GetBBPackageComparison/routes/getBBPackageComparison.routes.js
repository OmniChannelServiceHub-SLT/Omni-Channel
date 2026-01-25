// routes/bbExternal.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/getBBPackageComparison.controller');




router.get('/', controller.getBBPackageComparison);

module.exports = router;
