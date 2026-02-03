// routes/bbExternal.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/getBBPackageDetails.controller');
const authMiddleware = require("../../../middleware/authMiddleware");



router.get('/', authMiddleware, controller.getBBPackageDetails);

module.exports = router;
