// routes/bbExternal.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/productOffering.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get(
  '/BBExternal/GetBBPackagesv2',
  authMiddleware,
  controller.getBBPackagesV2
);

module.exports = router;
